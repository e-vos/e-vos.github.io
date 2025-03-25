/*document.addEventListener("DOMContentLoaded", function() {
    // Load the navigation
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading navigation:', error));
});

window.onload = function() {
  const mainContent = document.querySelector('.wrapper');
  const numStars = 350; // Number of stars

  // Create stars
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Randomize position of the star within .main-content
    const x = Math.random() * mainContent.offsetWidth; // Random horizontal position
    const y = Math.random() * mainContent.offsetHeight; // Random vertical position

    // Randomize animation delay and duration
    const delay = Math.random() * 5; // Random delay for twinkle start
    const duration = Math.random() * 4 + 2; // Random twinkle duration between 2s and 6s

    // Set the random position and animation properties
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.animationDelay = `${delay}s`;
    star.style.animationDuration = `${duration}s`;

    // Append the star to .main-content
    mainContent.appendChild(star);
  }
};
*/