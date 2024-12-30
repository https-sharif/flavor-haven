import { motion } from "framer-motion";

const milestones = [
    {
        year: "2024",
        title: "Inception",
        description:
            "Flavor Haven was launched as an ambitious project to redefine modern culinary experiences.",
    },
    {
        year: "2025",
        title: "Grand Opening",
        description:
            "Officially opened doors to our first location, receiving widespread acclaim for our innovative approach.",
    },
    {
        year: "2026",
        title: "First Award",
        description:
            "Honored with the Rising Star Chef Award for our commitment to excellence and creativity.",
    },
    {
        year: "2027",
        title: "Second Location",
        description:
            "Expanded to a second location to accommodate growing demand and continue our culinary journey.",
    },
    {
        year: "2028",
        title: "Industry Leader",
        description:
            "Recognized as a leading name in fine dining, setting benchmarks for quality and innovation.",
    },
];

export function JourneySection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">
                    Our <span className="text-primary">Journey</span>
                </h2>

                <div className="max-w-4xl mx-auto">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={milestone.year}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -20 : 20,
                            }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex items-center gap-8 mb-12"
                        >
                            <div className="hidden md:block w-1/3 text-right">
                                <span className="text-4xl font-bold text-primary">
                                    {milestone.year}
                                </span>
                            </div>

                            <div className="hidden md:flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-primary" />
                                <div className="w-0.5 h-24 bg-primary/20" />
                            </div>

                            <div className="flex-1">
                                <span className="md:hidden text-2xl font-bold text-primary mb-2 block">
                                    {milestone.year}
                                </span>
                                <h3 className="text-xl font-semibold mb-2">
                                    {milestone.title}
                                </h3>
                                <p className="text-gray-600">
                                    {milestone.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
