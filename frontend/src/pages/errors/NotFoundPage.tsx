import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-lg">
                Sorry, the page you are looking for does not exist.</p>
                <br />
            <Link to="/" className="text-black pointer p-2 bg-[#D4AF37] rounded-lg">Go back to Home</Link>
        </div>
    );
}
