import { auth } from "@clerk/nextjs";
import  {  NextResponse } from "next/server";
import { prismadb } from "@/lib/db";


export async function GET(req: Request, {params} : {params: {cardId: string}}) {
  try {
    const {userId, orgId} = auth()

    if(!userId || !orgId) {
      return new NextResponse(
        "Unauthorized", {status: 401}
      )
    }

    const card = await prismadb.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId
          }
        }
      },
      include: {
        list: {
          select: {
            title: true
          }
        }

      }
    })

    return NextResponse.json(card)

  } catch(err) {
    return new NextResponse(
      "Internal Server Error", {status: 500}
    )
  }

}