"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { List } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CardComments from "./Comments";
import CardLogs from "./Logs";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/fetcher";
import { AuditLog, Comment } from "@prisma/client";
import { CommentForm } from "../CommentForm";

export const Activity = ({ cardId }: { cardId: string }) => {

  const { data: cardAuditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-audit-logs", cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}/logs`),
  });

  const {data: cardCommentsData} = useQuery<Comment[]>({
    queryKey: ["card-comments", cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}/comments`)
  })

  console.log('comments', cardCommentsData)

  return (
    <div>
      <div className="flex items-start gap-x-3">
        <List className="h-5 w-5 mt-0.5" />
        <p className="font-semibold text-neutral-700 mb-2">Activity</p>
      </div>
      <Tabs defaultValue="comments">
        <TabsList className="grid w-full grid-cols-2 bg-skeleton">
          <TabsTrigger value='comments'>Comments</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
        </TabsList>
        <TabsContent value='comments'>
          <CommentForm/>
          <CardComments data={cardCommentsData as Comment[]}/>
        </TabsContent>
        <TabsContent value='audits'>
          <CardLogs data={cardAuditLogsData as AuditLog[]}/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="bg-skeleton h-6 w-6" />
      <div className="w-full">
        <Skeleton className="bg-skeleton h-6 w-24 mb-2" />
        <Skeleton className="bg-skeleton h-10 w-full" />
      </div>
    </div>
  );
};
