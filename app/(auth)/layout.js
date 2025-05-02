import { ThemeProvider } from "@/components/theme-provider";

const AuthLayout = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        {children}
      </div>
    </ThemeProvider>
  );
};

export default AuthLayout;
