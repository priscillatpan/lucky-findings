import { createServerFn } from "@tanstack/react-start";

/**
 * Private beta: only emails on the invite list can request a sign-in code.
 */
export const checkInviteFn = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => {
    const email = String(data?.email ?? "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
      throw new Error("Please enter a valid email address");
    }
    return { email };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("allowed_emails")
      .select("id")
      .ilike("email", data.email)
      .maybeSingle();
    if (error) throw error;
    // Small delay so the endpoint can't be used to rapidly probe the list.
    await new Promise((r) => setTimeout(r, 350));
    return { allowed: !!row };
  });
