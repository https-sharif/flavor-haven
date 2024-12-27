import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import type { DeliveryInfo } from "../../../types/cart";
import { useAuthStore } from "../../../store/auth-store";

const deliverySchema = z.object({
    address: z.string().min(5, "Address is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    instructions: z.string().optional(),
});

interface DeliveryFormProps {
    onSubmit: (data: DeliveryInfo) => void;
    defaultValues?: Partial<DeliveryInfo>;
}

export function DeliveryForm({ onSubmit, defaultValues }: DeliveryFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DeliveryInfo>({
        resolver: zodResolver(deliverySchema),
        defaultValues,
    });

    const { user } = useAuthStore();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">
                    Address
                </label>
                <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("address")}
                    defaultValue={user?.address}
                />
                {errors.address && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.address.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("phone")}
                    defaultValue={user?.phone}
                />
                {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Delivery Instructions (Optional)
                </label>
                <textarea
                    {...register("instructions")}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                />
            </div>

            <Button type="submit" className="w-full">
                Continue to Payment
            </Button>
        </form>
    );
}
