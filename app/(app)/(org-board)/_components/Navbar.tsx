import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { MobileSideBar } from './MobileSidebar';

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 w-full h-14 border-b border-teal-300 shadow-sm bg-white ">
      <div className="w-full h-full max-w-6xl 2xl:max-w-screen-xl mx-auto flex items-center justify-between px-4">
        <MobileSideBar />
        <div className="hidden sm:flex">
          <Logo />
        </div>
        <div className="flex items-center gap-x-2 w-auto justify-between md:justify-normal">
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
