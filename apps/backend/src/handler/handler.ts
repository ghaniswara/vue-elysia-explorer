import Elysia, { t } from 'elysia';
import { getUserFolders } from './folderHandler';
import {   GetUserFoldersResponse } from '../model/folder';
import { getUsers } from './userHandler';
import { GetUsersResponse } from '../model/user';


const routes = new Elysia({prefix: '/api/v1'})
    .get(
        '/folders/:username', 
        ({params}) => getUserFolders(params.username),
        {
            params: t.Object({
                username: t.String()
            }),
            detail: {
                tags: ['Folder'],
                description: 'Get all folders for a user'
            },
            response: GetUserFoldersResponse
        }
    )
    .get(
        '/users', 
        () => getUsers(),
        {
            detail: {
                tags: ['User'],
                description: 'Get all users'
            },
            response: GetUsersResponse
        }
    )
export { routes as AppRoutes };
