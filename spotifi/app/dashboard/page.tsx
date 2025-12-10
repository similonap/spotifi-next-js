import { getCurrentUser, logout } from "@/actions/authActions";
import SongCatalog from "@/components/SongCatalog";
import Image from "next/image";

export default async function Page() {
    const user = await getCurrentUser();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <SongCatalog/>
        </div>
    )
}
