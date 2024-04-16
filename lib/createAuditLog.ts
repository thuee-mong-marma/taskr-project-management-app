import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { prismadb } from "./db";

interface CreateAuditLogInput {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION
}

export const createAuditLog = async (input: CreateAuditLogInput) => {
  try {
    const {orgId} = auth()
    const user = await currentUser()

    if(!user || !orgId) {
      throw new Error('User not found')
    }

    const {entityId, entityType, entityTitle, action} = input

    await prismadb.auditLog.create({
      data: {
        orgId,
        action,
        entityId,
        entityType,
        entityTitle,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      }
    })
  } catch(err) {
    console.log(err)
  }
}