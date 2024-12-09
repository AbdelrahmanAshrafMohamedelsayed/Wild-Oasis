import ReservationList from "@/app/_components/ReservationList/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { Tables } from "@/app/_lib/supabase-types";
import { Metadata } from "next";
import Link from "next/link";

// Define the type for bookings to include the required 'cabin' property and other fields
type BookingWithCabin = Tables<"bookings"> & {
  cabins: { name: string; image: string };
};
export const metadata: Metadata = {
  title: "Account - Personal reservations",
  description: "Account - Personal reservations",
};
export default async function Page() {
  // CHANGE
  // TODO: Add type for bookings
  // const bookings: Tables<"bookings">[] = [];
  const session = await auth();
  const userId = session?.user?.guestId;
  // console.log({ userId });
  const bookingsResult = await getBookings(+userId!);
  const bookings: BookingWithCabin[] =
    bookingsResult as unknown as BookingWithCabin[];
  // console.log({ bookings });
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
