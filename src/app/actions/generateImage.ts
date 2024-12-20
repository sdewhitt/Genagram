"use server";

export async function generateImage(text: string) {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
                        ? `https://${process.env.VERCEL_URL}/api/generate-image`
                        : `http://localhost:3000/api/generate-image`;
        console.log(`API URL:`, apiUrl); // Log the API URL to verify

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"X-API-Secret": process.env.API_SECRET || "",
            },
            body: JSON.stringify({ text }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error:", error);
        return {success: false, error: error instanceof Error ? error.message : "Failed to generate image"};
    }
}