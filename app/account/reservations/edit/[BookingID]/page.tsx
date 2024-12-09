import { Button } from "@/app/_components/Button";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({
  params,
}: {
  params: Promise<{ BookingID: number }>;
}) {
  // CHANGE
  const { BookingID } = await params;
  console.log(BookingID);
  //   const BookingID = 23;
  //   1) get the booking data
  const bookingData = await getBooking(BookingID);
  console.log({ bookingData });
  //   2) get the max capacity
  const { maxCapacity } = await getCabin(bookingData.cabinId as number);
  //   const maxCapacity = 23;
  const updateBookingWithID = updateReservation.bind(null, BookingID);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{BookingID}
      </h2>

      <form
        action={updateBookingWithID}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={bookingData.numGuests!}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity ?? 0 }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={bookingData.observations!}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button>Update reservation</Button>
        </div>
      </form>
    </div>
  );
}
// function Button() {
//   return (
//     <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
//       Update reservation
//     </button>
//   );
// }
