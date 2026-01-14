// News details data
const newsDetails = {
  ismir2025: {
    title: "Paper Accepted at ISMIR 2025",
    date: "June, 2025",
    tag: "Research",
    tagClass: "tag-research",
    type: "iframe", // Paper acceptance → demo page
    iframeUrl: "https://hayeonbang.github.io/PianoBind/"
  },
  icmc2025: {
    title: "Paper Accepted at ICMC 2025",
    date: "March, 2025",
    tag: "Research",
    tagClass: "tag-research",
    type: "iframe", // Paper acceptance → demo page
    iframeUrl: "https://hayeonbang.github.io/Dialogue_in_Resonance/"
  },
  graduation: {
    title: "Master's Graduation",
    date: "February, 2025",
    tag: "Milestone",
    tagClass: "tag-milestone",
    type: "content",
    content: `
      <h3>Successfully Defended Master's Thesis</h3>
      <p>I successfully defended my master's thesis and graduated from KAIST!</p>
      <p>This milestone marks the completion of my master's research in Music Information Retrieval 
      and opens new opportunities for my Ph.D. journey.</p>
    `
  },

  award2025: {
    title: "Seong-bu Kim Creativity Award",
    date: "January, 2025",
    tag: "Awards",
    tagClass: "tag-awards",
    type: "iframe", // Paper acceptance → demo page
    iframeUrl: "https://ct.kaist.ac.kr/boards/view/news_board/4241"
  },

  nlp4musa2024: {
    title: "Presented at NLP4MusA 2024",
    date: "November, 2024",
    tag: "Research",
    tagClass: "tag-research",
    type: "content", // Presentation → text with images
    content: `
      <h3>PIAST Dataset Presentation</h3>
      <p>I presented our PIAST dataset at NLP4MusA 2024 (NLP for Music Analysis workshop).</p>
      <p>The presentation covered our work on creating a comprehensive dataset for 
      piano performance analysis with symbolic and textual annotations.</p>
      
      <div class="panel-image-gallery">
        <!-- Add your presentation images here -->
        <p><em>Presentation photos and slides coming soon...</em></p>
      </div>
      
      <div class="panel-links">
        <a href="https://hayeonbang.github.io/PIAST_dataset/" target="_blank" rel="noopener noreferrer">
          🔗 Visit Project Page
        </a>
      </div>
    `
  },
  "nlp4musa2024-accept": {
    title: "Paper Accepted at NLP4MusA 2024",
    date: "September, 2024",
    tag: "Research",
    tagClass: "tag-research",
    type: "iframe", // Paper acceptance → demo page
    iframeUrl: "https://hayeonbang.github.io/PIAST_dataset/"
  }
};

// Get elements
const sidePanel = document.getElementById('sidePanel');
const panelOverlay = document.querySelector('.side-panel-overlay');
const panelClose = document.querySelector('.side-panel-close');
const panelBody = document.querySelector('.side-panel-body');
const newsItems = document.querySelectorAll('.news-item');

// Open panel
function openPanel(newsId) {
  const details = newsDetails[newsId];
  if (!details) return;

  let bodyContent = '';

  if (details.type === 'iframe') {
    // Iframe type - show full page (no header, full height)
    panelBody.classList.add('panel-body-iframe');
    bodyContent = `
      <a href="${details.iframeUrl}" target="_blank" rel="noopener noreferrer" class="panel-external-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        Open in new tab
      </a>
      <div class="panel-iframe-wrapper full-height">
        <iframe src="${details.iframeUrl}" class="panel-iframe" frameborder="0"></iframe>
      </div>
    `;
  } else {
    // Content type - show text with header
    panelBody.classList.remove('panel-body-iframe');
    bodyContent = `
      <div class="panel-header">
        <span class="news-tag ${details.tagClass}">${details.tag}</span>
        <div class="panel-date">${details.date}</div>
      </div>
      <div class="panel-content">
        ${details.content}
      </div>
    `;
  }

  // Set content
  panelBody.innerHTML = bodyContent;

  // Show panel
  sidePanel.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close panel
function closePanel() {
  sidePanel.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners
newsItems.forEach(item => {
  // Skip items with 'no-link' class
  if (item.classList.contains('no-link')) {
    return;
  }

  item.addEventListener('click', (e) => {
    // Don't open panel if clicking on a link
    if (e.target.tagName === 'A') {
      return;
    }

    const newsId = item.getAttribute('data-news-id');
    if (newsId) {
      openPanel(newsId);
    }
  });
});

panelClose.addEventListener('click', closePanel);
panelOverlay.addEventListener('click', closePanel);

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidePanel.classList.contains('active')) {
    closePanel();
  }
});