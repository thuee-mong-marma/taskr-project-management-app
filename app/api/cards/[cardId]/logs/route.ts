import { prismadb } from "@/lib/db"
import { auth, useAuth } from "@clerk/nextjs"
import { ENTITY_TYPE } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request: Request, {params} : {params: {cardId: string}}) {
  try {
    const {cardId} = params
    const {userId, orgId} = auth()

    if(!userId || !orgId) {
      return new NextResponse('Unauthorized', {status: 401})
    }

    const auditLogs = await prismadb.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: ENTITY_TYPE.CARD
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 3
    })

    return NextResponse.json(auditLogs)

  } catch(err) {
    // console.log(err)
    return new NextResponse('Internal server error', {status: 500})
  }


}