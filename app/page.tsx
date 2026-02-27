import { IntroSection } from "./components/IntroSection";
import { LoginForm } from "./components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      <IntroSection />
      <LoginForm />
    </main>
  );
}
