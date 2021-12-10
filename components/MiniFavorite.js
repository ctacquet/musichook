import Image from "next/image";
import Link from "next/link";

function MiniFavorite({
  id,
  coverLink,
  artist,
  title,
}) {
  const oldNotificationStyle = "bg-white dark:bg-black dark:bg-opacity-25 my-7 border rounded-sm";
  const newNotificationStyle =
    "bg-white dark:bg-black dark:bg-opacity-25 my-7 border bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-1 py-1 rounded-lg shadow-md text-base font-medium";

  return (
    <Link href={`/posts/${id}`}>
      <button className="bg-white dark:bg-black dark:bg-opacity-25 rounded-sm border dark:border-gray-500 dark:border-opacity-50 cursor-pointer shadow-md w-full text-left" id={id}>
        {/* MiniFavorite */}
        <div className="flex items-center p-2">
          {/* Cover, Artist, Title and Album date */}
          <div className="flex flex-1 h-12">
            <div className="relative w-12 border mr-2">
              {coverLink && (
                <Image
                  src={coverLink}
                  className="object-cover z-0"
                  alt=""
                  quality={100}
                  priority="false"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              )}
            </div>
            <div className="flex flex-col">
              <p className="h-6 w-32 xl:w-40 2xl:w-64 font-bold truncate">
                {artist}
              </p>
              <p className="h-6 w-32 xl:w-40 2xl:w-64 font-normal truncate">
                {title}
              </p>
            </div>
          </div>
        </div>
      </button>
    </Link>
  );
}

export default MiniFavorite;
