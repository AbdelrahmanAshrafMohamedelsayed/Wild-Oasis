"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); // this will get the search params from the url
  const router = useRouter(); // this will get the router the real url in the browser
  const pathname = usePathname(); // this will get the pathname of the url  as a string

  const activeFilter = searchParams.get("capacity") ?? "all"; // this will get the capacity from the search params and if it is not there it will return all this used for styling

  function handleFilter(filter: string) {
    // this function will handle the filter and change the url
    const params = new URLSearchParams(searchParams); // this will get the search params from the url
    params.set("capacity", filter); // this will set the capacity in the search params , this will change the url but not apply it
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // this will change the real url in the browser and apply it
    // scroll: false will not scroll the page to the top and will keep the page where it is
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}
type ButtonProps = {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: React.ReactNode;
};
function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
