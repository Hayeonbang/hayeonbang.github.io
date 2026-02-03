// Thumbnail fallback: try maxresdefault first, fallback to hqdefault if it fails
document.querySelectorAll('.video-thumbnail img').forEach(img => {
    img.addEventListener('error', function () {
        // If maxresdefault fails, try hqdefault
        if (this.src.includes('maxresdefault')) {
            this.src = this.src.replace('maxresdefault', 'hqdefault');
        }
    });
});

// Tab switching functionality
const tabs = document.querySelectorAll('.music-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Modal functionality
const modal = document.getElementById('mediaModal');
const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close');
const modalOverlay = modal.querySelector('.modal-overlay');

// Inline video playback for video thumbnails
document.querySelectorAll('.video-thumbnail').forEach(element => {
    element.addEventListener('click', function () {
        // Don't do anything if already playing
        if (this.classList.contains('playing')) return;

        const videoId = this.getAttribute('data-video-id');

        // Replace thumbnail with iframe
        this.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
    `;
        this.classList.add('playing');
    });
});

// Open modal for images (scores)
document.querySelectorAll('[data-modal-type="image"]').forEach(element => {
    element.addEventListener('click', function () {
        const img = this.querySelector('img');
        const imgSrc = img.getAttribute('src');
        const imgAlt = img.getAttribute('alt');

        modalBody.innerHTML = `
      <div class="modal-image-wrapper">
        <img src="${imgSrc}" alt="${imgAlt}" />
      </div>
    `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Clear modal content after animation
    setTimeout(() => {
        modalBody.innerHTML = '';
    }, 300);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
