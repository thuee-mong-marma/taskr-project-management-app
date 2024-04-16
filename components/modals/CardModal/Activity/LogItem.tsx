"use client";

import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/lib/generateLogMessage";
import { format } from "date-fns";

export const LogItem = ({ data }: { data: AuditLog }) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground space-x-2">
          <span className="font-semibold text-neutral-700">
            {data.userName}
          </span>
          <span>{generateLogMessage(data)}</span>
        </p>
        <p className="text-sx text-muted-foreground">
          {format(new Date(data.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
        </p>
      </div>
    </li>
  );
};
