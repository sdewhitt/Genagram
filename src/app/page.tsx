"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import BaseLoginWrapper from "./BaseLoginWrapper";


//import BaseLoginWrapper from "./Login/BaseLoginWrapper";


export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
/*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
*/

  const imgError = "Failed to generate image";

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
        throw new Error(data.error || imgError);
      }

      if (data.imageUrl) {
        const img = new Image();
        img.onload = () => {
          setImageUrl(data.imageUrl);
          setImages((prevImages) => [...prevImages, { url: data.imageUrl }]);
        };
        img.src = data.imageUrl;

      }


    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : imgError);
    } finally {
      setIsLoading(false);
    }
  };


  // =============== LOGIN  ================= 
/*
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const response = await fetch("/api", {
        method: "handler",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      setUser(data.user);
      setIsLoginVisible(false); // Close login form on success
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "An error occurred");
    }
  };
*/

  const toggleLoginVisibility = () => {
    setIsLoginVisible(wasLoginVisible => !wasLoginVisible);
  }


  return (
    <div className="min-h-screen flex bg-indigo-950">
      <Sidebar images={images} onImageClick={(url) => setImageUrl(url)} />

      
      
      <div className="flex-1 flex flex-col justify-between p-8">
        <h1 className="text-xl font-semibold text-white text-center"> 
          Genagram
        </h1>

        <main className="flex-1 mt-7">
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

        <div className="fixed top-3 right-10 space-y-4 bg-indigo-900  p-3 rounded-xl">
        <button onClick = {toggleLoginVisibility}>Login</button>
        {isLoginVisible && (
          <BaseLoginWrapper isLoginVisible={isLoginVisible} onBackdropClick={toggleLoginVisibility}></BaseLoginWrapper>
        )}
      </div>

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