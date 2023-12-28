import { ClerkProvider } from '@clerk/nextjs';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default AppLayout;
