export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-stone-500 md:text-base dark:text-stone-400">
            Date of slug
          </p>
          <h1 className="mb-10 font-title text-3xl font-bold text-stone-800 md:text-6xl dark:text-white">
            Slug Title
          </h1>
        </div>
      </div>
    </>
  );
}
