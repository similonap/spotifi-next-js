import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getCurrentUser } from "@/actions/authActions";

const Sidebar = async () => {
    const user = await getCurrentUser();

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

            {/* Credits Display */}
            <div className="mb-6 rounded-lg bg-neutral-900/60 p-3 backdrop-blur">
                <div className="flex items-center gap-2 mb-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-orange-500"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 11c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.5-.92 2.79-2.25 3.38v.62c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.5c0-.41.34-.75.75-.75.41 0 .75-.34.75-.75 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75zm3 5.5c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75z" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Credits</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-white">
                        {user?.credits ?? 0}
                    </span>
                    <span className="text-sm font-semibold text-orange-500">₿</span>
                </div>
                <div className="mt-3">
                    <Link
                        href="/billing"
                        className="inline-flex h-9 w-full items-center justify-center rounded-full bg-emerald-500 px-4 text-xs font-semibold text-black transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                    >
                        Add Coins
                    </Link>
                </div>
            </div>

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
