'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  icon: JSX.Element;
  route: string;
};

export const SidebarItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: SidebarItemProps) => {
  const router = useRouter();

  const staticRouteURL: string = `/organization/${organization.id}`;

  const routes: Route[] = [
    {
      label: 'Boards',
      icon: <Layout className="h-4 w-4 mr-2" />,
      route: `${staticRouteURL}`,
    },
    {
      label: 'Activity',
      icon: <Activity className="h-4 w-4 mr-2" />,
      route: `${staticRouteURL}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className="h-4 w-4 mr-2" />,
      route: `${staticRouteURL}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      route: `${staticRouteURL}/billing`,
    },
  ];

  //   const onAccordionSubItemClick = (href: string) => router.push(href)

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-teal-600/30 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-teal-600/30 text-white'
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
      <AccordionContent>
        {routes.map((route) => (
          <Button
            key={route.label}
            size="sm"
            className={cn('w-full font-normal justify-start pl-10')}
          >
            <Link href={route.route}>
              {route.icon}
              <span>{route.label}</span>
            </Link>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
