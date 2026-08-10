CREATE TABLE public.allowed_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX allowed_emails_email_idx ON public.allowed_emails (lower(email));

GRANT ALL ON public.allowed_emails TO service_role;

ALTER TABLE public.allowed_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages the invite list"
ON public.allowed_emails FOR ALL
TO service_role
USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_allowed_emails_updated_at
BEFORE UPDATE ON public.allowed_emails
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();