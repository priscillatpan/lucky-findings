
CREATE TABLE public.findings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quest_id TEXT NOT NULL,
  quest_title TEXT NOT NULL,
  quest_category TEXT NOT NULL,
  photo_path TEXT NOT NULL,
  caption TEXT,
  completed_on DATE NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, completed_on)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.findings TO authenticated;
GRANT ALL ON public.findings TO service_role;

ALTER TABLE public.findings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own findings" ON public.findings
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX findings_user_date_idx ON public.findings (user_id, completed_on DESC);
