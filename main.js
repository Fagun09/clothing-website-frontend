// --- Navigation toggle for mobile (keep if you have a mobile nav) ---
const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// --- Login redirection (keep if you have a login form) ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Dummy login validation
    if (username && password) {
      alert('Login successful!');
      window.location.href = 'index.html'; // Redirect to homepage
    } else {
      alert('Please enter both username and password.');
    }
  });
}

// --- Image Carousel Logic (for hero carousel) ---
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

// Manual controls
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  });
}

// Auto-slide every 3 seconds
if (slides.length > 0) {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }, 3000);

  // Show first slide on load
  showSlide(currentIndex);
}

// --- Customer Reviews Carousel: Show 3 at a time, slide automatically ---
document.addEventListener('DOMContentLoaded', function () {
  const reviewsList = document.querySelector('.reviews-list');
  let reviews = Array.from(document.querySelectorAll('.reviews-list .review-card'));
  const reviewsToShow = 3;
  let current = 0;
  let interval;

  function showReviews(idx) {
    const cardWidth = reviews[0].offsetWidth + 24; // 24px gap from .reviews-list
    reviewsList.style.transform = `translateX(-${idx * cardWidth}px)`;
  }

  function nextReview() {
    current = (current + 1) % reviews.length;
    if (current > reviews.length - reviewsToShow) {
      current = 0;
    }
    showReviews(current);
  }

  function startCarousel() {
    interval = setInterval(nextReview, 3500);
  }

  // Initial position
  if (reviews.length > 0) {
    showReviews(current);
    startCarousel();

    // Optional: Pause on hover
    reviewsList.addEventListener('mouseenter', () => clearInterval(interval));
    reviewsList.addEventListener('mouseleave', startCarousel);
  }

  // --- Fix for Review Us form submission ---
  const reviewForm = document.querySelector('.review-form');
  if (reviewForm && reviewsList) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = this.querySelector('input[name="name"]').value.trim();
      const text = this.querySelector('textarea[name="review"]').value.trim();

      if (name && text) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
          <p class="review-text">"${text}"</p>
          <div class="review-author">— ${name}</div>
        `;
        reviewsList.appendChild(card);

        // Update reviews NodeList and reset carousel to show the new review
        reviews = Array.from(document.querySelectorAll('.reviews-list .review-card'));
        current = Math.max(0, reviews.length - reviewsToShow);
        showReviews(current);

        this.reset();
        alert('Review successfully submitted');
      }
    });
  }
});
