# User accounts for Lucky Findings

## Answer first: the sign-in code is the easiest option

A 6-digit code emailed at sign-in is built into the backend this app already
uses. Nothing to set up on your side — no separate account, no keys, no
password resets, no "forgot password" screens. You type your email, get a code,
you're in. It is less work than email/password and about the same as Google.

Recommendation: email code as the only sign-in method for now.

## Scope

1. **Sign-in screen** at `/auth`: enter email → enter 6-digit code → land on
   `/today`. Handles resend, wrong/expired code, and rate limiting.
2. **Invite-only**: an allowlist of approved emails. If an email isn't on it,
   the app says "you're on the waitlist, we'll be in touch" and no code is
   sent. You add emails yourself (small admin list, or I add them for you).
3. **Everything becomes per-account**: quests, photos, calendar, streaks are
   scoped to whoever is signed in.
4. **Landing page stays as-is**: waitlist front and center. The secret clover
   tap now opens the sign-in screen instead of the shared password box.
5. **Your existing July/August findings** get attached to your new account so
   nothing is lost.
6. **Sign out** in the app, plus the header showing you're signed in.

## Effort

Roughly one focused session of work. Breakdown:

- Sign-in screen + code flow: the bulk of it
- Invite allowlist + rules: small
- Rewiring findings to the signed-in user: medium, mostly mechanical
- Moving the old shared password gate out of the way: small

## Technical notes

- Auth: Cloud email OTP (`signInWithOtp` / `verifyOtp`), auto-confirm on, no
  passwords stored.
- New `allowed_emails` table (email, note, created_at) checked by a server
  function before a code is sent; readable only server-side.
- `findings` already has `user_id` and an owner-scoped policy, so the change is
  swapping `OWNER_USER_ID` for the authenticated user: `findings.functions.ts`
  moves from the admin client to `requireSupabaseAuth` + `context.supabase`,
  and photo paths keep the `<user_id>/...` prefix.
- App routes (`/today`, `/calendar`) move under `src/routes/_authenticated/`
  with the managed gate redirecting to `/auth`.
- The shared-password gate (`gate.functions.ts`, `/unlock`) is removed once
  accounts work; `SITE_PASSWORD` / `SESSION_SECRET` become unused.
- A one-time backfill updates existing rows' `user_id` to your new account id.

## Not included

- Google sign-in (can be added later in ~15 minutes)
- Profiles/usernames, sharing findings between people, public journals
- Push notifications
