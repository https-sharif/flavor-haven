import { motion } from 'framer-motion';
import { ScrollText, AlertCircle, Scale, HelpCircle } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">
            Terms of <span className="text-primary">Service</span>
          </h1>

          <div className="space-y-8">
            <section className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ScrollText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Agreement Overview</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using our services, you agree to be bound by these terms.
                Please read them carefully before making a reservation or placing an order.
              </p>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Reservations & Cancellations</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Reservations must be made at least 2 hours in advance</li>
                <li>Cancellations require minimum 4 hours notice</li>
                <li>Late cancellations may incur a fee</li>
                <li>No-shows will be recorded</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Payment Terms</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>All prices are in BDT and include applicable taxes</li>
                <li>Payment is required at the time of ordering</li>
                <li>We accept major credit cards and digital wallets</li>
                <li>Refunds are processed within 5-7 business days</li>
                <li>Orders cannot be canceled once the chef has begun preparation</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Dispute Resolution</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Any disputes arising from the use of our services will be resolved through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
                <li>Direct communication with our customer service</li>
                <li>Mediation if necessary</li>
                <li>Arbitration as a last resort</li>
              </ul>
            </section>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </p>
        </motion.div>
      </div>
    </div>
  );
}