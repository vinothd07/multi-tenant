import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <Image
        width={512}
        height={512}
        src="/file.svg"
        alt="Platforms on Vercel"
        className="w-48"
      />
      <h1 className="text-white">Edit this page on app/home/page.tsx</h1>
    </div>
  );
}
