"use server";

import LoginBtn from "@/app/LoginBtn";

export default async function Home() {
  return (
    <main className="p-4">
      <LoginBtn />
    </main>
  );
}
