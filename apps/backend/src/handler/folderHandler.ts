import { GetUserFoldersResponse , SearchFolderResponse, folderTree} from "../model/folder";
import { userRepository } from "../repository/user";
import { folderService } from "../service/folder";

// TODO: throw error instead and catch the error in the routes definition to set the response status
// TODO: define list error

export async function getUserFolders(username: string) : Promise<typeof GetUserFoldersResponse.static> {
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

export async function searchFolder(username: string, search: string) : Promise<typeof SearchFolderResponse.static> {
    const user = await userRepository.getUserByUsername(username);
    if (!user) {
        return {
            status: 404,
            message: "User not found",
            data: []
        }
    }

    const folder = await folderService.findFoldersByPath(search, user.id);

    return {
        status: 200,
        message: "Folder fetched successfully",
        data: folder
    }
}