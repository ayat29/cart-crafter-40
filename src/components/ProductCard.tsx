import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 gap-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button onClick={() => onAddToCart(product)} size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
