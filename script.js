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
