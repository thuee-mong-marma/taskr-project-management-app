'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization } from '@clerk/nextjs';
import { CreditCard } from 'lucide-react';
import Image from 'next/image';

export const OrganizationInfo = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <OrganizationInfo.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          src={organization?.imageUrl!}
          fill
          alt="Organization"
          className="rounded-md object-cover"
        />
      </div>
      <div>
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          <span className="">Free</span>
        </div>
      </div>
    </div>
  );
};

OrganizationInfo.Skeleton = function OrgInfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
