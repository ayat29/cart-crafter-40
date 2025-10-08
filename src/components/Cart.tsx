import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [open, setOpen] = useState(false);

  const handleCheckout = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to complete checkout");
        return;
      }

      const { error } = await supabase.from("purchases").insert({
        user_id: user.id,
        items: items as any,
        total: total
      });

      if (error) throw error;

      toast.success("Payment successful! (Demo)");
      clearCart();
      setOpen(false);
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 ml-auto"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
            <div className="flex justify-between mb-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-bold text-2xl">${total.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

