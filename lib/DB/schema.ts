import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgEnum("role", ["AI", "user"]); // AI or USER

// table for all chats (different conversations)
export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdfName").notNull(),
  pdfURL: text("pdfURL").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  userID: varchar("userID", { length: 255 }).notNull(),
  fileKey: text("fileKey").notNull(),
});

// messages in each chat
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatID: integer("chatID")
    .references(() => chats.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  role: users("role").notNull(),
});
