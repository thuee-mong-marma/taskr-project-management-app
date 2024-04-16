'use client'

import LocalFont from '@/components/fonts/LocalFont';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import SiteLogo from '../public/Logo.svg';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="items-center hover:opacity-75 transition gap-x-2 hidden sm:flex">
        <SiteLogo className="h-[30px] w-[30px]" alt="site-logo" />
        <p
          className={cn(
            'text-lg text-neutral-700 relative top-[2px]',
            LocalFont.className
          )}
        >
          TaskR
        </p>
      </div>
    </Link>
  );
};
