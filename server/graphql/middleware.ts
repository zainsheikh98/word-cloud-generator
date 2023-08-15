import { NextRequest, NextResponse } from 'next/server'

const middleware = async (req: NextRequest, res: NextResponse) => {
  res.headers.set('Access-Control-Allow-Credentials', 'true')
  res.headers.set('origin', 'https://nextjs-graphql-server-client.vercel.app')
  res.headers.set(
    'Access-Control-Allow-Origin',
    req.headers.get('origin') || '*'
  )
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  )
  res.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
    })
  }
}

export { middleware }
