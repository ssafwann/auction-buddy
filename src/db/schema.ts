import {
    pgTable, serial
} from "drizzle-orm/pg-core"

export const bids = pgTable('bb_bids',{
    id: serial("id").primaryKey(),
});

// bids is the actual variable we will use
// bb_bids is the table name in the postgres db
