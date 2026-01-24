import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { processImage, getImageMetadata } from '@/lib/image-processing'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

/**
 * POST /api/upload
 * Enhanced upload endpoint with Sharp.js processing
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const collection = formData.get('collection') as string || 'portfolio-media'
    const alt = formData.get('alt') as string
    const focalPointX = formData.get('focalPointX') as string
    const focalPointY = formData.get('focalPointY') as string

    // Validation
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Extract metadata with Sharp
    const metadata = await getImageMetadata(buffer)

    // Optimize image
    const optimized = await processImage(buffer, {
      quality: 90,
      format: 'webp',
    })

    // Create new file from optimized buffer
    const optimizedFile = new File(
      [optimized],
      file.name.replace(/\.[^/.]+$/, '.webp'),
      { type: 'image/webp' }
    )

    // Upload to Payload
    const payload = await getPayload({ config })

    const uploadData: any = {
      alt: alt || file.name,
      metadata: {
        width: metadata.width,
        height: metadata.height,
        filesize: optimized.length,
      },
    }

    // Add focal point if provided
    if (focalPointX && focalPointY) {
      uploadData.focalPoint = {
        x: parseFloat(focalPointX),
        y: parseFloat(focalPointY),
      }
    }

    const result = await payload.create({
      collection,
      data: uploadData,
      file: {
        data: optimized,
        mimetype: 'image/webp',
        name: optimizedFile.name,
        size: optimized.length,
      },
    })

    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        originalSize: file.size,
        optimizedSize: optimized.length,
        compressionRatio: ((1 - optimized.length / file.size) * 100).toFixed(2) + '%',
        width: metadata.width,
        height: metadata.height,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/upload
 * Returns upload configuration and limits
 */
export async function GET() {
  return NextResponse.json({
    maxFileSize: MAX_FILE_SIZE,
    allowedTypes: ALLOWED_TYPES,
    collections: ['portfolio-media', 'media'],
    features: {
      autoOptimization: true,
      webpConversion: true,
      metadataExtraction: true,
      focalPointSupport: true,
    },
  })
}
