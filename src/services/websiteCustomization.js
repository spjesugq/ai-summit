/**
 * Website Customization Service
 * 
 * This service handles the integration between the image generation API
 * and the website customization functionality.
 */

import { generateImage } from './imageGeneration.js';

/**
 * Generate images based on user input for website customization
 * @param {Object} userInput - The user's customization preferences
 * @param {string} userInput.targetAudience - Target audience description
 * @param {string} userInput.toneStyle - Tone and style description
 * @param {string} userInput.coreValues - Core values description
 * @returns {Promise<Array>} Array of generated image URLs
 */
export const generateCustomizationImages = async (userInput) => {
  try {
    const { targetAudience, toneStyle, coreValues } = userInput;
    
    // Create prompts based on user input
    const prompts = [
      `Professional therapy session logo, ${targetAudience}, ${toneStyle}, ${coreValues}, modern minimalist design, vector style`,
      `Hero banner for therapy practice website, ${targetAudience}, ${toneStyle}, ${coreValues}, professional photography style, warm and welcoming`,
      `Connection and support image, ${targetAudience}, ${toneStyle}, ${coreValues}, intimate and professional`,
      `Warm interior therapy space, ${targetAudience}, ${toneStyle}, ${coreValues}, cozy and professional environment`
    ];
    
    const sizes = ['1024x1024', '1792x1024', '1024x1024', '1024x1024'];
    
    // Generate all images
    const imagePromises = prompts.map((prompt, index) => 
      generateImage(prompt, sizes[index])
    );
    
    const imageUrls = await Promise.all(imagePromises);
    
    return imageUrls.map((url, index) => ({
      id: index + 1,
      url: url,
      title: [
        'Therapy Session - Professional Setting',
        'Couple Connection - Golden Hour', 
        'Hands Connection - Warm Light',
        'Interior Design - Warm Living Space'
      ][index]
    }));
    
  } catch (error) {
    console.error('Error generating customization images:', error);
    throw new Error('Failed to generate images. Please try again.');
  }
};

/**
 * Apply generated images to website elements
 * @param {Array} images - Array of generated image objects
 */
export const applyImagesToWebsite = (images) => {
  if (!images || images.length === 0) return;
  
  // Apply first image as logo
  const logoIcon = document.querySelector('.logo-icon');
  if (logoIcon && images[0]) {
    logoIcon.style.backgroundImage = `url(${images[0].url})`;
    logoIcon.style.backgroundSize = 'cover';
    logoIcon.style.backgroundPosition = 'center';
    logoIcon.innerHTML = ''; // Remove the wave elements
  }

  // Apply second image as hero background
  const hero = document.querySelector('.hero');
  if (hero && images[1]) {
    hero.style.backgroundImage = `url(${images[1].url})`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
    hero.style.backgroundRepeat = 'no-repeat';
  }
  
  // Store remaining images for potential future use
  if (images.length > 2) {
    window.generatedImages = images.slice(2);
  }
};
