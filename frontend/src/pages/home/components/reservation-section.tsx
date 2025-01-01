import { motion } from "framer-motion";
import { Clock, Users, UtensilsCrossed } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function ReservationSection() {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-white"
                    >
                        <h2 className="text-4xl font-bold mb-16 text-center md:text-left">
                            Reserve Your{" "}
                            <span className="text-primary">Table</span>
                        </h2>
                        <div className="space-y-4 flex flex-col md:flex-row justify-around items-center">
                            <div className="text-center md:text-left">
                                <p className="text-gray-300 mb-8 text-lg w-full md:w-2/3">
                                    Experience exceptional dining in an
                                    atmosphere of unparalleled sophistication.
                                    Book your table now to ensure a memorable
                                    culinary journey.
                                </p>
                                <div className="hidden md:block">
                                    <Button size="lg" to="/reservations">
                                        Book a Table
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-4 w-full md:w-1/2 mt-8 md:mt-0">
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <UtensilsCrossed className="w-6 h-6 text-primary" />
                                    <span>Michelin-starred cuisine</span>
                                </div>
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <Users className="w-6 h-6 text-primary" />
                                    <span>Perfect for special occasions</span>
                                </div>
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <Clock className="w-6 h-6 text-primary" />
                                    <span>
                                        Evening service from 5 PM to 10 PM
                                    </span>
                                </div>
                            </div>
                            <div className="block md:hidden my-5">
                              <Button size="lg" to="/reservations">
                              Book a Table
                              </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
