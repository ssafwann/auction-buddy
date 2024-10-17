import {
    integer,
    pgTable, primaryKey, serial,
    text,
    timestamp
} from "drizzle-orm/pg-core"
import { AdapterAccountType } from "next-auth/adapters"

// running npm run db:push (basically pushes your changes)

export const users = pgTable("bb_user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
  })
   
  export const accounts = pgTable(
    "bb_account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )
   
  export const sessions = pgTable("bb_session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  })
   
  export const verificationTokens = pgTable(
    "bb_verificationToken",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    })
  )
   

 // bids is the actual variable we will use
// bb_bids is the table name in the postgres db
export const bids = pgTable('bb_bids',{
    id: serial("id").primaryKey(),
});

// make sure to give a defautl value to your new columns otherwise what drizzle does is that it tries to remove every single row of data..
// aka you might lose 1000s of records
export const items = pgTable('bb_item',{
  id: serial("id").primaryKey(),
  userId: text("userId")
  .notNull()
  .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  startingPrice: integer("startingPrice").notNull().default(0),
});

