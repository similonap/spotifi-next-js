import Link from "next/link";
import LogoutButton from "./LogoutButton";
import CreditsDisplay from "./CreditsDisplay";
import CreditsDisplaySkeleton from "./CreditsDisplaySkeleton";
import { Suspense } from "react";

const Sidebar = async () => {

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-black p-6 flex flex-col">
            <div className="mb-8 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <img src="/slopifylogo.png" className="w-8 h-8"/>
                    <span className="text-lg font-semibold tracking-[0.35em] text-white">SLOPIFY</span>
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
