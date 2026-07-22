import { Link } from "@tanstack/react-router";
import cloverLogo from "@/assets/icon_2.png.asset.json";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-forest/10">
      <div className="max-w-3xl mx-auto px-5 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={cloverLogo.url}
            alt="Lucky Findings clover"
            className="size-9 -rotate-6 object-contain"
          />
          <span className="font-display text-xl tracking-tight text-forest">
            Lucky Findings
          </span>
        </Link>
        <div className="flex gap-4 text-[11px] font-medium uppercase tracking-widest text-forest/70 items-center">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-forest underline underline-offset-4 decoration-2 decoration-lime" }}
            className="hover:text-forest transition-colors"
          >
            Today
          </Link>
          <Link
            to="/calendar"
            activeProps={{ className: "text-forest underline underline-offset-4 decoration-2 decoration-lime" }}
            className="hover:text-forest transition-colors"
          >
            Calendar
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-6 pb-20 pt-16">
      <div className="bg-forest text-paper p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 bottom-0 -left-2 w-4 flex flex-col justify-around py-3">
          <div className="size-4 rounded-full bg-paper" />
          <div className="size-4 rounded-full bg-paper" />
          <div className="size-4 rounded-full bg-paper" />
          <div className="size-4 rounded-full bg-paper" />
          <div className="size-4 rounded-full bg-paper" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="font-display text-2xl">A little luck, once a day.</p>
            <p className="text-lime text-[11px] uppercase tracking-[0.25em] mt-1">
              a small daily practice
            </p>
          </div>
          <div className="text-right text-[10px] opacity-60 uppercase tracking-widest">
            hand-crafted · no. 001
          </div>
        </div>
      </div>
    </footer>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 px-4 pb-5 pt-2 pointer-events-none">
      <div className="max-w-[19rem] mx-auto bg-paper/90 backdrop-blur-md rounded-full px-2 py-2 shadow-[0_12px_40px_-16px_rgba(13,61,20,0.35)] ring-1 ring-forest/15 border-b-4 border-forest/20 pointer-events-auto flex justify-around items-center">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: "bg-forest text-paper shadow-md" }}
          className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-[12px] font-semibold uppercase tracking-widest text-forest/80 hover:bg-forest/10 transition-all"
        >
          <span>Today</span>
        </Link>
        <Link
          to="/calendar"
          activeProps={{ className: "bg-forest text-paper shadow-md" }}
          className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-[12px] font-semibold uppercase tracking-widest text-forest/80 hover:bg-forest/10 transition-all"
        >
          <span>Calendar</span>
        </Link>
      </div>
    </nav>
  );
}
