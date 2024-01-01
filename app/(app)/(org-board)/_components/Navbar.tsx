import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 w-full h-14 border-b border-teal-300 shadow-sm bg-white ">
      <div className="w-full h-full max-w-[1100px] mx-auto flex items-center justify-between px-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <div className="flex items-center gap-x-2 w-full md:w-auto justify-between md:justify-normal">
          <Link href="/create-org">
            <Button size="sm" variant="primary" className="h-auto py-1.5 px-2">
              Create
            </Button>
          </Link>
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/org/:id"
            afterSelectOrganizationUrl="/org/:id"
            afterLeaveOrganizationUrl="/create-org"
            appearance={{
              elements: {
                rootBox: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            }}
          />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};
