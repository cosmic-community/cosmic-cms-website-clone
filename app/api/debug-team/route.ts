import { NextResponse } from 'next/server'
import { createBucketClient } from '@cosmicjs/sdk'

export const dynamic = 'force-dynamic'

export async function GET() {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG
  const readKey = process.env.COSMIC_READ_KEY
  const apiEnv = 'staging'

  const diagnostics: Record<string, unknown> = {
    has_bucket_slug: !!bucketSlug,
    bucket_slug_length: bucketSlug?.length || 0,
    has_read_key: !!readKey,
    read_key_length: readKey?.length || 0,
    api_environment: apiEnv,
    timestamp: new Date().toISOString(),
  }

  try {
    const cosmic = createBucketClient({
      bucketSlug: bucketSlug as string,
      readKey: readKey as string,
      apiEnvironment: apiEnv,
    })

    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    diagnostics.success = true
    diagnostics.total_objects = response.objects?.length || 0
    diagnostics.objects = response.objects?.map((o: { title: string; slug: string; metadata?: { name?: string; type?: string } }) => ({
      title: o.title,
      slug: o.slug,
      name: o.metadata?.name,
      type: o.metadata?.type,
    }))
  } catch (error) {
    diagnostics.success = false
    diagnostics.error = error instanceof Error ? error.message : String(error)
    diagnostics.error_type = error instanceof Error ? error.constructor.name : typeof error
    // Check if it has status
    if (typeof error === 'object' && error !== null && 'status' in error) {
      diagnostics.error_status = (error as { status: number }).status
    }
  }

  return NextResponse.json(diagnostics, { status: 200 })
}
