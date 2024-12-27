import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { MenuItem } from "../../../types";
import { useAuthStore } from "../../../store/auth-store";
import { useCartStore } from "../../../store/cart-store";
import { displayMessage } from "../../../lib/displayMessage";

interface MenuCategoryProps {
    item: MenuItem;
}

export function MenuCategory({ item }: MenuCategoryProps) {
    const { isAuthenticated } = useAuthStore();
    const { addItem } = useCartStore();

    const addToCart = async () => {
        if (!isAuthenticated) {
            displayMessage("Please login to add items to your order");
        } else {

            addItem({ ...item, quantity: 1 });
            displayMessage("Item added to your order");
        }
    };

    return (
        <Card className="overflow-hidden group min-h-[450px] relative hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="relative h-48 flex justify-center items-center flex-col mb-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className=" h-full object-contain"
                />
                {!item.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold text-center">
                            Currently Unavailable
                        </span>
                    </div>
                )}
            </div>

            <CardHeader>
                <CardTitle className="flex justify-between items-center py-2">
                    <span>{item.name}</span>
                    <span className="text-primary">৳{item.price}</span>
                </CardTitle>
                <p className="text-gray-600 text-sm">{item.description}</p>
            </CardHeader>

            <CardContent>
                <Button
                    variant="primary"
                    className={`absolute bottom-5 w-10/12 cursor-pointer ${
                        item.available
                            ? "hover:bg-secondary hover:text-tertiary"
                            : "cursor-not-allowed"
                    }`}
                    disabled={!item.available}
                    onClick={addToCart}
                >
                    Add to Order
                </Button>
            </CardContent>
        </Card>
    );
}
