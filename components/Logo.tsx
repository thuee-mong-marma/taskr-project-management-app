'use client'

import LocalFont from '@/components/fonts/LocalFont';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="items-center hover:opacity-75 transition gap-x-2 hidden sm:flex">
        <Image src="/assets/Logo.svg" className="h-[30px] w-[30px]" alt='site-logo' width={30} height={30} />
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
