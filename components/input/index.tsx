'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function Input() {
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user } = useUser();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!userPrompt || isLoading || !isSignedIn) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/generate-image", {
        userId: user.id,
        prompt: userPrompt,
      });
      console.log(response.data.url);
      window.open(response.data.url, "_blank");

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isLoading) {
      handleSubmit(event);
    }
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="w-11/12 md:w-3/4 md:max-w-7xl flex flex-col items-center space-y-6 md:flex-row md:space-x-6">
      <label htmlFor="prompt" className="sr-only">
        Prompt
      </label>
      <input
        id="prompt"
        name="prompt"
        type="text"
        placeholder="Input your prompt for a new wallpaper"
        className={`w-full rounded-md border-solid border border-primary/40 bg-background py-1.5 text-foreground shadow-md placeholder:text-muted-foreground focus:outline-none focus:border-primary sm:text-sm sm:leading-6 pl-4 ${
          isLoading ? "bg-gray-100 text-gray-400" : ""
        }`}
        onChange={(event) => setUserPrompt(event.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <button
        type="button"
        className={`w-24 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          !userPrompt || isLoading
            ? "bg-primary/80 cursor-not-allowed"
            : "bg-primary hover:bg-primary/80 active:bg-primary/60"
        }`}
        onClick={handleSubmit}
        disabled={!userPrompt || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Image
              src="/loading.svg"
              alt="Loading"
              width={24}
              height={24}
              className="animate-spin"
            />
          </div>
        ) : (
          "Generate"
        )}
      </button>
    </div>
  );
}
