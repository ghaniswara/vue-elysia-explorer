import { folderTree } from "../model/folder";
import { folderRepository, IFolderRepository } from "../repository/folder";

export class FolderService {
  constructor(private readonly folderRepository: IFolderRepository) {}

  async getUserFolders(userId: string): Promise<folderTree> {
    let folderTree = new Map<string, folderTree>();

    const rootFolder = await this.folderRepository.getRootFolder(userId);
    const children = await this.folderRepository.getAllFolderWithParent(userId);

    for (const folder of [...rootFolder, ...children]) {
      folderTree.set(folder.id, {
        id: folder.id,
        name: folder.name,
        children: [],
        path: folder.path,
        type: "folder",
      });
    }

    for (const child of children) {
      if (child.parentId) {
        const parentFolder = folderTree.get(child.parentId);
        const childFolder = folderTree.get(child.id);
        if (parentFolder && childFolder) {
          parentFolder.children!.push(childFolder);
        }
      }
    }

    let res: folderTree = {
      children: rootFolder
        .map((root) => folderTree.get(root.id))
        .filter((folder): folder is folderTree => folder !== undefined),
      id: "",
      name: "Root",
      path: "",
      type: "folder",
    };

    return res;
  }

  async getFolderContent(path: string, userId: string): Promise<folderTree> {
    const rootFolder = await this.folderRepository.findFoldersByPath({
      path,
      userId,
      caseSensitive: true,
    });
    const children = await this.folderRepository.findFoldersByPath({
      path: rootFolder[0].path + "/%",
      userId,
      caseSensitive: false,
    });

    let folderTree = new Map<string, folderTree>();

    console.log("getFolderContent");
    console.log("rootFolder: ", rootFolder);
    console.log("children: ", children);

    for (const folder of [...rootFolder, ...children]) {
      folderTree.set(folder.id, {
        id: folder.id,
        name: folder.name,
        children: [],
        path: folder.path,
        type: "folder",
      });
    }

    for (const child of children) {
      if (child.parentId) {
        const parentFolder = folderTree.get(child.parentId);
        const childFolder = folderTree.get(child.id);
        if (parentFolder && childFolder) {
          parentFolder.children!.push(childFolder);
        }
      }
    }

    return (
      folderTree.get(rootFolder[0].id) ?? {
        id: "",
        name: "",
        children: [],
        path: "",
        type: "folder",
      }
    );
  }

  // TODO: implement fuzzy search
  async findFoldersByPath(
    path: string,
    userId?: string
  ): Promise<folderTree[]> {
    const folders = await this.folderRepository.findFoldersByPath({
      path: "%" + path + "%",
      userId,
      caseSensitive: false,
    });
    let res: folderTree[] = [];
    for (const folder of folders) {
      res.push({
        id: folder.id,
        name: folder.name,
        path: folder.path,
        type: "folder",
        children: [],
      });
    }
    return res;
  }
}

export const folderService = new FolderService(folderRepository);
