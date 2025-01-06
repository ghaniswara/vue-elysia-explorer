import { CreateFolder, Folder, folders } from "../schema/folders";
import { db } from "../shared/database";
import { and, eq, ilike, isNotNull, isNull, like } from "drizzle-orm";

export interface IFolderRepository {
  getRootFolder(userId?: string): Promise<Folder[]>;
  getAllFolderWithParent(userId?: string): Promise<Folder[]>;
  getFolderById(id: string): Promise<Folder | undefined>;
  createFolder(folder: CreateFolder): Promise<Folder>;
  getFolderByPath(path: string): Promise<Folder | undefined>;
  findFoldersByPath(options: {
    path: string;
    userId?: string;
    caseSensitive: boolean;
  }): Promise<Folder[]>;
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

const createFolder = async (folder: CreateFolder) => {
  const newFolder = await db.insert(folders).values(folder).returning();
  return newFolder[0];
};

const getFolderByPath = async (path: string) => {
  const folder = await db.query.folders.findFirst({
    where: eq(folders.path, path),
  });
  return folder;
};

const findFoldersByPath = async (options: {
  path: string;
  userId?: string;
  caseSensitive: boolean;
}) => {
  const res = await db.query.folders.findMany({
    where: and(
      options.caseSensitive
        ? like(folders.path, options.path)
        : ilike(folders.path, options.path),
      options.userId ? eq(folders.createdBy, options.userId) : undefined
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
