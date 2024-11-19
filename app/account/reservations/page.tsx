import ReservationCard from "@/app/_components/ReservationCard";
import { Tables } from "@/app/_lib/supabase-types";
import Link from "next/link";

export default function Page() {
  // CHANGE
  // TODO: Add type for bookings
  const bookings: Tables<"bookings">[] = [];

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
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard
              booking={{
                ...booking,
                cabin: {
                  created_at: "",
                  description: null,
                  discount: null,
                  id: 0,
                  image: null,
                  maxCapacity: null,
                  name: null,
                  regularPrice: null,
                },
              }}
              key={booking.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
