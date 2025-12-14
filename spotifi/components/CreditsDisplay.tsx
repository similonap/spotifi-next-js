import { getCurrentUser } from "@/actions/authActions";
import Link from "next/link";

const CreditsDisplay = async () => {
    const user = await getCurrentUser();
    const credits = user?.credits ?? 0;

    return (
        <div className="mb-6 rounded-lg bg-neutral-900/60 p-3 backdrop-blur">
            <div className="mb-1 flex items-center gap-2">
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
                <span className="text-lg font-bold text-white">{credits}</span>
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
    );
};

export default CreditsDisplay;
