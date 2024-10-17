import { database } from "@/db/database";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-2xl font-bold">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <div key={item.id} className="border p-8 r ounded-xl">
            {item.name}
            starting price: ${item.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  );
}

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
