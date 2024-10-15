import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  // react server components
  const bids = await database.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(bidsSchema).values({});
          revalidatePath("/"); // basically reloads the data (Refresh so you see live change)
        }}
      >
        <Input name="bid" placeholder="Bid" />
        <Button type="submit">Place Bid</Button>
      </form>

      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}

// 21:40

/*

this is majority of what we will be doing...
fetching data, make a form, save some data...

import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";

export default async function HomePage() {
  // react server components
  const bids = await database.query.bids.findMany(); // instead of SQL statements, we use this nice functions

  return (
    <main className="">
      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(bidsSchema).values({});
        }}
      >
        <input name="bid" placeholder="Bid" />
        <button type="submit">Place Bid</button>
      </form>

      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
*/