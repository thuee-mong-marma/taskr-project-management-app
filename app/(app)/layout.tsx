import Providers from "@/components/providers";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      {children}
    </Providers>
  );
};

export default AppLayout;
