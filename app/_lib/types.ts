import { Tables } from "./supabase-types";

export type CabinProps = {
    id: number;
    description?: string | null;
    name: string | null;
    maxCapacity: number | null;
    regularPrice: number | null;
    discount: number | null;
    image: string | null;
  };

  export type SettingsProps = {
    breakfastPrice: number | null;
    created_at: string;
    id: number;
    maxBookingLength: number | null;
    maxGuestsPerBooking: number | null;
    minBookingLength: number | null;
};
export type BookedDatesProps = Date[];
export type UserProps={
  name?: string | null;
  email?: string | null;
  image?: string | null;
  guestId?: string | null;
};
export type GuestProps= {
  countryFlag: string | null;
  created_at: string;
  email: string | null;
  fullName: string | null;
  id: number;
  nationalID: string | null;
  nationality: string | null;
} | null
export type BookingWithCabin = Tables<"bookings"> & {
  cabins: { name: string; image: string };
};
export type CreateBookingData = {
  startDate: Date | null;
  endDate: Date | null;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
}