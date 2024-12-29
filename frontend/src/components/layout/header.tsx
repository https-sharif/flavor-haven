import { Link } from "react-router-dom";
import { Menu, User, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store/auth-store";
import { useCartStore } from "../../store/cart-store";

export function Header() {
    const { isAuthenticated, user } = useAuthStore();
    const totalItems = useCartStore((state) => state.totalItems);

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm font-poppins">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-[#D4AF37] text-2xl font-bold h-auto flex items-center"
                    draggable="false"
                >
                    <img
                        src="/src/assets/logo.svg"
                        alt="Flavor Haven Logo"
                        className="w-[120px]"
                        draggable="false"
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        to="/menu"
                        className="text-white hover:text-[#D4AF37] transition-colors"
                    >
                        Menu
                    </Link>
                    <Link
                        to="/reservations"
                        className="text-white hover:text-[#D4AF37] transition-colors"
                    >
                        Reservations
                    </Link>
                    <Link
                        to="/orders"
                        className="text-white hover:text-[#D4AF37] transition-colors"
                    >
                        Orders
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/cart">
                            <div className="relative">
                                <ShoppingCart className="w-6 h-6 text-[#D4AF37]" />
                                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-xs font-semibold px-1 rounded-full">{totalItems} </span>
                            </div>
                                
                            </Link>
                            <Link
                                to="/profile"
                                className="flex items-center gap-2"
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user?.name || "User"}
                                        className="w-6 h-6 rounded-full"
                                    />
                                ) : (
                                    <User className="w-6 h-6 text-[#D4AF37]" />
                                )}
                                <span className="text-white">{user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" size="sm" to="/login">
                                Login
                            </Button>
                            <Button variant="primary" size="sm" to="/signup">
                                Sign Up
                            </Button>
                        </>
                    )}
                    <button className="md:hidden">
                        <Menu className="w-6 h-6 text-[#D4AF37]" />
                    </button>
                </div>
            </div>
        </header>
    );
}
