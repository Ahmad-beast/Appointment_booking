import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Check, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";

type Review = { id: string; patient_name: string; rating: number; comment: string; approved: boolean; created_at: string };

const AdminReviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);

  const load = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    setReviews((data as Review[]) || []);
  };

  useEffect(() => { load(); }, []);

  const approve = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
    if (error) toast({ title: "Failed", variant: "destructive" });
    else { toast({ title: approved ? "Review approved" : "Review unapproved" }); load(); }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) toast({ title: "Failed", variant: "destructive" });
    else { toast({ title: "Deleted" }); load(); }
  };

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  const ReviewCard = ({ r }: { r: Review }) => (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold">{r.patient_name}</p>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "text-amber-400 fill-amber-400" : "text-border"}`} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{format(parseISO(r.created_at), "PPp")}</p>
        </div>
        <Badge variant={r.approved ? "default" : "secondary"}>{r.approved ? "Live" : "Pending"}</Badge>
      </div>
      <p className="text-sm text-foreground/80 mb-4">{r.comment}</p>
      <div className="flex gap-2">
        {!r.approved ? (
          <Button size="sm" onClick={() => approve(r.id, true)} className="flex-1"><Check className="w-4 h-4 mr-1" />Approve</Button>
        ) : (
          <Button size="sm" variant="outline" onClick={() => approve(r.id, false)} className="flex-1"><Eye className="w-4 h-4 mr-1" />Unpublish</Button>
        )}
        <Button size="sm" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
      </div>
    </Card>
  );

  return (
    <Tabs defaultValue="pending">
      <TabsList>
        <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
        <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="pending" className="mt-4">
        {pending.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">No pending reviews.</p> :
          <div className="grid md:grid-cols-2 gap-4">{pending.map((r) => <ReviewCard key={r.id} r={r} />)}</div>}
      </TabsContent>
      <TabsContent value="approved" className="mt-4">
        {approved.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">No approved reviews yet.</p> :
          <div className="grid md:grid-cols-2 gap-4">{approved.map((r) => <ReviewCard key={r.id} r={r} />)}</div>}
      </TabsContent>
    </Tabs>
  );
};

export default AdminReviews;
