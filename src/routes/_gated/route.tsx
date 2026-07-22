import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { checkUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/_gated")({
  beforeLoad: async () => {
    const { unlocked } = await checkUnlocked();
    if (!unlocked) throw redirect({ to: "/unlock" });
  },
  component: () => <Outlet />,
});
