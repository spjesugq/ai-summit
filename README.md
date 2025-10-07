# AI Summit Website

A professional practice website with AI-powered image generation capabilities.

## Features

- Clean, modern design with professional aesthetics
- Responsive layout that works on all devices
- AI-powered image generation using OpenAI DALL-E API
- Customizable sidebar with user input
- Dynamic logo and background generation
- Smooth animations and hover effects
- Accessible navigation and focus states

## Getting Started

### Option 1: Using Python HTTP Server (Recommended)
```bash
# Start the server
python3 -m http.server 8000

# Or use the provided script
./start-server.sh

# Or use npm scripts
npm run start
```

Then open your browser and go to: `http://localhost:8000`

### Option 2: Using npm scripts
```bash
npm run start
npm run serve
npm run dev
```

## Important: CORS Policy

**Do NOT open `index.html` directly in your browser** (file:// protocol). This will cause CORS errors because the website uses ES6 modules and imports.

**Always use a local web server** as shown above.

## AI Image Generation

The website includes AI-powered image generation functionality:

1. Click "Customize" in the navigation
2. Fill out the three input fields:
   - Target Audience
   - Tone and Style  
   - Core Values
3. Click "Generate Images"
4. The AI will generate custom images based on your input
5. Images are automatically applied to the logo and hero background

## Project Structure

```
ai-summit/
├── src/
│   └── services/
│       ├── imageGeneration.js      # OpenAI DALL-E API service
│       ├── websiteCustomization.js # Website integration
│       └── README.md
├── public/
│   └── images/                    # Generated images storage
├── index.html
├── styles.css
├── script.js
├── start-server.sh               # Server startup script
└── package.json
```

## API Configuration

The image generation service uses OpenAI's DALL-E 3 API. 

### API Key Setup

The service supports multiple ways to configure your OpenAI API key:

#### Option 1: Browser Configuration (Recommended)
1. Copy the example config file:
```bash
cp config.example.js config.js
```

2. Edit `config.js` and add your API key:
```javascript
window.OPENAI_API_KEY = 'sk-proj-your-actual-api-key-here';
```

#### Option 2: Environment Variable
Set the environment variable before starting the server:
```bash
export OPENAI_API_KEY=your_openai_api_key_here
```

#### Option 3: No Configuration (Mock Images)
If no API key is configured, the service will automatically use mock images instead of making API calls.

### Security Note

**Never commit your actual API key to version control.** The service is configured to use external configuration for security. The `config.js` file is already in `.gitignore`.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- ES6 modules support required
- Must be served over HTTP/HTTPS (not file://)