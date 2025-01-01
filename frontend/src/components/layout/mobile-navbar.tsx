import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store/auth-store";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const auth = getAuth();
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        logout();
        navigate("/");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className="fixed right-0 top-0 bottom-0 w-[300px] bg-black z-50 p-6"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-white hover:text-primary"
                        >
                            <X className="w-10 h-10" />
                        </button>

                        <div
                            className="flex items-center justify-between flex-col"
                            onClick={onClose}
                        >
                            <Link
                                to="/profile"
                                className="text-white text-2xl font-bold h-auto flex items-center flex-col "
                                draggable="false"
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user?.photoURL}
                                        alt={user?.name}
                                        className="w-[80px] rounded-full mb-4 hover:scale-105 transition-transform"
                                        draggable="false"
                                    />
                                ) : (
                                    <User className="w-10 h-10" />
                                )}
                                <h1 className="hover:text-primary transition-colors px-4 py-2">
                                    {user?.name}
                                </h1>
                            </Link>
                        </div>

                        <nav className="flex flex-col gap-4 mt-12">
                            <Link
                                to="/menu"
                                className="text-white hover:text-primary transition-colors px-4 py-2"
                                onClick={onClose}
                            >
                                Menu
                            </Link>
                            <Link
                                to="/about"
                                className="text-white hover:text-primary transition-colors px-4 py-2"
                                onClick={onClose}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="text-white hover:text-primary transition-colors px-4 py-2"
                                onClick={onClose}
                            >
                                Contact
                            </Link>
                            <Link
                                to="/reservations"
                                className="text-white hover:text-primary transition-colors px-4 py-2"
                                onClick={onClose}
                            >
                                Reservations
                            </Link>
                            <Link
                                to="/orders"
                                className="text-white hover:text-primary transition-colors px-4 py-2"
                                onClick={onClose}
                            >
                                Orders
                            </Link>
                        </nav>

                        <div className="absolute bottom-8 left-6 right-6 space-y-3">
                            {user ? (
                                <>
                                    <Button
                                        variant="primary"
                                        onClick={handleLogout}
                                        className="w-full "
                                    >
                                        <LogOut className="mr-2" />
                                        Logout
                                    </Button>

                                    {user.role === "admin" && (
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                navigate("/admin");
                                                onClose();
                                            }}
                                            className="p-2 w-full"
                                        >
                                            Admin Dashboard
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={onClose}>
                                        <Button
                                            variant="outline"
                                            className="w-full mb-4"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup" onClick={onClose}>
                                        <Button
                                            variant="primary"
                                            className="w-full"
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
