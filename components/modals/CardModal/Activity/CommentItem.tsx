"use client";

import { Comment } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDistance, subDays } from "date-fns";

const CommentItem = ({ data }: { data: Comment }) => {
  return (
    <li className="flex gap-x-2 w-full">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="w-full flex flex-col gap-y-1">
        <div className="flex items-center">
          <p className="font-semibold mr-2">{data.userName}</p>
          <span className="text-neutral-700 text-sm">{`${formatDistance(new Date(data.createdAt), new Date())} ago`}</span>
        </div>
        <div className="p-2 bg-skeleton rounded-md">{data.message}</div>
      </div>
    </li>
  );
};

export default CommentItem;
