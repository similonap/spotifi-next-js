import Sidebar from "@/components/Sidebar";
import MusicPlayerContextProvider from "@/context/MusicPlayerContext";

const SongsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MusicPlayerContextProvider>
            <div className="flex min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212]">

                <Sidebar />
                {children}
            </div>
        </MusicPlayerContextProvider>
    );
};

export default SongsLayout;