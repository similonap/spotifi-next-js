import { Collection, MongoClient } from "mongodb";
import { User } from "@/types"

const client = new MongoClient(process.env.MONGODB_URI!);

export const userCollection: Collection<User> = client.db("spotifi").collection<User>("users");

export const findUserByEmail = async (email: string): Promise<User | null> => {
    return await userCollection.findOne<User>({ email });
}

export const findUserById = async (id: number): Promise<User | null> => {
    return await userCollection.findOne<User>({id});
}

export const createUser = async (user: Omit<User, "id">): Promise<void> => {
    const lastUser = await userCollection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;
    const userWithId: User = { id: newId, ...user };
    await userCollection.insertOne(userWithId);
}

export const updateUser = async (id: number, updates: Partial<User>): Promise<void> => {
    await userCollection.updateOne({ id }, { $set: updates });
}