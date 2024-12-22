"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

//import BaseLoginWrapper from "./Login/BaseLoginWrapper"; import Login from "./Login"; import LoginForm from "./LoginForm";


export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //const [loginError, setLoginError] = useState<string | null>(null);
  //const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);


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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Email:", email);
      console.log("Password:", password);
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      toggleLoginVisibility();

      //onLoginSuccess(data.user);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const toggleLoginVisibility = () => {
    setIsLoginVisible(wasLoginVisible => !wasLoginVisible);
  }
/*
  const onLoginSuccess = (user: { id: number; name: string; email: string }) => {
    setUser(user);
    console.log("User:", user);
    setIsLoginVisible(false);

    // Load user images:


  }*/


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
          <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              style={{ top: -50, bottom: 0, left: 0, right: 0 }} 
              onClick={toggleLoginVisibility}>
            <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl text-gray-900 font-semibold mb-4">Login</h2>

              {/* LOGIN FORM */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m text-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m text-black"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login
                  </button>
                </div>
              </form>


            </div>
          </div>
        )}




      </div>
        {/* Prompt and Sumbit Boxes */}
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