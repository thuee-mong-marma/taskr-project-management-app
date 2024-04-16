import { ReactQueryProvider } from "./ReactQueryProvider";
import { ModalProvider } from "./ModalProvider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </ReactQueryProvider>
    </ClerkProvider>
  );
};

export default Providers;
