import { relations } from "drizzle-orm";
import {  pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const folders = pgTable('folders', {
  name: text('name').notNull(),
  id: uuid('id').primaryKey().defaultRandom(),
  path: text('path').notNull(),
  parentId: uuid('parent_id'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const foldersRelations = relations(folders, ({ one }) => ({
  parent: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
  }),
  createdBy: one(users, {
    fields: [folders.createdBy],
    references: [users.id],
  }),
}));

export type CreateFolder = typeof folders.$inferInsert;
export type Folder = typeof folders.$inferSelect;