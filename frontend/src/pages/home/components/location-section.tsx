import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function LocationSection() {
    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl font-bold">
                            Find <span className="text-primary">Us</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Address
                                    </h3>
                                    <p className="text-gray-400">
                                        ষোলশহর দুই নম্বর গেইট, CDA Avenue
                                    </p>
                                    <p className="text-gray-400">
                                        Chittagong 4000
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Hours
                                    </h3>
                                    <p className="text-gray-400">
                                        Mon-Thu: 11:00 AM - 10:00 PM
                                    </p>
                                    <p className="text-gray-400">
                                        Fri-Sun: 11:00 AM - 11:00 PM
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Contact
                                    </h3>
                                    <p className="text-gray-400">
                                        +88 016 2181 0336
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Email
                                    </h3>
                                    <p className="text-gray-400">
                                        contact@flavorhaven.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a href="https://maps.app.goo.gl/R8VEQfVuxShXttT38" target="_blank" rel="noreferrer" className="inline-block">
                            <Button size="lg" variant="primary">
                                Get Directions
                            </Button>
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d860.1480149362718!2d91.82343394205171!3d22.36626494981975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8866939ed13%3A0x537622b209654df7!2sBiplob%20Udyan!5e0!3m2!1sen!2sbd!4v1734727686952!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Restaurant Location"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
