"use client";

import { useState } from "react";
import Head from "next/head";



export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      //console.log(data);
      //setInputText("");
      
      if (!data.success) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (data.imageUrl) {
        const img = new Image();
        img.onload = () => {
          setImageUrl(data.imageUrl);
        };
        img.src = data.imageUrl;

      }

      // Navigate to the manage creations page
      window.location.href = '/manage-creations';

    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };


  const handleManageCreations = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/manage-creations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (data.imageUrl) {
        const img = new Image();
        img.onload = () => {
          setImageUrl(data.imageUrl);
        };
        img.src = data.imageUrl;

      }
    }
    catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-gray-900 text-white p-4">
        
        <button 
          // Sidebar
          onClick={handleManageCreations}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-700 rounded">
          Manage Creations
        </button>

      </div>
      <div className="flex-1 flex flex-col justify-between p-8">
        <Head>
          <title>Pentagram</title>
        </Head>

        <h1 className="text-xl font-semibold text-white">Pentagram</h1>

        <main className="flex-1">
          {imageUrl && (
            <div className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-lg mx-auto">
              <img
                src={imageUrl}
                alt="Generated Image"
                className="w-full h-auto"
              />
            </div>
          )}
        </main>

        <footer className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="Describe the image you want to generate..."
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50"
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
}
