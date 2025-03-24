import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
