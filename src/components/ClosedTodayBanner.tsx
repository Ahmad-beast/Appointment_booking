import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ClosedTodayBanner = () => {
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const { data } = await supabase
        .from("holidays")
        .select("reason")
        .eq("date", today)
        .maybeSingle();
      if (data) setReason(data.reason || "Clinic Closed");
    })();
  }, []);

  if (!reason) return null;

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-destructive text-destructive-foreground shadow-md animate-fade-in">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>Closed Today — {reason}</span>
      </div>
    </div>
  );
};

export default ClosedTodayBanner;
