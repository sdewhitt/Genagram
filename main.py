import modal
import io
from fastapi import Response, HTTPException, Query, Request
from datetime import datetime, timezone
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def download_model():
    from diffusers import AutoPipelineForText2Image
    import torch

    AutoPipelineForText2Image.from_pretrained(
        "stabilityai/sdxl-turbo",
        torch_dtype=torch.float16,
        variant="fp16"
    )

image = (modal.Image.debian_slim()
         .pip_install("fastapi[standard]", "transformers", "accelerate", "diffusers", "requests")
         .run_function(download_model)
         )

app = modal.App("Pentagram", image=image)


@app.cls(
    image=image,
    gpu="A10G",
    container_idle_timeout= 5 * 60,
    secrets=[modal.Secret.from_name("API_KEY")]
)

class Model:
    
    @modal.build()
    @modal.enter()
    def load_weights(self):
        from diffusers import AutoPipelineForText2Image
        import torch

        self.pipe = AutoPipelineForText2Image.from_pretrained( #
                        "stabilityai/sdxl-turbo", #type of model
                        torch_dtype=torch.float16,
                        variant="fp16"
                    )
        self.pipe.to("cuda")
        self.API_KEY = os.environ["API_KEY"]


    @modal.web_endpoint()
    def generate(self, request: Request, prompt: str = Query(..., description="Raccoon playing drums")):

        api_key = request.headers.get("X-API-Key")
        if api_key != self.API_KEY:
            raise HTTPException(status_code=401, detail="Unauthorized")


        image = self.pipe(prompt, num_inference_steps = 4, guidance_scale = 0.0).images[0]
        buffer = io.BytesIO()
        image.save(buffer, format="JPEG")

        return Response(content=buffer.getvalue(), media_type="image/jpeg")
    


@app.function(
    schedule = modal.Cron("*/5 * * * *"),
    secrets=[modal.Secret.from_name("API_KEY")]
)
def keep_warm():
    health_url = "https://megabyte9000--pentagram-model-health.modal.run/"
    generate_url = "https://megabyte9000--pentagram-model-generate.modal.run/"

    # First check health endpoint (no API key needed)
    #health_response = requests.get(health_url)
    #print(f'Health check at: {health_response.json()['timestamp']}')
    health_response = requests.get(health_url)
    if health_response.status_code == 200:
        try:
            health_data = health_response.json()
            print(f'Health check at: {health_data["timestamp"]}')
        except requests.exceptions.JSONDecodeError:
            print("Health check response is not valid JSON")
    else:
        print(f"Health check failed with status code: {health_response.status_code}")


    # Make test request to generate endpoint with API Key
    headers = {"X-API-Key": os.environ["API_KEY"]}
    generate_response = requests.get(generate_url, headers= headers)
    print(f'Generate endpoint tested successfully at: {datetime.now(timezone.utc).isoformat()}')