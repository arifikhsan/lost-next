import clsx from "clsx";

import Image from "./Image";
import { getSiteMetaData } from "utils/helpers";

export default function Bio({ className }) {
  const { author } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <Image
        className="flex-shrink-0 object-cover mb-0 mr-3 rounded-full -z-10 w-14 h-14"
        src={require("../content/assets/profile.jpg")}
        webpSrc={require("../content/assets/profile.jpg?webp")}
        previewSrc={require("../content/assets/profile.jpg?lqip")}
        alt="Profile"
      />
      <p className="text-base leading-7">
        Written by <b className="font-semibold">{author.name}</b>{" "}
        {author.summary}
      </p>
    </div>
  );
}
