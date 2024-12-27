import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-red-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <ShieldAlert className="w-12 h-12 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          
          <p className="text-gray-600 mb-8">
            Sorry, you don't have permission to access this page. 
            Please contact an administrator if you believe this is a mistake.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>

            <Button
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}