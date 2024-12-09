"use client";
import { useContext } from "react";
import { CabinProps, UserProps } from "../_lib/types";
import ReservationContext from "../_context/ReservationContext";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { Button } from "./Button";
import { createBooking } from "../_lib/actions";

function ReservationForm({
  cabin,
  user,
}: {
  cabin: CabinProps;
  user: UserProps;
}) {
  // CHANGE
  const { range, resetRange } = useContext(ReservationContext);
  const firstName = user?.name?.split(" ")[0];
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate!, startDate!);
  const cabinPrice = numNights * (regularPrice ?? 0 - (discount ?? 0));

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01] ">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="rounded-full"
            src={user.image ?? ""}
            alt={user.name ?? "User profile picture"}
            width={32}
            height={32}
          />
          <p>{firstName}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
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
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <Button>Reserve now</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
