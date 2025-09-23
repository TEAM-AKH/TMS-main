import { LoginForm } from "@/components/login/login-form";
import Logo from "@/components/logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center items-center gap-4">
          <Logo className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">TeamFlow</h1>
        </div>
        <div className="bg-card/60 dark:bg-card/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl shadow-slate-300/10 dark:shadow-black/10 border border-border/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Enter Workspace
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Welcome back. Let's get productive.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
