"use client";

import { Wallpaper } from "@/type/wallpaper";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Wallpapers() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchWallpapers(): Promise<Wallpaper[]> {
    try {
      const res = await axios.get("/api/get-wallpapers");
      const wallpapers = res.data.data;
      setWallpapers(wallpapers);
      return wallpapers;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWallpapers();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading wallpapers...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">
        Community creativities
      </h1>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {wallpapers?.map((wallpaper, index) => (
          <li
            key={`${wallpaper.img_id || index}-${wallpaper.img_url}`}
            className="relative"
          >
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img
                src={wallpaper.img_url}
                alt={wallpaper.img_description}
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">
                  View details for {wallpaper.img_description}
                </span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {wallpaper.img_description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
