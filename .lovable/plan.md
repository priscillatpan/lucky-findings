## Add day detail modal + caption previews

### 1. Day detail modal on calendar
- Add local `useState` in `src/routes/calendar.tsx` for `selectedFinding: FindingWithUrl | null`.
- Make each calendar cell that has a finding a `<button>` (keyboard-accessible) that sets the selected finding.
- Render a lightweight modal at the bottom of `CalendarPage` when a finding is selected:
  - Backdrop: fixed, `bg-forest/40`, click closes.
  - Card: paper background, rounded, small strip of clover tape at top, polaroid frame around the full-size photo (uses existing `photo_url`, not the thumbnail), quest title, category dot, formatted date, italic caption if present.
  - Close on backdrop click, ESC key, and a small × in the corner.
  - Add `overflow-hidden` guard on body while open (simple `useEffect`).
- No new route, no new fetch — reuses the already-loaded `findings` query. Photo URL is the existing 800-ish signed URL; no extra transform request.

### 2. Caption preview in Recent finds list
- In the Recent finds list on Calendar, when `f.caption` exists, render it as a truncated italic one-liner (`line-clamp-1 text-[10px] italic text-forest/60`) under the category/date row.
- No layout change when caption is absent.

### Out of scope
- No dedicated `/day/$date` route.
- No hover tooltips on the calendar grid (kept clean per your pick).
- No changes to Home or saving flow.

### Technical notes
- Modal is a plain conditional div inside `CalendarPage`; no portal, no new dependency.
- Cells become `<button type="button">` with `aria-label={f.quest_title}`; empty cells stay as plain divs.
- Selected finding closes automatically if `findings` refetches and the id disappears (guard with a lookup).
