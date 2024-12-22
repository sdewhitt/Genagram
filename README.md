# Genagram: Social Media for AI Images

### Features
- User-submitted prompts will generate a relevant image using Stability AI's sdxl-turbo model
- Users can view their creations in a library on the side of the screen

### In-Progress Features
- Logins
- Full Instagram-like feed scrolling and sharing
- Ensuring the hosted image generation model operates within low-latency thresholds (<2 seconds) while handling multiple concurrent requests
- Managing the dynamic scaling of GPU resources to handle demand spikes without exceeding cost or causing performance bottlenecks.
- Add the ability to search for images semantically
- Prevent harmful or inappropriate content from being generated
- Build a recommendation system that creates personalized feeds for users, balancing new content discovery with user preferences

### Implementation Details
- All generated images are stored in a Vercel blob
- API endpoints connected via Modal
- Modal App health tested and upkept every 5 minutes. For more details, see main.py in https://github.com/sdewhitt/Pentagram-Modal-Deployment
- Next.js / Vercel deployment
- Typescript mainly used
