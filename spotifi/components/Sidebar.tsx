import Link from "next/link";
import LogoutButton from "./LogoutButton";
import CreditsDisplay from "./CreditsDisplay";
import CreditsDisplaySkeleton from "./CreditsDisplaySkeleton";
import { Suspense } from "react";

const Sidebar = async () => {

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-black p-6 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 text-emerald-500"
                    >
                        <circle cx="12" cy="12" r="2" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"/>
                    </svg>
                    Spotifi
                </h1>
            </div>

            <Suspense fallback={<CreditsDisplaySkeleton />}>
                <CreditsDisplay />
            </Suspense>

            <nav className="flex-1 flex flex-col gap-2">
                <Link
                    href="/songs"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                    Songs
                </Link>
            </nav>

            <div className="mt-auto">
                <LogoutButton />
            </div>
        </aside>
    );
};

export default Sidebar;
