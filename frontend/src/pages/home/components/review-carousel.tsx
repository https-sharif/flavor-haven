import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
    {
        id: 1,
        text: "An extraordinary dining experience that transcends the ordinary. Every dish is a masterpiece of flavor and presentation.",
        author: "Emily Thompson",
        role: "Food Critic",
        rating: 5,
    },
    {
        id: 2,
        text: "The attention to detail in both service and cuisine is unmatched. A true gem in the fine dining scene.",
        author: "Michael Chen",
        role: "Restaurant Connoisseur",
        rating: 5,
    },
    {
        id: 3,
        text: "From the moment you step in, you're transported to a world of culinary excellence. Simply magnificent.",
        author: "Sarah Williams",
        role: "Lifestyle Blogger",
        rating: 5,
    },
    {
        id: 4,
        text: "An unforgettable experience that delights all the senses. A must-visit for any food lover.",
        author: "Tyler Nelson",
        role: "Restaurant Critic",
        rating: 4.5,
    },
    {
        id: 5,
        text: "The perfect blend of creativity and tradition. A dining experience that will leave you wanting more.",
        author: "Jessica Adams",
        role: "Food Enthusiast",
        rating: 4.5,
    },
];

export function ReviewCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Guest <span className="text-primary">Experiences</span>
                </h2>

                <div className="relative h-[400px] max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="flex flex-col items-center text-center">
                                <Quote className="w-16 h-16 text-primary mb-8" />
                                <p className="text-2xl md:text-3xl font-light mb-8 italic">
                                    "{reviews[currentIndex].text}"
                                </p>
                                <div className="flex items-center justify-center gap-2 mb-8">
                                    {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill={
                                                    index <
                                                    reviews[currentIndex].rating
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                                stroke="currentColor"
                                                className="w-6 h-6 text-primary"
                                            >
                                                <path d="M12 2.25c-.34 0-.65.2-.8.51l-2.62 5.52-5.95.86c-.36.05-.66.3-.76.65s.02.73.27.96l4.3 4.19-1.02 5.93c-.06.36.09.72.38.92.3.2.68.22 1.01.06l5.32-2.8 5.32 2.8c.15.08.31.12.47.12.2 0 .41-.06.58-.18.29-.2.44-.56.38-.92l-1.02-5.93 4.3-4.19c.25-.23.36-.58.27-.96-.1-.35-.4-.6-.76-.65l-5.95-.86-2.62-5.52a.875.875 0 0 0-.8-.51z" />
                                            </svg>
                                        )
                                    )}
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-xl font-semibold">
                                        {reviews[currentIndex].author}
                                    </p>
                                    <p className="text-gray-600">
                                        {reviews[currentIndex].role}
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-8">
                                    {reviews.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentIndex(index)
                                            }
                                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                                index === currentIndex
                                                    ? "bg-primary"
                                                    : "bg-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
