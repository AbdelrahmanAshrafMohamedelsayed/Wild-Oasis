import { Metadata } from "next";
import React, { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
// to make the page dynamic and don't cache it
// export const revalidate = 0; //
// to enable the ISR for the page
export const revalidate = 3600; // 1 hour refetch the route after 1 hour

export const metadata: Metadata = {
  title: "Cabins",
  description: "Find your perfect cabin",
};
// type of the searchParams
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { capacity } = await searchParams;
  console.log(capacity);
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-5">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={capacity as string}>
        <CabinList filter={capacity} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
