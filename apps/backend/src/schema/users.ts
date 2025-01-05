import { relations } from "drizzle-orm";
import {  pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { folders } from "./folders";

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  username: text('username').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  folders: many(folders),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;