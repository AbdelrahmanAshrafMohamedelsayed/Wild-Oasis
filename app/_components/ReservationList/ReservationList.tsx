"use client";
import React, { useOptimistic } from "react";
import ReservationCard from "../ReservationCard";
import { BookingWithCabin } from "@/app/_lib/types";
import { deleteReservation } from "@/app/_lib/actions";

const ReservationList = ({ bookings }: { bookings: BookingWithCabin[] }) => {
  const [optimisticBookings, addOptimisticBooking] = useOptimistic(
    bookings,
    (currBooking: BookingWithCabin[], bookingId: number) => {
      return currBooking.filter((booking) => booking.id !== bookingId); // Remove the booking with the given ID and return the new array
    }
  );
  /**
   * currBooking is an array of bookings of the current before the delete operation
   * addOptimisticBooking is a function that takes the current booking and the bookingId to be deleted it is the func that triggers the delete operation
   *
   */
  const delReservation = async (bookingId: number) => {
    // Optimistically update the UI
    addOptimisticBooking(bookingId); // trigger the delete operation
    // Perform the actual delete
    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={delReservation}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
