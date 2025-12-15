"use client";

import { login } from "@/actions/authActions"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState } from "react"

const LoginPage = () => {
    const [state, loginAction, pending] = useActionState(login, { success: false, email: "", errors: { email: [], password: [], general: [] } });

    const router = useRouter();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1e1e1e] to-[#121212] p-6 text-white">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-[1px] shadow-2xl shadow-black/60">
                <div className="rounded-2xl bg-neutral-950/80 p-6 backdrop-blur">
                    <div className="mb-5 flex flex-col items-center gap-2">
                        <Image src="/slopifylogo.png" alt="Slopify logo" width={56} height={56} className="drop-shadow-lg" />
                        <span className="text-lg font-semibold tracking-[0.35em] text-white">SLOPIFY</span>
                    </div>
                    <h2 className="text-2xl font-bold">Login to your account</h2>
                    <p className="mt-1 text-sm text-neutral-400">
                        Enter your email below to login to your account
                    </p>
                    {state.errors.general.length > 0 && (
                        <p className="mt-2 text-sm text-red-500">
                            {state.errors.general.join(", ")}
                        </p>
                    )}
                </div>
                <div className="p-6">
                    <form action={loginAction} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className={`block text-sm font-medium ${state.errors.email.length > 0 ? 'text-red-500' : 'text-neutral-300'}`}>Email</label>
                            <input
                                className={`flex h-11 w-full rounded-lg border px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-900/60 ${state.errors.email.length > 0 ? 'border-red-500' : 'border-neutral-700'}`}
                                id="email"
                                name="email"
                                type="text"
                                defaultValue={state.email}
                                placeholder="m@example.com"
                            />
                            {state.errors.email.length > 0 && (
                                <p className="mt-1 text-xs text-red-500">
                                    {state.errors.email.join(", ")}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className={`block text-sm font-medium ${state.errors.password.length > 0 ? 'text-red-500' : 'text-neutral-300'}`}>Password</label>
                            <input
                                className={`flex h-11 w-full rounded-lg border px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-900/60 ${state.errors.password.length > 0 ? 'border-red-500' : 'border-neutral-700'}`}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Your password"
                            />
                            {state.errors.password.length > 0 && (
                                <p className="mt-1 text-xs text-red-500">
                                    {state.errors.password.join(", ")}
                                </p>
                            )}
                        </div>
                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={pending}
                                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-emerald-500 px-5 text-sm font-semibold text-black transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:opacity-50"
                            >
                                {pending ? "Logging in..." : "Login"}
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push("/auth/register")}
                                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-neutral-800 px-5 text-sm font-semibold text-white transition hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 disabled:opacity-50"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default LoginPage;