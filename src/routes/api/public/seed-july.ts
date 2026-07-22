import { createFileRoute } from "@tanstack/react-router";
import { seedJulyMockFn } from "@/lib/seed.functions";

export const Route = createFileRoute("/api/public/seed-july")({
  server: {
    handlers: {
      POST: async () => {
        const result = await seedJulyMockFn();
        return new Response(JSON.stringify(result), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
