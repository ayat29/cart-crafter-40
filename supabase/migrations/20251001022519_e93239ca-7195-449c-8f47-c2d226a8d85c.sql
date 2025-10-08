-- Add RLS policies for profiles table
CREATE POLICY "Users can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own profile"
  ON public.profiles
  FOR DELETE
  USING (true);
