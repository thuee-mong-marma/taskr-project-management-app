import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      {children}
      <Toaster />
    </ClerkProvider>
  );
};

export default AppLayout;
