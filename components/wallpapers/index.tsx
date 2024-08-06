import axios from 'axios';
import { useState, useEffect } from "react";

async function getWallpapers() {
  try {
    const res = await axios.get("http://127.0.0.1:3000/api/get-wallpapers");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Wallpapers() {
  const wallpapers = await getWallpapers();

  return (
    <div>
      <h1>Wallpapers</h1>
      <div>
        {
          wallpapers?.data.map((wallpaper: any, index: number) => (
            <img key={index} src={wallpaper.img_url} alt="wallpaper" />
          ))
        }
      </div>
    </div>
  );
}