import ChatHistory from "@/components/ChatBox/ChatHistory";

export default function Home() {
  return (
    <main className="h-screen w-[100vw] flex justify-center items-center bg-slate-400">
        <div className="h-[80%] w-[100%] flex flex-col justify-center items-center">
            <ChatHistory/>
        </div>
    </main>
  );
}
