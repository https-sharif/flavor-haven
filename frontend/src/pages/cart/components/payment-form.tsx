import { useForm } from "react-hook-form";
import { CreditCard, HandCoins } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import type { PaymentInfo } from "../../../types/cart";
import { useState } from "react";
import Bkash from "../../../assets/bkash.svg";
import Loading from "../../../animations/loading";

interface PaymentFormProps {
    onSubmit: (data: PaymentInfo) => void;
    defaultValues?: Partial<PaymentInfo>;
}

export function PaymentForm({ onSubmit, defaultValues }: PaymentFormProps) {
    const {
        register,
        handleSubmit,
    } = useForm<PaymentInfo>({
        defaultValues: { method: "credit-card", ...defaultValues },
    });

    const [paymentMethod, setPaymentMethod] = useState<
        "credit-card" | "cod" | "bkash"
    >("credit-card");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const validateCreditCard = (data: PaymentInfo) => {
        const errors: { [key: string]: string } = {};

        if (!data.cardNumber) {
            errors.cardNumber = "Card number is required";
        } else if (!/^\d{16}$/.test(data.cardNumber)) {
            errors.cardNumber = "Card number must be 16 digits";
        }

        if (!data.expiryDate) {
            errors.expiryDate = "Expiry date is required";
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
            errors.expiryDate = "Expiry date must be in MM/YY format";
        }

        if (!data.cvv) {
            errors.cvv = "CVV is required";
        } else if (!/^\d{3,4}$/.test(data.cvv)) {
            errors.cvv = "CVV must be 3 or 4 digits";
        }

        return errors;
    };

    const handlePaymentSubmit = async (data: PaymentInfo) => {
        setLoading(true);
        if(paymentMethod === "credit-card") {
            const errors = validateCreditCard(data);
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                setLoading(false);
                return;
            }
        }
        else if(paymentMethod === "bkash") {
            if (!data.bkashNumber) {
                setErrors({ bkashNumber: "Bkash number is required" });
                setLoading(false);
                return;
            }
            else if(!/^\d{11}$/.test(data.bkashNumber)) {
                setErrors({ bkashNumber: "Bkash number must be 11 digits" });
                setLoading(false);
                return;
            }
        }
        
        onSubmit(data);
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit(handlePaymentSubmit)}
            className="space-y-6"
        >
            <div className="grid grid-cols-3 gap-4">
                {/* Credit Card Button */}
                <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center gap-2 ${
                        paymentMethod === "credit-card"
                            ? "border-primary bg-gray-100"
                            : "border-gray-200"
                    }`}
                    onClick={() => {
                        setPaymentMethod("credit-card");
                        register("method").onChange({
                            target: { value: "credit-card" },
                        });
                    }}
                >
                    <CreditCard className="w-5 h-5" />
                    <span>Credit Card</span>
                </button>

                {/* Bkash Button */}
                <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center gap-2 ${
                        paymentMethod === "bkash"
                            ? "border-primary bg-gray-100"
                            : "border-gray-200"
                    }`}
                    onClick={() => {
                        setPaymentMethod("bkash");
                        register("method").onChange({
                            target: { value: "bkash" },
                        });
                    }}
                >
                    <img src={Bkash} alt="Bkash" className="w-5 h-5" />
                    <span>Bkash</span>
                </button>

                {/* Cash On Delivery Button */}
                <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center gap-2 ${
                        paymentMethod === "cod"
                            ? "border-primary bg-gray-100"
                            : "border-gray-200"
                    }`}
                    onClick={() => {
                        setPaymentMethod("cod");
                        register("method").onChange({
                            target: { value: "cod" },
                        });
                    }}
                >
                    <HandCoins className="w-5 h-5" />
                    <span>Cash On Delivery</span>
                </button>
            </div>

            {paymentMethod === "credit-card" && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Card Number
                        </label>
                        <Input
                            {...register("cardNumber")}
                            placeholder="1234 5678 9012 3456"
                            maxLength={16}
                        />
                        {errors.cardNumber && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.cardNumber}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Expiry Date
                            </label>
                            <Input
                                {...register("expiryDate")}
                                placeholder="MM/YY"
                                maxLength={5}
                            />
                            {errors.expiryDate && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.expiryDate}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                CVV
                            </label>
                            <Input
                                {...register("cvv")}
                                type="password"
                                maxLength={4}
                                placeholder="123"
                            />
                            {errors.cvv && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.cvv}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod === "bkash" && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Bkash Number
                        </label>
                        <Input
                            {...register("bkashNumber")}
                            placeholder="017XXXXXXXX"
                            maxLength={11}
                        />
                        {errors.bkashNumber && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.bkashNumber}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <Button type="submit" className="w-full">
                {loading ? <Loading /> : "Place Order"}
            </Button>
        </form>
    );
}
