-- Custom SQL migration file, put your code below! --
INSERT INTO "users" ("name", "email", "password") VALUES ('User 1', 'user1@example.com', 'password');
INSERT INTO "users" ("name", "email", "password") VALUES ('User 2', 'user2@example.com', 'password');
INSERT INTO "users" ("name", "email", "password") VALUES ('User 3', 'user3@example.com', 'password');


-- User 1
INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA', 'folderA', NULL, (SELECT id FROM "users" WHERE "email" = 'user1@example.com')),
('FolderB', 'folderB', NULL, (SELECT id FROM "users" WHERE "email" = 'user1@example.com')),
('FolderC', 'folderC', NULL, (SELECT id FROM "users" WHERE "email" = 'user1@example.com'));

INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA_A', 'folderA/folderA_A', (SELECT id FROM "folders" WHERE "name" = 'FolderA'), (SELECT id FROM "users" WHERE "email" = 'user1@example.com')),
('FolderA_B', 'folderA/folderA_B', (SELECT id FROM "folders" WHERE "name" = 'FolderA'), (SELECT id FROM "users" WHERE "email" = 'user1@example.com')),
('FolderA_C', 'folderA/folderA_C', (SELECT id FROM "folders" WHERE "name" = 'FolderA'), (SELECT id FROM "users" WHERE "email" = 'user1@example.com'));

INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA_A_A', 'folderA/folderA_A/folderA_A_A', (SELECT id FROM "folders" WHERE "name" = 'FolderA_A'), (SELECT id FROM "users" WHERE "email" = 'user1@example.com')),
('FolderA_A_B', 'folderA/folderA_A/folderA_A_B', (SELECT id FROM "folders" WHERE "name" = 'FolderA_A'), (SELECT id FROM "users" WHERE "email" = 'user1@example.com')),
('FolderA_A_C', 'folderA/folderA_A/folderA_A_C', (SELECT id FROM "folders" WHERE "name" = 'FolderA_A'), (SELECT id FROM "users" WHERE "email" = 'user1@example.com'));

-- User 2
INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA', 'folderA', NULL, (SELECT id FROM "users" WHERE "email" = 'user2@example.com')),
('FolderB', 'folderB', NULL, (SELECT id FROM "users" WHERE "email" = 'user2@example.com')),
('FolderC', 'folderC', NULL, (SELECT id FROM "users" WHERE "email" = 'user2@example.com'));

INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA_A', 'folderA/folderA_A', (SELECT id FROM "folders" WHERE "name" = 'FolderA' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user2@example.com')), (SELECT id FROM "users" WHERE "email" = 'user2@example.com')),
('FolderA_B', 'folderA/folderA_B', (SELECT id FROM "folders" WHERE "name" = 'FolderA' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user2@example.com')), (SELECT id FROM "users" WHERE "email" = 'user2@example.com')),
('FolderA_C', 'folderA/folderA_C', (SELECT id FROM "folders" WHERE "name" = 'FolderA' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user2@example.com')), (SELECT id FROM "users" WHERE "email" = 'user2@example.com'));

INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA_B_A', 'folderA/folderA_B/folderA_B_A', (SELECT id FROM "folders" WHERE "name" = 'FolderA_B' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user2@example.com')), (SELECT id FROM "users" WHERE "email" = 'user2@example.com')),
('FolderA_B_B', 'folderA/folderA_B/folderA_B_B', (SELECT id FROM "folders" WHERE "name" = 'FolderA_B' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user2@example.com')), (SELECT id FROM "users" WHERE "email" = 'user2@example.com')),
('FolderA_B_C', 'folderA/folderA_B/folderA_B_C', (SELECT id FROM "folders" WHERE "name" = 'FolderA_B' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user2@example.com')), (SELECT id FROM "users" WHERE "email" = 'user2@example.com'));

-- User 3
INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA', 'folderA', NULL, (SELECT id FROM "users" WHERE "email" = 'user3@example.com')),
('FolderB', 'folderB', NULL, (SELECT id FROM "users" WHERE "email" = 'user3@example.com')),
('FolderC', 'folderC', NULL, (SELECT id FROM "users" WHERE "email" = 'user3@example.com'));

INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA_A', 'folderA/folderA_A', (SELECT id FROM "folders" WHERE "name" = 'FolderA' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user3@example.com')), (SELECT id FROM "users" WHERE "email" = 'user3@example.com')),
('FolderA_B', 'folderA/folderA_B', (SELECT id FROM "folders" WHERE "name" = 'FolderA' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user3@example.com')), (SELECT id FROM "users" WHERE "email" = 'user3@example.com')),
('FolderA_C', 'folderA/folderA_C', (SELECT id FROM "folders" WHERE "name" = 'FolderA' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user3@example.com')), (SELECT id FROM "users" WHERE "email" = 'user3@example.com'));


INSERT INTO "folders" ("name", "path", "parent_id", "created_by") VALUES 
('FolderA_C_A', 'folderA/folderA_C/folderA_C_A', (SELECT id FROM "folders" WHERE "name" = 'FolderA_C' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user3@example.com')), (SELECT id FROM "users" WHERE "email" = 'user3@example.com')),
('FolderA_C_B', 'folderA/folderA_C/folderA_C_B', (SELECT id FROM "folders" WHERE "name" = 'FolderA_C' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user3@example.com')), (SELECT id FROM "users" WHERE "email" = 'user3@example.com')),
('FolderA_C_C', 'folderA/folderA_C/folderA_C_C', (SELECT id FROM "folders" WHERE "name" = 'FolderA_C' AND "created_by" = (SELECT id FROM "users" WHERE "email" = 'user3@example.com')), (SELECT id FROM "users" WHERE "email" = 'user3@example.com'));
