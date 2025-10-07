/**
 * Image Generation Service
 * 
 * This service provides functionality to generate images using OpenAI's DALL-E API.
 * It can be used to create logos, hero images, and other visual content for the website.
 */

// Mock images for fallback when API limits are reached
const mockImages = [
  'public/images/therapy-session-1.jpg',
  'public/images/clinician-smiling-client.jpg',
  'public/images/therapy-session-2.jpg',
  'public/images/therapy-session-3.jpg'
];

// Specific mock image for billing limit error - clinician smiling to client in office
const billingLimitMockImage = 'public/images/clinician-smiling-client.jpg';

const getMockImage = () => {
  // Return a random mock image
  const randomIndex = Math.floor(Math.random() * mockImages.length);
  return mockImages[randomIndex];
};

const getApiKey = () => {
  // Check for window configuration (for browser usage)
  if (typeof window !== 'undefined' && window.OPENAI_API_KEY) {
    console.log(window.OPENAI_API_KEY);
    return window.OPENAI_API_KEY;
  }
  
  // Check for environment variable (Node.js environment)
  if (typeof process !== 'undefined' && process.env && process.env.OPENAI_API_KEY) {
    console.log(process.env.OPENAI_API_KEY);
    return process.env.OPENAI_API_KEY;
  }
  
  // Return a placeholder that will trigger mock image fallback
  return 'API_KEY_NOT_SET';
};

const generateImage = async (prompt, size = '1024x1024') => {
  try {
    // Check if API key is properly configured
    const apiKey = getApiKey();
    if (apiKey === 'API_KEY_NOT_SET') {
      console.log('API key not configured, returning mock image');
      return getMockImage();
    }
    
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getApiKey()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-image-1-mini',
        prompt: prompt,
        n: 1,
        size: size,
        quality: 'low',
        // style: 'natural'
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log('API Error Response:', data);
      console.log('Error message:', data.error?.message);
      console.log('Status code:', response.status);
      
      // Check for API key issues
      if (response.status === 401 || data.error?.message?.toLowerCase().includes('api key')) {
        console.log('API key issue detected, returning mock image');
        return getMockImage();
      }
      
      // Check for specific "Billing hard limit has been reached" error
      const errorMessage = data.error?.message?.toLowerCase() || '';
      if (response.status === 400 && errorMessage.includes('billing hard limit has been reached')) {
        console.log('Billing hard limit reached, returning specific mock image of clinician smiling to client');
        return billingLimitMockImage;
      }
      
      // Check for other billing limit errors - be more comprehensive
      if (response.status === 400 && (
        errorMessage.includes('billing') ||
        errorMessage.includes('hard limit') ||
        errorMessage.includes('limit reached') ||
        errorMessage.includes('quota') ||
        errorMessage.includes('exceeded') ||
        errorMessage.includes('limit')
      )) {
        console.log('Billing limit reached, returning specific mock image of clinician smiling to client');
        return billingLimitMockImage;
      }
      
      // Fallback: if it's a 400 error and we can't determine the exact cause, use mock image
      if (response.status === 400) {
        console.log('400 error detected, using mock image as fallback');
        return getMockImage();
      }
      
      throw new Error(`API Error ${response.status}: ${data.error?.message || 'Unknown error'}`);
    }
    
    // Validate response structure
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error('Invalid API response structure');
    }
    
    if (!data.data[0] || !data.data[0].url) {
      throw new Error('No image URL found in API response');
    }
    
    return data.data[0].url;
  } catch (error) {
    console.error('Error in generateImage:', error);
    
    // If it's a network error or API error, return mock image as fallback
    if (error.message.includes('Failed to fetch') || error.message.includes('API Error')) {
      console.log('API unavailable, returning mock image');
      return getMockImage();
    }
    
    throw new Error(`Failed to generate image: ${error.message}`);
  }
};

// Usage examples:
const logoUrl = await generateImage('Professional logo for Brew & Beans Cafe, modern minimalist design, vector style', '1024x1024');
const heroUrl = await generateImage('Hero banner image for Brew & Beans Cafe website, professional photography style, wide format', '1792x1024');
const profileUrl = await generateImage('Professional profile image for Brew & Beans Cafe, business headshot style', '1024x1024');

// Export the service
export { generateImage };
