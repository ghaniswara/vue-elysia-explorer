
import { t } from 'elysia';
import { createResponseSchema } from './response';


export const FolderTree = t.Recursive(Self => t.Object({
  id: t.String(),
  name: t.String(),
  children: t.Array(Self),
  type: t.Union([t.Literal('file'), t.Literal('folder')]),
  path: t.String()
}))

export type folderTree = typeof FolderTree.static

export const GetUserFoldersResponse = createResponseSchema((FolderTree));