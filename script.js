/* Theme Toggle Logic*/
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check User Preference on Load
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️'; // Set icon to light mode
}

// Toggle Theme on Button Click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️'; // Switch to light mode icon
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙'; // Switch to dark mode icon
    localStorage.setItem('theme', 'light');
  }
});
// Function to Load and Render Poses
async function loadPoses() {
  try {
    const response = await fetch('images.json');
    const poses = await response.json();
    renderGallery(poses);

    // Add filter functionality
    const searchInput = document.querySelector('#search-input');
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredPoses = poses.filter(pose =>
        pose.filter.toLowerCase().includes(searchTerm) ||
        pose.description.toLowerCase().includes(searchTerm) ||
        pose.category.toLowerCase().includes(searchTerm)
      );
      renderGallery(filteredPoses);

      // Automatically scroll to the Gallery section
      const gallerySection = document.querySelector('#gallery');
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    });
  } catch (error) {
    console.error('Error loading poses:', error);
  }
}

// Function to Render the Gallery
function renderGallery(poses) {
  const galleryContainer = document.querySelector('.pose-grid');
  galleryContainer.innerHTML = ''; // Clear existing content

  poses.forEach(pose => {
    const poseItem = document.createElement('div');
    poseItem.classList.add('pose-item');
    poseItem.setAttribute('data-category', pose.category);
    poseItem.setAttribute('data-filter', pose.filter);

    poseItem.innerHTML = `
      <img src="${pose.image}" alt="${pose.category} Pose">
      <h3>${pose.category} Pose</h3>
      <p>${pose.description}</p>
    `;

    galleryContainer.appendChild(poseItem);
  });
}

// Call the Function to Load Poses
loadPoses();


// New add Back to Top Button Functionality
const backToTopButton = document.getElementById('back-to-top');

// Show or Hide the Button Based on Scroll Position
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // Show button when scrolled down 300px
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// Scroll Back to the Top on Button Click
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling
  });
});


