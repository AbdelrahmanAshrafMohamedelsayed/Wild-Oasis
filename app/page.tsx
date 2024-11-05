import Link from "next/link";


export default async function Home() {

  // const cabins = await getCabins();
  // console.log(cabins);
  return (
  <div>
    <h1>Hello, World!</h1>
    <Link href="/cabins">cabins</Link>
  </div>
  );
}
