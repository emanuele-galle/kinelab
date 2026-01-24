import type { CollectionConfig } from 'payload'

export const PortfolioMedia: CollectionConfig = {
  slug: 'portfolio-media',
  admin: {
    group: 'Portfolio',
    description: 'Media ottimizzati per portfolio con Sharp.js',
  },
  upload: {
    staticDir: 'portfolio-media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'gallery',
        width: 1200,
        height: 900,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 90,
          },
        },
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 90,
          },
        },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
        crop: 'attention',
        formatOptions: {
          format: 'jpeg',
          options: {
            quality: 90,
          },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 90,
      },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Testo alternativo',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Didascalia',
    },
    {
      name: 'focalPoint',
      type: 'group',
      label: 'Punto focale',
      admin: {
        description: 'Coordinate del punto focale per ritagli intelligenti (0-100%)',
      },
      fields: [
        {
          name: 'x',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 50,
          label: 'X (%)',
        },
        {
          name: 'y',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 50,
          label: 'Y (%)',
        },
      ],
    },
    {
      name: 'photographer',
      type: 'text',
      label: 'Fotografo',
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'Metadata',
      admin: {
        condition: (data) => !!data?.filename,
      },
      fields: [
        {
          name: 'width',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'height',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'filesize',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Hook will be populated with Sharp.js processing logic
        if (operation === 'create' && req.file) {
          // Metadata will be extracted by Payload's Sharp integration
          // Additional custom processing can be added here
        }
        return data
      },
    ],
  },
}
