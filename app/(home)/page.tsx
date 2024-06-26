import LocalFont from '@/components/fonts/LocalFont';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Medal } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        className={cn(
          'flex flex-col items-center justify-center',
          LocalFont.className
        )}
      >
        <div className="mb-4 flex items-center border border-teal-300 shadow-sm p-4 bg-transparent text-teal-300 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          <span>Task management app of the century</span>
        </div>
        <h1 className="text-5xl md:text-6xl text-center mb-6">
          TaskR helps team <br className='block md:hidden' />move and
        </h1>
        <div className="text-5xl md:text-6xl bg-gradient-to-r from-teal-300 to-teal-600 text-white py-4 px-4 rounded-md w-fit">
          Work Forward.
        </div>
        <div
          className={cn(
            'text-sm md:text-xl mt-4 text-black max-w-xs md:max-w-2xl text-center mx-auto',
            poppinsFont.className
          )}
        >
          Elevate your team&apos;s unique workstyle, from high-rises to home
          offices. Unleash unparalleled collaboration, project management, and
          productivity. Revolutionize the way you work and conquer challenges
          with TaskR.
        </div>
        <Button className="mt-6 px-6" variant="primary" size="lg">
          <Link href="/register">Get started for Free</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
