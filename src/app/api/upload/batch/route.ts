import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { batchProcessImages, getImageMetadata } from '@/lib/image-processing'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_BATCH_SIZE = 10
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

/**
 * POST /api/upload/batch
 * Batch upload endpoint with concurrent Sharp.js processing
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const collection = formData.get('collection') as string || 'portfolio-media'

    // Validation
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    if (files.length > MAX_BATCH_SIZE) {
      return NextResponse.json(
        { error: `Too many files. Max: ${MAX_BATCH_SIZE}` },
        { status: 400 }
      )
    }

    // Validate each file
    const validationErrors: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!ALLOWED_TYPES.includes(file.type)) {
        validationErrors.push(`File ${i + 1} (${file.name}): Invalid type`)
      }
      if (file.size > MAX_FILE_SIZE) {
        validationErrors.push(`File ${i + 1} (${file.name}): Too large`)
      }
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      )
    }

    // Convert files to buffers
    const fileBuffers = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        buffer: Buffer.from(await file.arrayBuffer()),
        originalSize: file.size,
      }))
    )

    // Process images in batch with Sharp
    const processingTasks = fileBuffers.map((file) => ({
      input: file.buffer,
      options: {
        quality: 90,
        format: 'webp' as const,
      },
    }))

    const optimizedBuffers = await batchProcessImages(processingTasks, 3)

    // Upload to Payload
    const payload = await getPayload({ config })
    const results = []
    const errors = []

    for (let i = 0; i < fileBuffers.length; i++) {
      try {
        const fileData = fileBuffers[i]
        const optimized = optimizedBuffers[i]
        const metadata = await getImageMetadata(optimized)

        const result = await payload.create({
          collection,
          data: {
            alt: fileData.name,
            metadata: {
              width: metadata.width,
              height: metadata.height,
              filesize: optimized.length,
            },
          },
          file: {
            data: optimized,
            mimetype: 'image/webp',
            name: fileData.name.replace(/\.[^/.]+$/, '.webp'),
            size: optimized.length,
          },
        })

        results.push({
          success: true,
          file: fileData.name,
          id: result.id,
          metadata: {
            originalSize: fileData.originalSize,
            optimizedSize: optimized.length,
            compressionRatio: ((1 - optimized.length / fileData.originalSize) * 100).toFixed(2) + '%',
          },
        })
      } catch (error) {
        errors.push({
          file: fileBuffers[i].name,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error('Batch upload error:', error)
    return NextResponse.json(
      { error: 'Batch upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
