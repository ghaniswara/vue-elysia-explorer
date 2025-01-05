import { GetUserFoldersResponse , folderTree} from "../model/folder";
import { userRepository } from "../repository/user";
import { folderService } from "../service/folder";

export async function getUserFolders(username: string) : Promise<typeof GetUserFoldersResponse.static> {

    console.log("username", username)

    const user = await userRepository.getUserByUsername(username);
    console.log("user", user)
    if (!user) {
        return {
            status: 404,
            message: "User not found",
            data: {
                children: [],
                id: '',
                name: '',
                path: '',
                type: 'folder'
            }
        }
    }
    
    try {
        const folders = await folderService.getUserFolders(user.id);
        return {
            status: 200,
            message: "Folders fetched successfully",
            data: folders
        }
    } catch (error) {
        return {
            status: 500,
            message: "Error fetching folders",
            data: {
                children: [],
                id: '',
                name: '',
                path: '',
                type: 'folder'
            }
        }
    }
}