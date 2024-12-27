import { UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const LoginRequiredPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[80vh] flex flex-col items-center justify-center"
        >
            <div className="bg-primary/10 p-6 rounded-full mb-6">
                <UserCheck className="w-12 h-12 text-primary" />
            </div>

            <h1 className="text-3xl font-bold mb-2">
                Please login to continue
            </h1>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                You need to login to access this page. If you don't have an
                account, you can create one for free.
            </p>

            <Link to="/login">
                <Button size="lg" className="font-semibold">
                    Login
                </Button>
            </Link>
        </motion.div>
    );
};

export default LoginRequiredPage;
