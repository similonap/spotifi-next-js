"use client";

import { logout } from "@/actions/authActions";

const LogoutButton = () => {
    const handleLogout = async () => {
        await logout();
    };

    return (
        <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-[1px] shadow-lg shadow-black/50 transition hover:shadow-emerald-500/20"
        >
            <div className="flex w-full items-center gap-3 rounded-lg bg-neutral-950/80 px-4 py-3 backdrop-blur">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-neutral-400"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="text-sm font-semibold text-white">Logout</span>
            </div>
        </button>
    );
};

export default LogoutButton;
