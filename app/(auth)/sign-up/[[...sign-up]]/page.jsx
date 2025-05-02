import { SignUp } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center max-w-md mx-auto">
      <div className="mb-6 flex items-center justify-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="AI Career Coach Logo"
            width={120}
            height={40}
            className="h-auto"
          />
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign up to get started with AI Career Coach
          </p>
        </CardHeader>
        <CardContent>
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary/90",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "bg-white border border-input shadow-sm hover:bg-muted",
                footerAction: "text-primary",
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            redirectUrl="/onboarding"
          />
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
