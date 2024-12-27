import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Facebook } from "lucide-react";
import { BrandGoogle } from "@mynaui/icons-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useAuthStore } from "../../store/auth-store";
import { FirebaseError } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    getAdditionalUserInfo
} from "firebase/auth";
import Loading from "../../animations/loading";

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
setPersistence(auth, browserLocalPersistence);

onAuthStateChanged(auth, async (user) => {
    if (user) {

        const userExists = await fetch(
            `http://localhost:3000/api/user/get-user/${user.uid}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (userExists.status === 200) {
            const data = await userExists.json();
            useAuthStore.getState().login({
                userId: data.user.userId,
                email: data.user.email,
                name: data.user.name,
                phone: data.user.phone,
                address: data.user.address,
                photoURL: data.user.photoUrl,
                role: data.user.role,
            });
            return;
        }
    }
});

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account",
        });
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userExists = await fetch(
                `http://localhost:3000/api/user/get-user/${user.uid}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (userExists.status === 200) {
                const data = await userExists.json();
                useAuthStore.getState().login({
                    userId: data.user.userId,
                    email: data.user.email,
                    name: data.user.name,
                    phone: data.user.phone,
                    address: data.user.address,
                    photoURL: data.user.photoUrl,
                    role: data.user.role,
                });
                navigate("/");
                return;
            }

            const response = await fetch(
                "http://localhost:3000/api/user/create-user",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    }),
                }
            );

            const data = await response.json();

            useAuthStore.getState().login({
                userId: data.user.userId,
                email: data.user.email,
                name: data.user.name,
                phone: data.user.phone,
                address: data.user.address,
                photoURL: data.user.photoUrl,
                role: data.user.role,
            });

            navigate("/");
        } catch (error) {
            console.error("Error during sign-in:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        setIsLoading(true);
        const provider = new FacebookAuthProvider();
        provider.setCustomParameters({
            display: "popup",
        });
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const additional = await getAdditionalUserInfo(result);

            const userExists = await fetch(
                `http://localhost:3000/api/user/get-user/${user.uid}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (userExists.status === 200) {
                const data = await userExists.json();
                useAuthStore.getState().login({
                    userId: data.user.userId,
                    email: data.user.email,
                    name: data.user.name,
                    phone: data.user.phone,
                    address: data.user.address,
                    photoURL: data.user.photoUrl,
                    role: data.user.role,
                });
                navigate("/");
                return;
            }

            const response = await fetch(
                "http://localhost:3000/api/user/create-user",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoURL: (additional?.profile as { picture: { data: { url: string } } })?.picture.data.url,
                    }),
                }
            );

            const data = await response.json();

            useAuthStore.getState().login({
                userId: data.user.userId,
                email: data.user.email,
                name: data.user.name,
                phone: data.user.phone,
                address: data.user.address,
                photoURL: data.user.photoUrl,
                role: data.user.role,
            });

            navigate("/");
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
        setIsLoading(false);
    };

    const handleEmailLogin = async (formData: LoginForm) => {
        setIsLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            const userExists = await fetch(
                `http://localhost:3000/api/user/get-user/${user.uid}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (userExists.status === 200) {
                const data = await userExists.json();
                useAuthStore.getState().login({
                    userId: data.user.userId,
                    email: data.user.email,
                    name: data.user.name,
                    phone: data.user.phone,
                    address: data.user.address,
                    photoURL: data.user.photoUrl,
                    role: data.user.role,
                });
                navigate("/");
                return;
            }

            const response = await fetch(
                "http://localhost:3000/api/user/create-user",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoURL: "",
                    }),
                }
            );

            const data = await response.json();

            useAuthStore.getState().login({
                userId: data.user.userId,
                email: data.user.email,
                name: data.user.name,
                phone: data.user.phone,
                address: data.user.address,
                photoURL: data.user.photoUrl,
                role: data.user.role,
            });

            navigate("/");
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error("Firebase Error Code:", error.code);
                console.error("Firebase Error Message:", error.message);
                switch (error.code) {
                    case "auth/invalid-credential":
                        setError(
                            "Invalid credentials. Please check your email and password."
                        );
                        break;
                    case "auth/wrong-password":
                        setError("Incorrect password. Please try again.");
                        break;
                    case "auth/invalid-email":
                        setError("The email address format is invalid.");
                        break;
                    default:
                        setError(
                            "An unknown error occurred. Please try again."
                        );
                        break;
                }
            } else {
                setError("Unexpected error. Please try again.");
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px] bg-white rounded-lg shadow-xl p-8"
            >
                <Link to="/" draggable="false">
                    <div className="flex justify-center mb-8">
                        <img
                            src="/src/assets/logo.svg"
                            alt="Flavor Haven Logo"
                            className="w-[180px] object-contain rounded-lg"
                            draggable="false"
                        />
                    </div>
                </Link>
                <form
                    onSubmit={handleSubmit(handleEmailLogin)}
                    className="space-y-6"
                >
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleSubmit(handleEmailLogin)}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loading /> : "Sign in"}
                    </Button>
                    {error && (
                        <p className="mt-4 text-sm text-red-500">{error}</p>
                    )}
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={handleFacebookLogin}
                        >
                            <Facebook className="w-5 h-5 mr-2" />
                            Facebook
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={handleGoogleLogin}
                        >
                            <BrandGoogle className="w-5 h-5 mr-2" />
                            Google
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
