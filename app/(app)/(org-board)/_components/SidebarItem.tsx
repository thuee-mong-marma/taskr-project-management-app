'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface SidebarItemProps {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

type Route = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

export const SidebarItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const staticRouteURL: string = `/org/${organization.id}`;

  const routes: Route[] = [
    {
      label: 'Boards',
      icon: <Layout className="icon mr-2" />,
      href: `${staticRouteURL}`,
    },
    {
      label: 'Activity',
      icon: <Activity className="icon mr-2" />,
      href: `${staticRouteURL}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className="icon mr-2" />,
      href: `${staticRouteURL}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className="icon mr-2" />,
      href: `${staticRouteURL}/billing`,
    },
  ];

  const onAccordionSubItemClick = (href: string) => router.push(href);

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-teal-600/70 hover:text-white transition text-start no-underline hover:no-underline'
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt={organization.name}
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1">
        {routes.map((route) => (
          <Button
            key={route.label}
            size="sm"
            className={cn(
              'w-full font-normal justify-start pl-10 mt-1 text-neutral-700 hover:bg-teal-600/20 hover:text-teal-600',
              pathname === route.href && 'bg-teal-600/20 text-teal-600'
            )}
            variant="ghost"
            onClick={() => onAccordionSubItemClick(route.href)}
          >
            {route.icon}
            <span>{route.label}</span>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

SidebarItem.Skeleton = function SidebarSkeleton() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
