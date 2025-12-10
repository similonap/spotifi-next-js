export interface User {
    id: number;
    email: string;
    name: string;
    credits: number;
    avatar: string;
    passwordHash: string;
    library: string[];
}


export interface Song {
    video_id: string;
    title: string;
    description: string;
    credits: number;
    link: string;
    more_information: {
        publish_date: string;
        genre: string;
        type: string;
    };
}

