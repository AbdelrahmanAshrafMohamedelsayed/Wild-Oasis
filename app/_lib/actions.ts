"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { BookingWithCabin, CreateBookingData } from "./types";
import { redirect } from "next/navigation";
export async function createBooking(bookingData:CreateBookingData, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    startDate: bookingData.startDate?.toISOString(),
    endDate: bookingData.endDate?.toISOString(),
    guestId: Number(session.user.guestId),
    numGuests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") as string)?.slice(0, 1000) ?? "",
      extrasPrice: 0,
      totalPrice: bookingData.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateGuest(formData: FormData) {
  // in any server action we need to authenticate the user
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // get the national ID from the form data
  const nationalID = formData.get("nationalID") as string;
  // const [nationality, countryFlag] = formData.get("nationality").split("%");
const nationality_info = formData.get("nationality");
let nationality: string | undefined;
let countryFlag: string | undefined;

if (nationality_info && typeof nationality_info === 'string') {
  [nationality, countryFlag] = nationality_info.split("%");
}
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID as string))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData )
    .eq("id", session?.user?.guestId as string);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function deleteReservation(bookingId: number) {
    // in any server action we need to authenticate the user
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    // check if the user owns the reservation
    const bookingsOld = await getBookings(Number(session.user?.guestId));
    const bookings: BookingWithCabin[] =
    bookingsOld as unknown as BookingWithCabin[];
    const bookingsIds = bookings.map((booking) => booking.id);
    if (!bookingsIds.includes(bookingId))
      throw new Error("You do not own this reservation");
    // delete the reservation
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Reservation could not be deleted");

  revalidatePath("/account/reservations");
}
export async function updateReservation(bookingId: number, formData: FormData) {
  console.log({bookingId});
  // in any server action we need to authenticate the user
  const session = await auth();
  
  if (!session) throw new Error("You must be logged in");
  // check if the user owns the reservation
  const bookingsOld = await getBookings(Number(session.user?.guestId));
  const bookings: BookingWithCabin[] =
    bookingsOld as unknown as BookingWithCabin[];
  const bookingsIds = bookings.map((booking) => booking.id);
  console.log({bookingsIds});
  if (!bookingsIds.includes(+bookingId))
    throw new Error("You do not own this reservation");
  // get the data from the form
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations")?.slice(0,150) as string;
  // update the reservation
  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", bookingId);

  if (error) throw new Error("Reservation could not be updated");

  revalidatePath(`/account/reservations`);
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  // redirect to the reservations page
  redirect("/account/reservations");
}