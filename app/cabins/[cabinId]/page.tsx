import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import { getCabin, getCabins } from "@/app/_lib/data-service";

// generate dynamic meta data
export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: number }>;
}) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  if (!cabin) return null;

  return {
    title: `Cabin ${cabin.name}`,
    description: cabin.description,
  };
}
// generate static paths
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) })); // it should be in this format {cabinId: String(cabin.id)}
  // params.id is a string, so we need to convert it to a number
  // console.log(ids);
  return ids;
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: number }>;
}) {
  // TODO: See what here
  const { cabinId } = await params; //i don't know why we are using await here
  ///////////////////////////////
  const cabin = await getCabin(cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabinId);

  // the problem of the above 3 fetches is that everyone will block the next one, so we can use Promise.all to fetch them in parallel

  // const [cabin, settings, bookedDates] = await Promise.all([
  //     getCabin(cabinId),
  //     getSettings(),
  //     getBookedDatesByCabinId(cabinId),
  // ]);
  // but the new problem is that if one is so slow, it will block the others, so we can split them into two parts
  ///////////////////////////////////////////////////////////
  if (!cabin) return null;
  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
          <Reservation cabin={cabin} />
        </div>
      </div>
    </div>
  );
}
