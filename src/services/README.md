# Services Directory

This directory contains service modules that handle external API integrations and business logic for the AI Summit website.

## Services

### `imageGeneration.js`
- **Purpose**: Handles image generation using OpenAI's DALL-E API
- **Key Function**: `generateImage(prompt, size)`
- **Usage**: Generates images based on text prompts for website customization

### `websiteCustomization.js`
- **Purpose**: Integrates image generation with website customization functionality
- **Key Functions**:
  - `generateCustomizationImages(userInput)` - Generates images based on user preferences
  - `applyImagesToWebsite(images)` - Applies generated images to website elements
- **Usage**: Main service for the Customize sidebar functionality

## Integration

These services are designed to work together:
1. User fills out customization form (target audience, tone, values)
2. `websiteCustomization.js` processes the input and calls `imageGeneration.js`
3. Generated images are applied to the website (logo, hero background)
4. Remaining images are stored for potential future use

## API Configuration

The image generation service uses OpenAI's DALL-E 3 API with the following configuration:
- Model: `dall-e-3`
- Quality: `standard`
- Style: `natural`
- Default size: `1024x1024`

## Future Enhancements

- Add error handling for API failures
- Implement image caching
- Add support for different image styles and sizes
- Integrate with user preferences storage
