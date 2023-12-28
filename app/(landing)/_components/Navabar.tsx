import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button
            className="bg-white border text-teal-600 border-teal-600 hover:bg-teal-600 hover:border-teal-600 hover:text-white"
            size="sm"
            variant="outline"
            asChild
          >
            <Link href="/login">Log In</Link>
          </Button>
          <Button className="bg-teal-600 border hover:bg-white hover:border-teal-600 hover:text-teal-600">
            <Link href="/register">Get TaskR for Free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
