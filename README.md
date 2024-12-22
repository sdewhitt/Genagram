# Pentagram: Instagram, but with AI Images

### Features
- User-submitted prompts will generate a relevant image using Stability AI's sdxl-turbo model
- Users can view their creations in a library on the side of the screen

### In-Progress Features
- Logins
- Full Instagram-like feed scrolling and sharing

### Implementation Details
- All generated images are stored in a Vercel blob
- API endpoints connected via Modal
- Modal App health tested and upkept every 5 minutes. See keep_warm() in main.py for more
- 
