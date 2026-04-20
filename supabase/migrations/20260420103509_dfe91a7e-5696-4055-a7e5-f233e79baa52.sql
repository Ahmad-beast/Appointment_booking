
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
ON public.services FOR SELECT
USING (true);

CREATE POLICY "Admins can insert services"
ON public.services FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update services"
ON public.services FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete services"
ON public.services FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.services (name, description, price, duration_minutes, sort_order) VALUES
('Teeth Cleaning', 'Professional cleaning and polishing for healthy gums and bright smile.', 80, 30, 1),
('Teeth Whitening', 'Advanced whitening treatment for a brighter, more confident smile.', 250, 60, 2),
('Dental Implants', 'Permanent tooth replacement with natural-looking implants.', 1500, 90, 3),
('Braces & Orthodontics', 'Straighten teeth with modern braces or clear aligners.', 3000, 45, 4),
('Root Canal Treatment', 'Save infected teeth with painless root canal therapy.', 600, 75, 5),
('Cosmetic Dentistry', 'Veneers, bonding, and smile makeovers for perfect aesthetics.', 800, 60, 6),
('Dental Crowns', 'Custom-made crowns to restore damaged teeth.', 700, 60, 7),
('Emergency Dental Care', 'Immediate care for dental pain and emergencies.', 150, 30, 8);
