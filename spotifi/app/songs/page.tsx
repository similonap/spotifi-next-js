import { getCurrentUser, logout } from "@/actions/authActions";
import Search from "@/components/Search";
import SongCatalog from "@/components/SongCatalog";
import SongCatalogSkeleton from "@/components/SongCatalogSkeleton";
import Image from "next/image";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/songs">) {
    const searchParams = await props.searchParams;
    const q = typeof searchParams.q === "string" ? searchParams.q : "";


    return (
        <div className="p-6 bg-gradient-to-b from-[#1e1e1e] to-[#121212] min-h-screen text-white">
            <Search/>

            <Suspense fallback={<SongCatalogSkeleton/>}>
                <SongCatalog q={q}/>
            </Suspense>
        </div>
    )
}
