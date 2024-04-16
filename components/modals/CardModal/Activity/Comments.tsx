'use client'

import { Comment } from "@prisma/client"

interface CardCommentsProps {
  data: Comment[]
}

const CardComments = ({data} : CardCommentsProps) => {
  return (
    <div>Comments</div>
  )
}

export default CardComments