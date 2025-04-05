import { Chatbot } from "@/app/components/chat";
import { Navbar } from "./components/globals";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Chatbot />

    </main>
  );
}

