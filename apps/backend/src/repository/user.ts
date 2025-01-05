import { eq } from "drizzle-orm";
import { NewUser, User, users } from "../schema/users";
import { db } from "../shared/database";

export interface IUserRepository {
   getUserByUUID(uuid: string): Promise<User | undefined>;
   getUserByUsername(username: string): Promise<User | undefined>;
   createUser(user: NewUser): Promise<User>;
   getUsers(): Promise<User[]>;
}

const getUserByUUID = async (uuid: string) => {
    const res = await db.query.users.findFirst(
        { where: eq(users.id, uuid) }
    );
    return res;
}

const getUserByUsername = async (username: string) => {
    const res = await db.query.users.findFirst({ where: eq(users.username, username) });
    return res;
}

const createUser = async (user: NewUser) => {
    const newUser = await db.insert(users).values(user).returning();
    return newUser[0];
}

const getUsers = async () => {
    const res = await db.query.users.findMany();
    return res;
}

export const userRepository: IUserRepository = {
    getUserByUUID,
    getUserByUsername,
    createUser,
    getUsers
}