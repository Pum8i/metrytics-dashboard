"use client";

import { authenticate, register } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ShieldAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";

interface LoginFormStrings {
  title: string;
  description: string;
  button: string;
  link: React.ReactElement;
}

const getStringValues = (
  isLogin: boolean,
  handleChangeLoginRegister: (e: React.MouseEvent<HTMLButtonElement>) => void
): LoginFormStrings => {
  return isLogin
    ? {
        title: "Login to your account",
        description: "Enter your email below to login to your account",
        button: "Login",
        link: (
          <>
            Don&apos;t have an account?
            <Button
              variant="link"
              onClick={handleChangeLoginRegister}
              className="p-2 underline underline-offset-4"
            >
              Register
            </Button>
          </>
        ),
      }
    : {
        title: "Create an account",
        description: "Create an account with your email and password",
        button: "Register",
        link: (
          <>
            Already have an account?
            <Button
              variant="link"
              onClick={handleChangeLoginRegister}
              className="p-2 underline underline-offset-4"
            >
              Login
            </Button>
          </>
        ),
      };
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, formAction, isPending] = useActionState(
    isLogin ? authenticate : register,
    undefined
  );

  const handleChangeLoginRegister = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const { title, description, button, link } = getStringValues(
    isLogin,
    handleChangeLoginRegister
  );

  return (
    <main
      className={cn(
        "flex flex-col gap-6 m-auto w-full max-w-md h-screen justify-center",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-level={1}>
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="mail@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                {isLogin && (
                  <input type="hidden" name="redirectTo" value={callbackUrl} />
                )}
                <Button
                  type={isPending ? "button" : "submit"}
                  className="w-full"
                  aria-disabled={isPending}
                  disabled={isPending}
                >
                  {button}
                </Button>
              </div>
              {process.env.NEXT_PUBLIC_ALLOW_REGISTRATION === "true" && (
                <div className="text-center text-sm">{link}</div>
              )}

              {errorMessage && (
                <div className="flex gap-2 items-center">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
