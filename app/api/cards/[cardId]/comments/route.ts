import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
): Promise<Response> {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const comments = await prismadb.comment.findMany({
      where: {
        cardId: params.cardId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(comments);
  } catch (err) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
