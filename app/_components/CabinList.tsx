import React from "react";
import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { filterCabins } from "../_utils/helpers";
// import { unstable_noStore } from "next/cache";
type CabinListProps = {
  filter: string | string[] | undefined;
};

const CabinList = async ({ filter }: CabinListProps) => {
  // unstable_noStore(); // this will not cache the component so it will make the whole of it's route dynamic and will not cache it
  const cabins = await getCabins(); // the data here will not be null as we are fetching it from the database and wait in this line of await andnot go down until the data is fetched
  console.log({ cabins });
  if (!filter) {
    filter = "all";
  }
  const filteredCabins = filterCabins(filter as string, cabins);
  return (
    <>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {filteredCabins?.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default CabinList;
