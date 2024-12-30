import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export function PolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">
            Privacy <span className="text-primary">Policy</span>
          </h1>

          <div className="space-y-8">
            <section className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Data Protection</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We take the protection of your personal data seriously. This policy explains how we collect,
                use, and safeguard your information when you use our services.
              </p>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Information Security</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Secure payment processing</li>
                <li>Encrypted data transmission</li>
                <li>Regular security audits</li>
                <li>Restricted data access</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Data Usage</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect and use your data to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Process your orders and reservations</li>
                <li>Improve our services</li>
                <li>Communicate important updates</li>
                <li>Personalize your dining experience</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Your Rights</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Request data correction</li>
                <li>Delete your account</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>
          </div>

            <p className="mt-8 text-sm text-gray-500">
            Last updated: {new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
        </motion.div>
      </div>
    </div>
  );
}