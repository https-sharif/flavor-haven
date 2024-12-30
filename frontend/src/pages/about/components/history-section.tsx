import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export function HistorySection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-8">Our <span className="text-primary">Story</span></h2>
          <div className="space-y-6 text-gray-300">
            <p>
            Established in 2024, Flavor Haven is a visionary project dedicated to redefining the culinary experience. Our mission is to combine exceptional quality, innovation, and service to craft unforgettable moments for every guest.
            </p>
            <p>
            With a focus on modern techniques and fresh ingredients, Flavor Haven is setting new standards in the dining industry, driven by passion and a commitment to excellence.
            </p>
          </div>
          
          <div className="mt-12 inline-flex items-center gap-2 text-primary">
            <Clock className="w-6 h-6" />
            <span className="text-xl">Serving Excellence Since 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}