import { folderTree } from '../model/folder';
import { folderRepository, IFolderRepository } from '../repository/folder';

export class FolderService {
  constructor(private readonly folderRepository: IFolderRepository) {}


  async getUserFolders(userId: string): Promise<folderTree[]> {
    let folderTree = new Map<string, folderTree>();

    const rootFolder = await this.folderRepository.getRootFolder(userId);
    const children = await this.folderRepository.getAllFolderWithParent(userId);

    for (const folder of [...rootFolder, ...children]) {
      folderTree.set(folder.id, {
        id: folder.id,
        name: folder.name,
        children: [],
        path: folder.path,
        type: 'folder'
      });
    }

    for (const child of children) {
      if(child.parentId) {
        const parentFolder = folderTree.get(child.parentId);
        const childFolder = folderTree.get(child.id);
        if (parentFolder && childFolder) {
          parentFolder.children!.push(childFolder);
        }
      }
    }


    let res = rootFolder
    .map(root => folderTree.get(root.id))
    .filter((folder): folder is folderTree => folder !== undefined);

    return res;
  }  
}

export const folderService = new FolderService(folderRepository);