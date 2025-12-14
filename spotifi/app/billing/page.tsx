"use client";

import { buyCredits } from "@/actions/storeActions";
import { useActionState } from "react";


export default function BillingPage() {
    const [state, buyCreditsAction, pending] = useActionState(buyCredits, {success: false})


    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1e1e1e] to-[#121212] p-6 text-white">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-[1px] shadow-2xl shadow-black/60">
                <div className="rounded-2xl bg-neutral-950/80 p-6 backdrop-blur">
                    {state.error && (
                        <div className="mb-4 flex items-start gap-3 rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <p className="text-sm text-red-400">
                                {state.error}
                            </p>
                        </div>
                    )}
                    <div className="mb-4 flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-emerald-500"
                        >
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        <h1 className="text-2xl font-bold">Add Coins</h1>
                    </div>

                    <p className="mb-6 text-sm text-neutral-400">
                        Demo mode: payment details are pre-filled and read-only.
                    </p>

                    <form className="space-y-4" action={buyCreditsAction}>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-neutral-300">Cardholder Name</label>
                            <input
                                className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                type="text"
                                defaultValue="John Demo"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-neutral-300">Card Number</label>
                            <input
                                className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                type="text"
                                defaultValue="4242 4242 4242 4242"
                                readOnly
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-300">Expiry</label>
                                <input
                                    className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                    type="text"
                                    defaultValue="12/29"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-300">CVC</label>
                                <input
                                    className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                    type="text"
                                    defaultValue="123"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-neutral-300">Amount</label>
                            <select name="amount" className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900/60 px-4 text-sm text-white focus:outline-none" defaultValue="250">
                                <option value="100" className="bg-neutral-900">100 Coins</option>
                                <option value="250" className="bg-neutral-900">250 Coins</option>
                                <option value="500" className="bg-neutral-900">500 Coins</option>
                                <option value="1000" className="bg-neutral-900">1000 Coins</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={pending}
                            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-emerald-500 px-5 text-sm font-semibold text-black transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                        >
                            {pending ? "Processing..." : "Add Coins"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
