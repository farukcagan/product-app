import { IntroSection } from "./components/IntroSection";
import { LoginForm } from "./components/LoginForm";

export default function Home() {
  return (
    <main className="main-container">
      <IntroSection />
      <LoginForm />
    </main>
  );
}
