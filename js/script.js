// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

// Auto change slides every 5 seconds
setInterval(function() {
    plusSlides(1);
}, 5000);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Mobile menu toggle
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.product-col, .category-col, .feature-col');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize elements with opacity 0 for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.product-col, .category-col, .feature-col');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger scroll event to check initial viewport
    window.dispatchEvent(new Event('scroll'));
});

// Flash message function
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('alert', `alert-${type}`);
    messageDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, 5000);
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    // In a real application, this would add the item to the cart via AJAX
    console.log(`Adding product ${productId} to cart, quantity: ${quantity}`);
    showMessage('Product added to cart successfully!');
    
    // Update cart count indicator
    updateCartCount();
}

// Update cart count indicator
function updateCartCount() {
    // In a real application, this would get the current cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent || '0');
        cartCount.textContent = currentCount + 1;
    }
}

// Add to wishlist function
function addToWishlist(productId) {
    // In a real application, this would add the item to the wishlist via AJAX
    console.log(`Adding product ${productId} to wishlist`);
    showMessage('Product added to wishlist!');
}

// Form validation function
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            highlightField(field, true);
        } else {
            highlightField(field, false);
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                highlightField(field, true);
                showMessage('Please enter a valid email address', 'error');
            }
        }
    });
    
    if (!isValid) {
        showMessage('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

// Helper to highlight form fields
function highlightField(field, isError) {
    if (isError) {
        field.style.borderColor = 'var(--error-color)';
    } else {
        field.style.borderColor = 'var(--light-gray)';
    }
}

// Quantity input handler
function handleQuantityChange(inputElement, minValue = 1, maxValue = 99) {
    let value = parseInt(inputElement.value);
    
    if (isNaN(value)) {
        value = minValue;
    }
    
    value = Math.max(minValue, Math.min(value, maxValue));
    inputElement.value = value;
    
    return value;
}

// Adjust quantity
function adjustQuantity(inputId, amount) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    let currentValue = parseInt(input.value) || 1;
    currentValue += amount;
    
    // Ensure value is between 1 and 99
    currentValue = Math.max(1, Math.min(currentValue, 99));
    
    input.value = currentValue;
}

// Image gallery (for product page)
function changeImage(mainImgId, thumbnailSrc) {
    const mainImg = document.getElementById(mainImgId);
    if (mainImg) {
        mainImg.src = thumbnailSrc;
    }
}

// Load more products (for category/search pages)
function loadMoreProducts() {
    // This would be implemented with AJAX in a real application
    // For now, it just shows a message
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            showMessage('No more products to load');
            loadMoreBtn.textContent = 'Load More';
            loadMoreBtn.disabled = true;
        }, 1500);
    }
}

// Calculate rating stars
function calculateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let html = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }
    
    return html;
} 