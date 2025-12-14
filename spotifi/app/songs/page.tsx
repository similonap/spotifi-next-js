import Search from "@/components/Search";
import SongCatalog from "@/components/SongCatalog";
import SongCatalogSkeleton from "@/components/SongCatalogSkeleton";
import SortSelect from "@/components/SortSelect";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/songs">) {
    const searchParams = await props.searchParams;
    const q = typeof searchParams.q === "string" ? searchParams.q : "";
    const sortDirection : string = typeof searchParams.sortDirection === "string" ? searchParams.sortDirection : "asc";
    const sortField : string = typeof searchParams.sortField === "string" ? searchParams.sortField : "title";
    const page : number = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

    if (sortDirection !== "asc" && sortDirection !== "desc") {
        throw new Error("Invalid sort direction");
    }

    if (sortField !== "title" && sortField !== "owned" && sortField !== "publish_date") {
        throw new Error("Invalid sort field");
    }

    return (
        <div className="p-6 bg-gradient-to-b from-[#1e1e1e] to-[#121212] min-h-screen text-white">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
                <div className="flex-1">
                    <Search/>
                </div>
                <div className="md:w-80">
                    <SortSelect/>
                </div>
            </div>

            <Suspense fallback={<SongCatalogSkeleton/>}>
                <SongCatalog q={q} sortDirection={sortDirection} sortField={sortField} page={page}/>
            </Suspense>
        </div>
    )
}
