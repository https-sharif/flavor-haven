import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactInfo() {
    return (
        <div className="space-y-6">
            <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <div>
                        <p className="text-gray-600">
                            {" "}
                            ষোলশহর দুই নম্বর গেইট, CDA Avenue{" "}
                        </p>
                        <p className="text-gray-600">Chittagong 4000</p>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+88 018 2627 1947</p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">info@flavorhaven.com</p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-gray-600">
                        Mon-Thu: 11:00 AM - 10:00 PM
                    </p>
                    <p className="text-gray-600">
                        Fri-Sun: 11:00 AM - 11:00 PM
                    </p>
                </div>
            </div>
        </div>
    );
}
