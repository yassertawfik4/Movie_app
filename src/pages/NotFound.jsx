import { Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";

const NotFound = () => {
    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
            style={{
                backgroundImage: `url('notfound.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <h1 className="text-[7rem] font-extrabold leading-none text-white drop-shadow-lg">
                    404
                </h1>

                <p className="text-yellow-400 text-2xl font-bold tracking-widest uppercase mt-2">
                    Page Not Found
                </p>

                <p className="text-gray-300 mt-4 max-w-md text-base">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="mt-8 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-lg transition text-lg"
                >
                    <Clapperboard size={22} />
                    GO HOME
                </Link>
            </div>
        </div>
    );
};

export default NotFound;