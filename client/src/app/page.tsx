import Link from "next/link";

const getHostpitals = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL!}/hospitals`).then(
      (res) => res.json()
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const hospitals = await getHostpitals();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Hostipals</h1>
      <div className="p-3 rounded-lg border border-stone-200 flex flex-col gap-6 max-w-md">
        {hospitals?.map((hospital: any, i: number) => (
          <Link
            href={`/${hospital.id}`}
            key={i}
            className="flex flex-col gap-2  cursor-pointer hover:bg-stone-200"
          >
            <h2 className="text-xl font-bold">{hospital.name}</h2>
            <p className="text-sm">{hospital.address}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
