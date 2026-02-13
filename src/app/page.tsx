import { AuthForm } from '@/components/auth-form';
import { Logo } from '@/components/logo';

export default function AuthenticationPage() {
  return (
    <main className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-headline">
              &ldquo;The platform for capturing ideas at the speed of thought. No distractions, no bloat—just pure functionality.&rdquo;
            </p>
            <footer className="text-sm">A Creator's Tool</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight font-headline">
              Welcome to Zenith Notes
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your notes or create a new account.
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
