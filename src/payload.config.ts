import { postgresAdapter } from '@payloadcms/db-postgres'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Menus } from './collections/Menus'
import { Categories } from './collections/Categories'
import { Branches } from './collections/Branches'
import { Campaigns } from './collections/Campaigns'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Menus, Categories, Branches, Campaigns],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Server URL - required for Vercel deployment
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000',
  // CORS configuration - allow API requests from any origin
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    '*', // Allow all origins for public API
  ],
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'https://*.vercel.app', // Allow all Vercel preview deployments
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    uploadthingStorage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
        },
      },
      alwaysInsertFields: true,
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
  ],
})
