import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import { HomePage } from "./pages/home";
import { MenuPage } from "./pages/menu";
import { ProfilePage } from "./pages/profile";
import { ReservationsPage } from "./pages/reservations";
import { LoginPage } from "./pages/auth/login";
import { SignupPage } from "./pages/auth/signup";
import { NotFoundPage } from "./pages/errors/NotFoundPage";
import { TermsPage } from "./pages/legal/terms";
import { PolicyPage } from "./pages/legal/policy";
import { TrackOrderPage } from "./pages/track/order";
import { TrackReservationPage } from "./pages/track/reservation";
import { OrderList } from "./pages/orders/order-list";
import { AdminDashboard } from "./pages/admin";
import { CartPage } from "./pages/cart";

function App() {
    return (
        <Router
            future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true,
            }}
        >
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/reservations" element={<ReservationsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/orders" element={<OrderList />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/policy" element={<PolicyPage />} />
                        <Route path="/track-order/:orderId?" element={<TrackOrderPage />} />
                        <Route path="/track-reservation/:reservationId?" element={<TrackReservationPage />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
