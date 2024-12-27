import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/auth-store";
import { ProfileHeader } from "./components/profile-header";
import { ProfileForm } from "./components/profile-form";
import { Card } from "../../components/ui/card";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { Button } from '../../components/ui/button';
import LoginRequiredPage from "../errors/LoginRequiredPage";
import { displayMessage } from "../../lib/displayMessage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function ProfilePage() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [error, setError] = useState<string | null>(null);

    if (!user) {
        return <LoginRequiredPage />;
    }

    const handleLogout = async () => {
        await signOut(auth);
        logout();
        navigate("/");
    };

    const handleUpdateProfile = async (data: {
        name: string;
        phone: string;
        address: string;
    }) => {
        try {
            
            const response = await fetch('http://localhost:3000/api/user/update-user/', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.userId, ...data }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            displayMessage("Profile updated successfully");

            setError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(
                    "Failed to update profile. Please try again: " +
                        error.message
                );
            } else {
                setError("Failed to update profile. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    <ProfileHeader user={user} />
                    <div className="flex items-center mb-6 gap-4">
                        <Button variant="outline" onClick={handleLogout} className="ml-6">
                            <LogOut className="w-4 h-4 m-2" />
                            Logout
                        </Button>

                        {user.role === 'admin' && (
                            <Button
                                variant="outline"
                                onClick={() => navigate("/admin")}
                            >
                                Admin Dashboard
                            </Button>
                        )}
                    </div>

                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Edit Profile
                        </h2>
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
                                {error}
                            </div>
                        )}
                        <ProfileForm
                            user={user}
                            onSubmit={handleUpdateProfile}
                        />
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
