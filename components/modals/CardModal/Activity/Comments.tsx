'use client'

import { Comment } from "@prisma/client"
import CommentItem from "./CommentItem"

interface CardCommentsProps {
  data: Comment[]
}

const CardComments = ({data} : CardCommentsProps) => {
  if(!data) {
    return null
  }

  return (
    <ol className="space-y-4">
      {data.map((comment, index) => (
        <CommentItem key={index} data={comment}/>
      ))}
    </ol>
  )
}

export default CardComments