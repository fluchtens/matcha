"use server";

import Link from "next/link";
import { Button } from "../ui/button";

export const Header = async () => {
  return (
    <header className="px-4 py-3 border-b border-slate-200 border-opacity-10">
      <div className="max-w-screen-lg m-auto flex justify-between items-center">
        <div className="flex justify-normal items-center gap-1">
          <Link href="/" className="p-2">
            <h1 className="text-lg md:text-xl font-medium">matcha</h1>
          </Link>
        </div>
        <Button variant="default">Log in</Button>
      </div>
    </header>
  );
};
