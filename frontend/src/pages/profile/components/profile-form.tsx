import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import type { User } from "../../../types";

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    user: User;
    onSubmit: (data: ProfileFormData) => Promise<void>;
}

export function ProfileForm({ user, onSubmit }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting },} = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            address: user.address || "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input {...register("name")} />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input {...register("phone")} type="tel" />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Address
                </label>
                <Input {...register("address")} type="tex" />
                {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.address.message}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    );
}
