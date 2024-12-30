import { motion } from "framer-motion";
import { ContactForm } from "./components/contact-form";
import { ContactInfo } from "./components/contact-info";
import { Card } from "../../components/ui/card";

export function ContactPage() {
    interface ContactFormData {
        name: string;
        email: string;
        message: string;
        subject: string;
    }

    const handleSubmit = async (data: ContactFormData): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            if (!response.ok) {
            throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Form submitted successfully:", result);
        } catch (error) {
            console.error("There was a problem with the form submission:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-center mb-12">
                        Contact <span className="text-primary">Us</span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Card className="p-6 max-h-[550px]">
                            <h2 className="text-2xl font-semibold mb-6">
                                Send us a Message
                            </h2>
                            <ContactForm onSubmit={handleSubmit} />
                        </Card>

                        <div>
                            <h2 className="text-2xl font-semibold mb-6">
                                Get in Touch
                            </h2>
                            <ContactInfo />

                            <div className="mt-8 h-[300px] rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d860.1480149362718!2d91.82343394205171!3d22.36626494981975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8866939ed13%3A0x537622b209654df7!2sBiplob%20Udyan!5e0!3m2!1sen!2sbd!4v1734727686952!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Flavor Haven Location"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
