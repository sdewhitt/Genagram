# Genagram: ChatGPT-like platform for AI Images
Inspired by the UI for ChatGPT where users can prompt the machine for text responses, Genagram aims to accomplish the same, but quickly generate quality images using Stability AI's sdxl-turbo model

Link: https://genagram.vercel.app/

The Modal app may be shut down to save money when you view the site, preventing image generation. Please email me at sethjtdewhitt@gmail.com and I'll start it up ASAP.

### Current Features
- User-submitted prompts will generate a relevant image using Stability AI's sdxl-turbo model
- Users can view their creations in a library on the side of the screen

### Implementation Details
- All generated images are stored in a Vercel blob
- API endpoints connected via Modal
- Next.js / Vercel deployment
- Typescript mainly used

### In-Progress Features
- Authentication and designated storage for users

### Future Goals
- Develop a subpage that functions like an Instagram feed, where users can browse other users' creations and interact with their posts
- Ensuring the hosted image generation model operates within low-latency thresholds (<2 seconds) while handling multiple concurrent requests
- Managing the dynamic scaling of GPU resources to handle demand spikes without exceeding cost or causing performance bottlenecks
- Add the ability to search for images semantically across user libraries
- Prevent harmful or inappropriate content from being generated
- Build a recommendation system that creates personalized feeds for users, balancing new content discovery with user preferences


