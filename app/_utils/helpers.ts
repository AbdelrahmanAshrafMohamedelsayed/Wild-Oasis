import { parseISO, differenceInDays } from 'date-fns';
// ... existing code ...
// We want to make this function work for both Date objects and strings (which come from Supabase)
type Cabin = {
  id: number;
  name: string | null;
  maxCapacity: number | null;
  regularPrice: number | null;
  discount: number | null;
  image: string | null;
}
export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));
export function filterCabins(filter: string, cabins: Cabin[]) {
  if (filter === "all") {
    return cabins;
  };
  if (filter === "small") {
    return cabins.filter((cabin) => {
      if (cabin.maxCapacity) {
        return cabin.maxCapacity <= 3;
      }
     });
  };
  if (filter === "medium") {
    return cabins.filter((cabin) => {
      if (cabin.maxCapacity) {
        return cabin.maxCapacity > 3 && cabin.maxCapacity < 8;
      }
    });
  };
  if (filter === "large") {
    return cabins.filter((cabin) => {
      if (cabin.maxCapacity) {
        return cabin.maxCapacity >= 8;
      }
    });
  };
  return cabins;
}

