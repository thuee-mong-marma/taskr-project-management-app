'use client';

import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import { Organization, SidebarItem } from './SidebarItem';

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrg, isLoaded: isLoadedOrg } = useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-medium">
        <span className="font-bold">Workspaces</span>
        <Button asChild variant="ghost" size="icon" type="button">
          <Link href="/create-org">
            <Plus />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <SidebarItem
            key={organization.id}
            isActive={activeOrg?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </div>
  );
};
