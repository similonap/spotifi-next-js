import { Collection, MongoClient, SortDirection } from "mongodb";
import { Song, SortField } from "@/types"

export const PAGE_SIZE = 10;

const client = new MongoClient(process.env.MONGODB_URI!);

export const songsCollection: Collection<Song> = client.db("spotifi").collection<Song>("songs");

export const seedSongs = async () => {

    const response = await fetch("https://sampleapis.assimilate.be/music/songs");
    const data: Song[] = await response.json();


    let songs: Song[] = data;
    await songsCollection.deleteMany({});
    if (await songsCollection.countDocuments() === 0) {
        songsCollection.insertMany(songs);
        console.log("Seeded songs collection");
    }
    console.log("Songs collection seeded!");
}

export const getSongs = async (
  userId: number | null, 
  q: string, 
  sortField: SortField, 
  sortDirection: SortDirection, 
  page: number = 1
) => { 
    
    const pipeline: any[] = [];

    if (q) {
        const regex = new RegExp(q, 'i');
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } },
                ],
            },
        });
    }

    if (userId != null) {
        pipeline.push(
            {
                $lookup: {
                    from: 'users',
                    let: { songId: '$id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$id', userId] } } },
                        { $project: { _id: 0, library: 1 } },
                    ],
                    as: 'user_ctx',
                },
            },
            { $addFields: { owned: { $in: ['$id', { $ifNull: [{ $arrayElemAt: ['$user_ctx.library', 0] }, []] }] } } },
            { $project: { user_ctx: 0 } }
        );
    }

    if (sortField === 'publish_date') {
        pipeline.push({ $sort: { 'more_information.publish_date': sortDirection === 'asc' ? -1 : 1 } });
    } else if (sortField === 'title') {
        pipeline.push({ $sort: { title: sortDirection === 'asc' ? 1 : -1 } });
    } else if (sortField === 'owned' && userId != null) {
        pipeline.push({ $sort: { owned: sortDirection === 'asc' ? -1 : 1 } });
    }

    pipeline.push({
        $facet: {
            data: [
                { $skip: (page - 1) * PAGE_SIZE },
                { $limit: PAGE_SIZE }
            ],
            totalCount: [
                { $count: 'count' }
            ]
        }
    });

    const [result] = await songsCollection.aggregate(pipeline).toArray();

    const songs = result.data;
    const total = result.totalCount[0] ? result.totalCount[0].count : 0;

    return {
        songs: makeLean<Song[]>(songs),
        pages: Math.ceil(total / PAGE_SIZE)
    };
}

export const getSongById = async (songId: number, userId: number | null = null): Promise<Song | null> => {
    const pipeline: any[] = [
        { $match: { id: songId } }
    ];

    if (userId != null) {
        pipeline.push(
            {
                $lookup: {
                    from: 'users',
                    let: { songId: '$id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$id', userId] } } },
                        { $project: { _id: 0, library: 1 } },
                    ],
                    as: 'user_ctx',
                },
            },
            { $addFields: { owned: { $in: ['$id', { $ifNull: [{ $arrayElemAt: ['$user_ctx.library', 0] }, []] }] } } },
            { $project: { user_ctx: 0 } }
        );
    }

    const [song] = await songsCollection.aggregate<Song>(pipeline).toArray();
    return song ? makeLean<Song>(song) : null;
}

const makeLean = <T,>(obj: any): T => {
    return JSON.parse(JSON.stringify(obj)) as T;
}