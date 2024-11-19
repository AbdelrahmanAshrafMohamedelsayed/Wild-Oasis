import React from "react";
import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";

const CabinList = async () => {
  // CHANGE
  const cabins = await getCabins(); // the data here will not be null as we are fetching it from the database and wait in this line of await andnot go down until the data is fetched
  console.log({ cabins });
  return (
    <>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default CabinList;
