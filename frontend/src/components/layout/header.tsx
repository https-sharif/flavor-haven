import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store/auth-store";
import { useCartStore } from "../../store/cart-store";
import { MobileNav } from "./mobile-navbar";

export function Header() {
    const { isAuthenticated, user } = useAuthStore();
    const totalItems = useCartStore((state) => state.totalItems);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-black  font-poppins">
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
                        to="/about"
                        className="text-white hover:text-[#D4AF37] transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="text-white hover:text-[#D4AF37] transition-colors"
                    >
                        Contact
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
                            <Link
                                to="/cart"
                                className="text-[#D4AF37] hover:text-[#B8960C] transition-colors"
                            >
                                <div className="relative">
                                    <ShoppingCart className="w-6 h-6 text-[#D4AF37]" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-xs font-semibold px-1 rounded-full">
                                            {totalItems}
                                        </span>
                                    )}
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
                        <div className="hidden md:flex items-center gap-4">
                            <Button variant="outline" size="sm" to="/login">
                                Login
                            </Button>
                            <Button variant="primary" size="sm" to="/signup">
                                Sign Up
                            </Button>
                        </div>
                    )}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden text-[#D4AF37] hover:text-[#B8960C] transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <MobileNav
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </header>
    );
}