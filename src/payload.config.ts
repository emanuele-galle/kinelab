import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Packages } from './collections/Packages'
import { TeamMembers } from './collections/TeamMembers'
import { Bookings } from './collections/Bookings'
import { Clients } from './collections/Clients'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { ContactSubmissions } from './collections/ContactSubmissions'

// Globals
import { BusinessInfo } from './globals/BusinessInfo'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- KineLab Admin',
    },
    components: {},
    dateFormat: 'dd/MM/yyyy HH:mm',
  },

  collections: [
    Users,
    Media,
    Services,
    Packages,
    TeamMembers,
    Bookings,
    Clients,
    Testimonials,
    FAQs,
    ContactSubmissions,
  ],

  globals: [
    BusinessInfo,
    SiteSettings,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'kinelab',
        },
      },
      bucket: process.env.S3_BUCKET || 'kinelab-media',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT || 'http://vps-panel-minio:9000',
        region: process.env.S3_REGION || 'us-east-1',
        forcePathStyle: true,
      },
    }),
  ],

  localization: {
    locales: ['it'],
    defaultLocale: 'it',
  },

  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },

  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
})
