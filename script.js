// Sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const customizeTrigger = document.getElementById('customize-trigger');
    const sidebar = document.getElementById('customize-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    const generateImagesBtn = document.getElementById('generate-images');
    // These elements don't exist in the HTML, so we'll handle them gracefully
    const generatedImagesContainer = document.getElementById('generated-images') || null;
    const imageGrid = document.getElementById('image-grid') || null;

    // Check if elements exist
    if (!customizeTrigger) {
        console.error('Customize trigger element not found!');
        return;
    }
    if (!sidebar) {
        console.error('Sidebar element not found!');
        return;
    }
    if (!sidebarOverlay) {
        console.error('Sidebar overlay element not found!');
        return;
    }

    // Open sidebar
    customizeTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Generate Images functionality
    if (generateImagesBtn) {
        generateImagesBtn.addEventListener('click', async function() {
        // Show loading state
        generateImagesBtn.textContent = 'Generating...';
        generateImagesBtn.disabled = true;

        try {
            // Get user input from the form
            const targetAudience = document.getElementById('target-audience').value || 'professional therapy clients';
            const toneStyle = document.getElementById('tone-style').value || 'warm and welcoming';
            const coreValues = document.getElementById('core-values').value || 'trust, compassion, and healing';
            
            // Concatenate the three inputs for the prompt
            const combinedPrompt = `${targetAudience}, ${toneStyle}, ${coreValues}`;
            
            // Import and use the actual OpenAI image generation service
            const { generateImage } = await import('./src/services/imageGeneration.js');
            
            // Generate image using the OpenAI API
            let generatedImageUrl;
            
            try {
                console.log('Starting image generation with prompt:', combinedPrompt);
                
                generateImagesBtn.textContent = 'Generating image...';
                console.log('Generating therapy practice image...');
                generatedImageUrl = await generateImage(`Professional therapy practice image, ${combinedPrompt}, warm and welcoming, professional photography style`, '1024x1024');
                console.log('Image generated successfully:', generatedImageUrl);
                
            } catch (apiError) {
                console.error('Error generating images with OpenAI API:', apiError);
                console.error('API Error details:', {
                    message: apiError.message,
                    stack: apiError.stack,
                    name: apiError.name
                });
                throw new Error(`Failed to generate images: ${apiError.message}`);
            }
            
            // Create image object
            const generatedImage = {
                id: 1,
                url: generatedImageUrl,
                title: 'Therapy Practice - Professional Setting'
            };

            // Apply image as hero background
            const hero = document.querySelector('.hero');
            if (hero && generatedImage) {
                console.log('Applying hero image:', generatedImage.url);
                // Preload the image to ensure it's available
                const heroImg = new Image();
                heroImg.onload = () => {
                    hero.style.backgroundImage = `url(${generatedImage.url})`;
                    hero.style.backgroundSize = 'cover';
                    hero.style.backgroundPosition = 'center';
                    hero.style.backgroundRepeat = 'no-repeat';
                    console.log('Hero image applied successfully:', generatedImage.url);
                };
                heroImg.onerror = (error) => {
                    console.error('Failed to load hero image:', generatedImage.url, error);
                };
                heroImg.src = generatedImage.url;
            } else {
                console.log('Hero element or generated image not found:', { hero, generatedImage });
            }

            // Store image for potential future use
            window.generatedImages = [generatedImage];
            
            // Show success message
            generateImagesBtn.textContent = 'Image Generated Successfully!';
            generateImagesBtn.style.backgroundColor = '#28a745';
            setTimeout(() => {
                generateImagesBtn.textContent = 'Generate Image';
                generateImagesBtn.style.backgroundColor = '#d4a574';
            }, 3000);

        } catch (error) {
            console.error('Error generating image:', error);
            generateImagesBtn.textContent = 'Generation Failed';
            generateImagesBtn.style.backgroundColor = '#dc3545';
            alert(`Failed to generate image: ${error.message}\n\nPlease check your OpenAI API key and try again.`);
            
            // Reset button after error
            setTimeout(() => {
                generateImagesBtn.textContent = 'Generate Image';
                generateImagesBtn.style.backgroundColor = '#d4a574';
            }, 3000);
        } finally {
            // Reset button state
            generateImagesBtn.disabled = false;
        }
        });
    }

    // Mock API function (for future use)
    async function mockGenerateImagesAPI(targetAudience, toneStyle, coreValues) {
        // This would be replaced with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    images: [
                        {
                            id: 1,
                            url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
                            title: 'Generated Image 1'
                        },
                        {
                            id: 2,
                            url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
                            title: 'Generated Image 2'
                        },
                        {
                            id: 3,
                            url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop',
                            title: 'Generated Image 3'
                        },
                        {
                            id: 4,
                            url: 'https://images.unsplash.com/photo-1576091160550-2173dba0ef28?w=400&h=300&fit=crop',
                            title: 'Generated Image 4'
                        }
                    ]
                });
            }, 2000);
        });
    }
});
