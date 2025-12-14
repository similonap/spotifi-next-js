import { getSongById } from "@/database/store";
import { getCurrentUser } from "@/actions/authActions";
import Sidebar from "@/components/Sidebar";
import PlayButton from "@/components/PlayButton";
import BuyButton from "@/components/BuyButton";
import { notFound } from "next/navigation";

const SongsDetail = async (props: PageProps<"/songs/[id]">) => {
    const params = await props.params;
    let id = parseInt(params.id);

    const user = await getCurrentUser();
    const song = await getSongById(id, user?.id || null);
    if (!song) {
        notFound();
    }

    const youtubeId = song.more_information.youtube?.includes("v=") 
        ? song.more_information.youtube.split("v=")[1].split("&")[0]
        : song.more_information.youtube?.split("/").pop();

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
            <Sidebar />
            <main className="ml-64 flex-1 p-8 text-white">
                <div className="mx-auto max-w-7xl">
                    {/* Hero Section */}
                    <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Left: Album Art & Actions */}
                        <div className="relative">
                            <div className="group relative aspect-square overflow-hidden rounded-xl shadow-2xl shadow-black/60">
                                <img
                                    src={song.thumbnail}
                                    alt={song.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <PlayButton song={song} />
                                {!song.owned && <BuyButton songId={song.id} price={song.credits} />}
                                {song.owned && (
                                    <div className="absolute top-4 left-4 z-10 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-black shadow-lg">
                                        ✓ Owned
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Song Info */}
                        <div className="flex flex-col justify-center space-y-6">
                            <div className="inline-block w-fit rounded-full bg-neutral-800/60 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-300">
                                {song.more_information.type}
                            </div>
                            
                            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
                                {song.title}
                            </h1>

                            <p className="text-lg leading-relaxed text-neutral-300">
                                {song.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-2 rounded-lg bg-neutral-800/40 px-4 py-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-emerald-500"
                                    >
                                        <path d="M9 18V5l12-2v13" />
                                        <circle cx="6" cy="18" r="3" />
                                        <circle cx="18" cy="16" r="3" />
                                    </svg>
                                    <span className="font-medium">{song.more_information.genre}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 rounded-lg bg-neutral-800/40 px-4 py-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-emerald-500"
                                    >
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span className="font-medium">
                                        {new Date(song.more_information.publish_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-lg bg-neutral-800/40 px-4 py-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-yellow-500"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                    <span className="font-medium">{song.credits} Credits</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {youtubeId && (
                    <div className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-[1px] shadow-2xl shadow-black/50">
                        <div className="overflow-hidden rounded-xl bg-neutral-950/80 p-6 backdrop-blur">
                            <div className="mb-4 flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6 text-red-500"
                                >
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <h2 className="text-2xl font-bold">Watch on YouTube</h2>
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                    title={song.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    )}
                  
                </div>
            </main>
        </div>
    );
}

export default SongsDetail;