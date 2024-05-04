"use server";

export const Footer = async () => {
  return (
    <footer className="px-4 py-3 border-t border-slate-200 border-opacity-10">
      <div className="max-w-screen-lg m-auto flex justify-center items-center">
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-base text-muted-foreground">
            Matcha made by fluchtens for 42.
          </p>
          <p className="text-xs font-base text-muted-foreground">© 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
