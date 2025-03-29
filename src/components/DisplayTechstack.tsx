import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";
import React from "react";

async function DisplayTechstack({ techStack }: TechIconProps) {
  const techLogos = await getTechLogos(techStack);
  return (
    <div className="flex flex-row">
      {techLogos.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md">
            {tech}
          </span>
          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
}

export default DisplayTechstack;
