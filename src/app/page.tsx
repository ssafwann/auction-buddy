import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const session = await auth()
  // react server components
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12">
      

      {session ?  <SignOut /> : <SignIn />}
      {session?.user?.name}

      <form
        action={async (formData: FormData) => {
          "use server";
          await database.insert(items).values({
            name: formData.get("name") as string,
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            userId: session?.user?.id!,
          });
          revalidatePath("/"); // basically reloads the data (like a "refresh" so you see live change)
        }}
      >
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
      </form>

      {allItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
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