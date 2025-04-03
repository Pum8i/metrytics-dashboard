import { Suspense } from "react";
import { LoginForm } from "../home/login-form";

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
