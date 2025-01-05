import { userRepository } from "../repository/user";
import { GetUsersResponse } from "../model/user";

export async function getUsers() : Promise<typeof GetUsersResponse.static> {
   try {
    const users = await userRepository.getUsers();
    return {
        status: 200,
        message: "Users fetched successfully",
        data: users
    }
   } catch (error) {
    console.error(error)
    return {
        status: 500,
        message: "Error fetching users",
        data: []
    }
   }
}