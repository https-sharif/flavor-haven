import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function Footer() {
    const [subscribe, setSubscribe] = useState(false);

    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-primary">
                            Contact
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-primary" />
                                <span>+88 018 2627 1947</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                <span>info@flavorhaven.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-gray-400">
                                        ষোলশহর দুই নম্বর গেইট, CDA Avenue
                                    </p>
                                    <p className="text-gray-400">
                                        Chittagong 4000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="m-2">
                        <h3 className="text-xl font-bold mb-4 text-primary">
                            Quick Links
                        </h3>
                            <li>
                                <a
                                    href="/menu"
                                    className="hover:text-primary transition-colors"
                                >
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/reservations"
                                    className="hover:text-primary transition-colors"
                                >
                                    Reservations
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/orders"
                                    className="hover:text-primary transition-colors"
                                >
                                    Your Orders
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/track-order"
                                    className="hover:text-primary transition-colors"
                                >
                                    Track Order
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/track-reservation"
                                    className="hover:text-primary transition-colors"
                                >
                                    Track Reservation
                                </a>
                            </li>
                    </div>

                    <div className="m-2">
                        <h3 className="text-xl font-bold mb-4 text-primary">
                            Legal & Support
                        </h3>
                        <li>
                            <a
                                href="/terms"
                                className="hover:text-primary transition-colors"
                            >
                                Term Of Service
                            </a>
                        </li>
                        <li>
                            <a
                                href="/policy"
                                className="hover:text-primary transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/about"
                                className="hover:text-primary transition-colors"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="/contact"
                                className="hover:text-primary transition-colors"
                            >
                                Contact Us
                            </a>
                        </li>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 text-primary">
                            Newsletter
                        </h3>
                        <p className="mb-4">
                            Subscribe for exclusive updates and offers
                        </p>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(email)) {
                                    setSubscribe(false);
                                    const existingError = document.getElementById("email-error");
                                    if (existingError) {
                                        existingError.remove();
                                    }
                                    const errorMessage = document.createElement("p");
                                    errorMessage.textContent = "Please enter a valid email address.";
                                    errorMessage.className = "text-red-500 mt-2 absolute";
                                    errorMessage.id = "email-error";
                                    const form = e.target as HTMLFormElement;
                                    form.appendChild(errorMessage);

                                    errorMessage.style.opacity = "0";
                                    errorMessage.style.transition = "opacity 0.5s ease-out";
                                    requestAnimationFrame(() => {
                                        errorMessage.style.opacity = "1";
                                    });
                                    return;
                                }
                                const existingError = document.getElementById("email-error");
                                if (existingError) {
                                    existingError.remove();
                                }
                                setSubscribe(true);
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                id="email"
                                required
                                className="w-full px-4 py-2 bg-gray-900 border border-primary/20 rounded-md focus:outline-none focus:border-primary"
                            />
                            <Button className="w-full" type="submit">
                                Subscribe
                            </Button>
                        </form>
                        {subscribe && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute text-center text-white mt-3"
                              transition={{ delay: 1 }}
                            >
                              Subscribed successfully!
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Social Links & Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                className="hover:text-primary transition-colors"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                className="hover:text-primary transition-colors"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.twitter.com/"
                                target="_blank"
                                className="hover:text-primary transition-colors"
                            >
                                <Twitter className="w-6 h-6" />
                            </a>
                        </div>
                        <p className="text-gray-400">
                            © {new Date().getFullYear()} Flavor Haven. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
