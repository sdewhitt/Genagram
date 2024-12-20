"use server";

//import { useState } from "react";

import ImageGenerator from "./components/ImageGenerator";
import { generateImage } from "./actions/generateImage";

export default async function Home() {
  return <ImageGenerator generateImage={generateImage}/>;
}
