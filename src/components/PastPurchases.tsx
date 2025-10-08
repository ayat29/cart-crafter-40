import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Purchase {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  created_at: string;
}

export function PastPurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPurchases((data as any) || []);
    } catch (error) {
      toast.error("Failed to load purchases");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading purchases...</div>;
  }

  if (purchases.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Past Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No purchases yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Purchases</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  {new Date(purchase.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
              <p className="font-bold text-lg">${purchase.total.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              {purchase.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-muted-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

