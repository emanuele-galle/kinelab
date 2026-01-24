import sharp from 'sharp'
import type { Sharp } from 'sharp'

export interface ImageProcessingOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp' | 'avif'
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  position?: string | { x: number; y: number }
  withoutEnlargement?: boolean
}

export interface ImageMetadata {
  width: number
  height: number
  format: string
  size: number
  hasAlpha: boolean
  orientation?: number
}

/**
 * Process image with Sharp.js
 * Optimizes images for web delivery with WebP format and quality settings
 */
export async function processImage(
  input: Buffer | string,
  options: ImageProcessingOptions = {}
): Promise<Buffer> {
  const {
    width,
    height,
    quality = 85,
    format = 'webp',
    fit = 'cover',
    position = 'centre',
    withoutEnlargement = true,
  } = options

  let pipeline: Sharp = sharp(input)

  // Auto-rotate based on EXIF orientation
  pipeline = pipeline.rotate()

  // Resize if dimensions provided
  if (width || height) {
    pipeline = pipeline.resize({
      width,
      height,
      fit,
      position: typeof position === 'string' ? position : undefined,
      withoutEnlargement,
    })

    // Handle custom focal point
    if (typeof position === 'object' && position.x !== undefined && position.y !== undefined) {
      const metadata = await sharp(input).metadata()
      if (metadata.width && metadata.height) {
        const gravity = calculateGravity(position.x, position.y)
        pipeline = sharp(input).resize({
          width,
          height,
          fit,
          position: gravity,
          withoutEnlargement,
        })
      }
    }
  }

  // Apply format and quality
  switch (format) {
    case 'jpeg':
      pipeline = pipeline.jpeg({ quality, mozjpeg: true })
      break
    case 'png':
      pipeline = pipeline.png({ quality, compressionLevel: 9 })
      break
    case 'webp':
      pipeline = pipeline.webp({ quality })
      break
    case 'avif':
      pipeline = pipeline.avif({ quality })
      break
  }

  // Optimize metadata removal
  pipeline = pipeline.withMetadata({
    orientation: 1, // Reset orientation after rotation
  })

  return pipeline.toBuffer()
}

/**
 * Extract metadata from image
 */
export async function getImageMetadata(input: Buffer | string): Promise<ImageMetadata> {
  const metadata = await sharp(input).metadata()

  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
    format: metadata.format || 'unknown',
    size: metadata.size || 0,
    hasAlpha: metadata.hasAlpha || false,
    orientation: metadata.orientation,
  }
}

/**
 * Generate responsive image sizes
 */
export async function generateResponsiveSizes(
  input: Buffer | string,
  sizes: Array<{ width: number; name: string }>
): Promise<Map<string, Buffer>> {
  const results = new Map<string, Buffer>()

  for (const size of sizes) {
    const processed = await processImage(input, {
      width: size.width,
      quality: 85,
      format: 'webp',
    })
    results.set(size.name, processed)
  }

  return results
}

/**
 * Create thumbnail with smart cropping
 */
export async function createThumbnail(
  input: Buffer | string,
  width: number,
  height: number,
  focalPoint?: { x: number; y: number }
): Promise<Buffer> {
  return processImage(input, {
    width,
    height,
    quality: 80,
    format: 'webp',
    fit: 'cover',
    position: focalPoint || 'attention',
  })
}

/**
 * Optimize image for web without resizing
 */
export async function optimizeImage(
  input: Buffer | string,
  format: 'jpeg' | 'png' | 'webp' | 'avif' = 'webp'
): Promise<Buffer> {
  return processImage(input, {
    quality: 90,
    format,
  })
}

/**
 * Convert focal point percentage to Sharp gravity
 */
function calculateGravity(x: number, y: number): sharp.Gravity {
  // Convert 0-100 percentage to gravity position
  if (x < 33) {
    if (y < 33) return sharp.gravity.northwest
    if (y > 66) return sharp.gravity.southwest
    return sharp.gravity.west
  } else if (x > 66) {
    if (y < 33) return sharp.gravity.northeast
    if (y > 66) return sharp.gravity.southeast
    return sharp.gravity.east
  } else {
    if (y < 33) return sharp.gravity.north
    if (y > 66) return sharp.gravity.south
    return sharp.gravity.centre
  }
}

/**
 * Batch process multiple images
 */
export async function batchProcessImages(
  images: Array<{ input: Buffer | string; options: ImageProcessingOptions }>,
  concurrency: number = 3
): Promise<Buffer[]> {
  const results: Buffer[] = []

  for (let i = 0; i < images.length; i += concurrency) {
    const batch = images.slice(i, i + concurrency)
    const processed = await Promise.all(
      batch.map((img) => processImage(img.input, img.options))
    )
    results.push(...processed)
  }

  return results
}
