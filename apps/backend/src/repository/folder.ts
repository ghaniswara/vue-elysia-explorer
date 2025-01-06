import { CreateFolder, Folder, folders } from '../schema/folders';
import { db } from '../shared/database';
import { and, eq, isNotNull, isNull, like } from 'drizzle-orm';


export interface IFolderRepository {
  getRootFolder(userId?: string): Promise<Folder[]>;
  getAllFolderWithParent(userId?: string): Promise<Folder[]>;
  getFolderById(id: string): Promise<Folder | undefined>;
  createFolder(folder: CreateFolder): Promise<Folder>;
  getFolderByPath(path: string): Promise<Folder | undefined>;
  findFoldersByPath(path: string, userId?: string): Promise<Folder[]>;
}


const getMainFolderPath = async (userId?: string) => {

  const mainFolderPath = await db.query.folders.findMany({
    where: and(
      isNull(folders.parentId), 
      userId ? eq(folders.createdBy, userId) : undefined
    ),
  });
  return mainFolderPath;
};

const getAllFolderWithParent = async (userId?: string) => {

  const allFolders = await db.query.folders.findMany({
    where: and(
      userId ? eq(folders.createdBy, userId) : undefined,
      isNotNull(folders.parentId)
    ),
    orderBy: (folders, { asc }) => [asc(folders.id)],
  });
  return allFolders;
};

const getFolderById = async (id: string) => {
  const folder = await db.query.folders.findFirst({
    where: eq(folders.id, id),
  });
  return folder;
};

const createFolder = async (folder: CreateFolder)  => {
  const newFolder = await db.insert(folders).values(folder).returning();
  return newFolder[0];
};

const getFolderByPath = async (path: string) => {
  const folder = await db.query.folders.findFirst({
    where: eq(folders.path, path),
  });
  return folder;
};

const findFoldersByPath = async (path: string, userId?: string) => {
 const res = await db.query.folders.findMany({
  where: and(
    like(folders.path, '%'+path+'%'),
    userId ? eq(folders.createdBy, userId) : undefined
  ),
  orderBy: (folders, { asc }) => [asc(folders.name)],
 });
 return res;
};


export const folderRepository: IFolderRepository = {
  getRootFolder: getMainFolderPath,
  getAllFolderWithParent: getAllFolderWithParent,
  getFolderById: getFolderById,
  createFolder: createFolder,
  getFolderByPath: getFolderByPath,
  findFoldersByPath: findFoldersByPath,
};