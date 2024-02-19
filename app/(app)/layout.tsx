import { ModalProvider } from "@/components/providers/ModalProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <ModalProvider />
        <Toaster />
        {children}
      </ReactQueryProvider>
    </ClerkProvider>
  );
};

export default AppLayout;
