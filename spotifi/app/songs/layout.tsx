import Sidebar from "@/components/Sidebar";

const SongsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212]">

            <Sidebar />
            {children}
        </div>
    );
};

export default SongsLayout;