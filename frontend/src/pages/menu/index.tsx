import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import menuItems  from "./menuList";
import { MenuCategory } from "./components/menu-category";
import { MenuHero } from "./components/menu-hero";

const categories = ["starters", "mains", "desserts", "drinks"];

export function MenuPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredItems = menuItems.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === "all" || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <MenuHero />

            <div className="container mx-auto px-4 py-12">
                <div className=" z-30 bg-gray-50 pt-4 pb-6">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="relative mb-8 w-full md:w-1/2">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search our menu..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-6 py-2 rounded-full text-sm transition-colors ${
                                activeCategory === "all"
                                    ? "bg-primary text-black"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full capitalize transition-colors ${
                                    activeCategory === category
                                        ? "bg-primary text-black"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MenuCategory item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
