import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import cloverLogo from "@/assets/icon_1.png.asset.json";
import { lockSite } from "@/lib/gate.functions";

export function Nav() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const lock = useServerFn(lockSite);
  async function onLock() {
    await qc.cancelQueries();
    qc.clear();
    await lock();
    navigate({ to: "/unlock", replace: true });
  }
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
          <button onClick={onLock} className="text-forest/40 hover:text-forest transition-colors">
            Lock
          </button>
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
