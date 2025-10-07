// Sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const customizeTrigger = document.getElementById('customize-trigger');
    const sidebar = document.getElementById('customize-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    const generateImagesBtn = document.getElementById('generate-images');
    const generatedImagesContainer = document.getElementById('generated-images');
    const imageGrid = document.getElementById('image-grid');

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
    generateImagesBtn.addEventListener('click', function() {
        // Show loading state
        generateImagesBtn.textContent = 'Generating...';
        generateImagesBtn.disabled = true;

        // Mock API call with delay
        setTimeout(() => {
            // Mock API response with sample images
            const mockImages = [
                {
                    id: 1,
                    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
                    title: 'Therapy Session - Professional Setting'
                },
                {
                    id: 2,
                    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
                    title: 'Couple Connection - Golden Hour'
                },
                {
                    id: 3,
                    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop',
                    title: 'Hands Connection - Warm Light'
                },
                {
                    id: 4,
                    url: 'https://images.unsplash.com/photo-1576091160550-2173dba0ef28?w=400&h=300&fit=crop',
                    title: 'Interior Design - Warm Living Space'
                }
            ];

            // Apply first image as logo
            const logoIcon = document.querySelector('.logo-icon');
            if (logoIcon && mockImages[0]) {
                logoIcon.style.backgroundImage = `url(${mockImages[0].url})`;
                logoIcon.style.backgroundSize = 'cover';
                logoIcon.style.backgroundPosition = 'center';
                logoIcon.innerHTML = ''; // Remove the wave elements
            }

            // Apply second image as hero background
            const hero = document.querySelector('.hero');
            if (hero && mockImages[1]) {
                hero.style.backgroundImage = `url(${mockImages[1].url})`;
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
                hero.style.backgroundRepeat = 'no-repeat';
            }

            // Reset button
            generateImagesBtn.textContent = 'Generate Images';
            generateImagesBtn.disabled = false;

        }, 2000); // 2 second delay to simulate API call
    });

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
