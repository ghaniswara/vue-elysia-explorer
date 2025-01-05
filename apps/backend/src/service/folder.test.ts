import { describe, expect, test, mock } from 'bun:test';
import {  FolderService } from './folder';
import { Folder } from '../schema/folders';
import { folderRepository } from '../repository/folder';

const getRootFolderMock = mock<() => Promise<Folder[]>>(() => Promise.resolve([]));
const getAllFolderWithParentMock = mock<() => Promise<Folder[]>>(() => Promise.resolve([]));



mock.module('../repository/folder', () => ({
    folderRepository: {
      getRootFolder: getRootFolderMock,
      getAllFolderWithParent: getAllFolderWithParentMock
    }
  }));
  
  describe('FolderService', () => {
    let folderService: FolderService = new FolderService(folderRepository);
    
    describe('getUserFolders', () => {
      test('should return empty array when no folders exist', async () => {
        // The mocks will use their default empty array responses
        const result = await folderService.getUserFolders('user123');
        expect(result).toEqual([]);
      });
  
      test('should return an array of folder tree with populated children', async () => {
        const rootFolders: Folder[] = [
          { id: 'root1', name: 'Root 1', parentId: null, path: '', createdAt: new Date(), updatedAt: new Date(), createdBy: 'user123' },
          { id: 'root2', name: 'Root 2', parentId: null, path: '', createdAt: new Date(), updatedAt: new Date(), createdBy: 'user123' },
        ];
  
        const children: Folder[] = [
          { id: 'child1', name: 'Child 1', parentId: 'root1', path: '', createdAt: new Date(), updatedAt: new Date(), createdBy: 'user123' },
          { id: 'child2', name: 'Child 2', parentId: 'root2', path: '', createdAt: new Date(), updatedAt: new Date(), createdBy: 'user123' },
          { id: 'child1_3', name: 'Child 3', parentId: 'child1', path: '', createdAt: new Date(), updatedAt: new Date(), createdBy: 'user123' },
        ];
        
        getRootFolderMock.mockImplementation(() => Promise.resolve(rootFolders));
        getAllFolderWithParentMock.mockImplementation(() => Promise.resolve(children));
  
        const result = await folderService.getUserFolders('user123');
        
       for (const folder of result) {
        if(folder.id === 'root1') {
          expect(folder).toEqual({
            id: 'root1',
            name: 'Root 1',
            children: [
                { id: 'child1', name: 'Child 1', children: [
                    { id: 'child1_3', name: 'Child 3', children: [] },
                ] },
            ]
          });
        }

        if(folder.id === 'root2') {
          expect(folder).toEqual({
            id: 'root2',
            name: 'Root 2',
            children: [
                { id: 'child2', name: 'Child 2', children: [] },
            ]
          });
        }
       }
      });
    });
  });