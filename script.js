/**
 * DC SOCIAL ACADEMY - INTERACTIVE CONTROLLER
 * Handles Tabs, Module Lesson Viewer, Search, Filters, Community, and Settings
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTabNavigation();
  initSidebarMobile();
  initModuleFiltering();
  initSearch();
  initModuleModal();
  initCommunityFeed();
  initSettings();
  initLogoutModal();
});

/* ==========================================================================
   MODULES DATA STORE (Syllabus, Lessons & Progress)
   ========================================================================== */
const modulesData = {
  'portfolio': {
    title: 'How to Create Portfolio',
    badge: 'Portfolio & Branding',
    desc: 'Design a high-converting creator portfolio, rate card, and case-study showcase to pitch to brands and clients.',
    lessons: [
      { id: 1, title: 'Lesson 1: Portfolio Structure & Brand Identity', duration: '8m', completed: true },
      { id: 2, title: 'Lesson 2: Crafting Case Studies with Real Metrics', duration: '12m', completed: true },
      { id: 3, title: 'Lesson 3: Creator Media Kit & Rate Card Design', duration: '10m', completed: true },
      { id: 4, title: 'Lesson 4: Hosting on Notion, Canva & Custom Domains', duration: '9m', completed: false },
      { id: 5, title: 'Lesson 5: Outbound Brand Pitching Email Templates', duration: '6m', completed: false }
    ]
  },
  'ai-photo': {
    title: 'How to Create AI Photo',
    badge: 'AI Visuals & Midjourney',
    desc: 'Master generative AI prompt engineering, consistent character styles, photorealistic lighting, and viral social avatars.',
    lessons: [
      { id: 1, title: 'Lesson 1: Introduction to Midjourney v6 & Parameters', duration: '10m', completed: true },
      { id: 2, title: 'Lesson 2: Lighting, Camera Lenses & Shutter Styles', duration: '8m', completed: true },
      { id: 3, title: 'Lesson 3: Consistent Character Face-Swapping Hacks', duration: '14m', completed: false },
      { id: 4, title: 'Lesson 4: Upscaling & Photoshop Generative Fill', duration: '11m', completed: false },
      { id: 5, title: 'Lesson 5: Creating Viral Thumbnail Faces & Avatars', duration: '9m', completed: false },
      { id: 6, title: 'Lesson 6: Aesthetic Instagram Carousel Generation', duration: '8m', completed: false }
    ]
  },
  'content-creation': {
    title: 'All About Content Creation',
    badge: 'Viral Video & Storytelling',
    desc: 'The complete blueprint from 3-second hook scripting and CapCut pacing to viral retention loops and multi-platform distribution.',
    lessons: [
      { id: 1, title: 'Lesson 1: The Anatomy of a 3-Second Viral Hook', duration: '12m', completed: true },
      { id: 2, title: 'Lesson 2: Visual Pacing & Retention Editing in CapCut', duration: '15m', completed: true },
      { id: 3, title: 'Lesson 3: Sound Design, SFX & Subconscious Cues', duration: '10m', completed: true },
      { id: 4, title: 'Lesson 4: Repurposing from Reels to TikTok & Shorts', duration: '8m', completed: true }
    ]
  },
  'monetization': {
    title: 'Monetization & Sponsorships',
    badge: 'Creator Business',
    desc: 'Learn how to calculate your CPM rates, pitch inbound/outbound brands, negotiate usage rights, and close 4-figure deals.',
    lessons: [
      { id: 1, title: 'Lesson 1: Pricing Yourself & CPM Calculator', duration: '10m', completed: true },
      { id: 2, title: 'Lesson 2: Inbound vs Outbound Brand Pitching', duration: '14m', completed: true },
      { id: 3, title: 'Lesson 3: Contract Red Flags & Usage Rights Exclusivity', duration: '12m', completed: true }
    ]
  },
  'reels-algorithm': {
    title: 'Reels & TikTok Algorithm SEO',
    badge: 'Social Algorithms',
    desc: 'Demystify algorithmic indexing, discoverability signals, trending audio timing, and keyword metadata hacks.',
    lessons: [
      { id: 1, title: 'Lesson 1: How Modern Recommender Systems Work', duration: '11m', completed: true },
      { id: 2, title: 'Lesson 2: Video SEO, Caption Keywords & Audio Ranks', duration: '14m', completed: false },
      { id: 3, title: 'Lesson 3: Batch Recording & Ideal Posting Times', duration: '10m', completed: false }
    ]
  },
  'cinematography': {
    title: 'Mobile Video Production',
    badge: 'Production Setup',
    desc: 'Studio lighting on a budget, 4K camera settings, lavalier microphone acoustics, and seamless b-roll workflows.',
    lessons: [
      { id: 1, title: 'Lesson 1: 3-Point Lighting on a Creator Budget', duration: '9m', completed: false },
      { id: 2, title: 'Lesson 2: iPhone & Android Manual Pro Camera Settings', duration: '11m', completed: false },
      { id: 3, title: 'Lesson 3: Crisp Audio with Wireless Lavs & Post Cleanup', duration: '8m', completed: false }
    ]
  }
};

let activeModuleKey = 'portfolio';
let activeLessonIndex = 0;

/* ==========================================================================
   TAB NAVIGATION (HOME, COMMUNITY, SETTINGS)
   ========================================================================== */
function initTabNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabViews = {
    home: document.getElementById('homeView'),
    community: document.getElementById('communityView'),
    settings: document.getElementById('settingsView')
  };

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update sidebar active states
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update view visibility
      Object.keys(tabViews).forEach(key => {
        if (tabViews[key]) {
          tabViews[key].classList.remove('active');
        }
      });

      if (tabViews[targetTab]) {
        tabViews[targetTab].classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Close mobile sidebar if open
      const sidebar = document.getElementById('sidebar');
      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   MOBILE SIDEBAR TOGGLE
   ========================================================================== */
function initSidebarMobile() {
  const menuToggle = document.getElementById('menuToggleBtn');
  const sidebar = document.getElementById('sidebar');

  menuToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        sidebar?.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !menuToggle?.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

/* ==========================================================================
   MODULE FILTERING (ALL, IN PROGRESS, COMPLETED, AI, CONTENT)
   ========================================================================== */
function initModuleFiltering() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const moduleCards = document.querySelectorAll('.module-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      moduleCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const status = card.getAttribute('data-status') || '';

        if (filter === 'all') {
          card.style.display = 'flex';
        } else if (filter === 'in-progress' && status === 'in-progress') {
          card.style.display = 'flex';
        } else if (filter === 'completed' && status === 'completed') {
          card.style.display = 'flex';
        } else if (filter === 'ai' && category.includes('ai')) {
          card.style.display = 'flex';
        } else if (filter === 'content' && (category.includes('content') || category.includes('strategy'))) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   GLOBAL SEARCH BAR
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const moduleCards = document.querySelectorAll('.module-card');

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    moduleCards.forEach(card => {
      const title = card.querySelector('.module-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.module-desc')?.textContent.toLowerCase() || '';
      const tag = card.querySelector('.module-category-tag')?.textContent.toLowerCase() || '';

      if (title.includes(query) || desc.includes(query) || tag.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   INTERACTIVE MODULE & LESSON VIEWER MODAL
   ========================================================================== */
function initModuleModal() {
  const modal = document.getElementById('moduleModal');
  const closeBtn = document.getElementById('btnCloseModuleModal');
  const startBtns = document.querySelectorAll('.btn-start-module, .btn-module-info');
  const completeBtn = document.getElementById('btnToggleComplete');
  const downloadBtn = document.getElementById('btnDownloadResources');

  startBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const moduleKey = btn.getAttribute('data-module');
      if (modulesData[moduleKey]) {
        openModule(moduleKey);
      }
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('show');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  // Toggle Current Lesson Complete
  completeBtn?.addEventListener('click', () => {
    const mod = modulesData[activeModuleKey];
    if (!mod || !mod.lessons[activeLessonIndex]) return;

    const currentLesson = mod.lessons[activeLessonIndex];
    currentLesson.completed = !currentLesson.completed;

    updateModalSyllabus();
    updateModuleCardProgress(activeModuleKey);
    updateGlobalMetrics();

    if (currentLesson.completed) {
      showToast(`🎉 "${currentLesson.title}" marked as complete!`);
    } else {
      showToast(`Lesson marked as incomplete.`);
    }
  });

  downloadBtn?.addEventListener('click', () => {
    showToast('📥 Downloading creator checklists & prompt templates...');
  });
}

function openModule(moduleKey) {
  const mod = modulesData[moduleKey];
  if (!mod) return;

  activeModuleKey = moduleKey;
  activeLessonIndex = 0;

  // Set modal header text
  document.getElementById('modalBadge').textContent = mod.badge;
  document.getElementById('modalModuleTitle').textContent = mod.title;

  updateModalSyllabus();

  const modal = document.getElementById('moduleModal');
  modal?.classList.add('show');
}

function updateModalSyllabus() {
  const mod = modulesData[activeModuleKey];
  if (!mod) return;

  const currentLesson = mod.lessons[activeLessonIndex];
  const currentTitleEl = document.getElementById('currentLessonTitle');
  const lessonHeaderEl = document.getElementById('lessonHeader');
  const completeBtnText = document.getElementById('completeBtnText');
  const syllabusList = document.getElementById('syllabusList');
  const syllabusProgress = document.getElementById('syllabusProgress');

  if (currentTitleEl) currentTitleEl.textContent = currentLesson.title;
  if (lessonHeaderEl) lessonHeaderEl.textContent = currentLesson.title;
  if (completeBtnText) {
    completeBtnText.textContent = currentLesson.completed ? 'Completed ✓ (Click to Undo)' : 'Mark Lesson as Complete';
  }

  // Calculate completed count
  const completedCount = mod.lessons.filter(l => l.completed).length;
  if (syllabusProgress) {
    syllabusProgress.textContent = `${completedCount} / ${mod.lessons.length} Completed`;
  }

  // Render syllabus list
  if (syllabusList) {
    syllabusList.innerHTML = '';
    mod.lessons.forEach((lesson, index) => {
      const item = document.createElement('div');
      item.className = `syllabus-item ${index === activeLessonIndex ? 'active' : ''} ${lesson.completed ? 'completed-item' : ''}`;
      item.innerHTML = `
        <i data-lucide="${lesson.completed ? 'check-circle-2' : 'circle'}" class="lesson-status-icon"></i>
        <div class="lesson-meta-title">${escapeHTML(lesson.title)}</div>
        <span class="lesson-duration">${lesson.duration}</span>
      `;
      item.addEventListener('click', () => {
        activeLessonIndex = index;
        updateModalSyllabus();
      });
      syllabusList.appendChild(item);
    });

    if (window.lucide) window.lucide.createIcons();
  }
}

function updateModuleCardProgress(moduleKey) {
  const mod = modulesData[moduleKey];
  if (!mod) return;

  const card = document.querySelector(`.module-card[data-module-id="${moduleKey}"]`);
  if (!card) return;

  const total = mod.lessons.length;
  const completed = mod.lessons.filter(l => l.completed).length;
  const pct = Math.round((completed / total) * 100);

  const fill = card.querySelector('.module-progress-fill');
  const val = card.querySelector('.progress-val');
  const indicator = card.querySelector('.status-indicator');

  if (fill) fill.style.width = `${pct}%`;
  if (val) val.textContent = `${pct}%`;

  if (pct === 100) {
    card.setAttribute('data-status', 'completed');
    if (indicator) {
      indicator.className = 'status-indicator completed';
      indicator.textContent = 'Completed ✓';
    }
  } else if (pct > 0) {
    card.setAttribute('data-status', 'in-progress');
    if (indicator) {
      indicator.className = 'status-indicator in-progress';
      indicator.textContent = 'In Progress';
    }
  } else {
    card.setAttribute('data-status', 'not-started');
    if (indicator) {
      indicator.className = 'status-indicator not-started';
      indicator.textContent = 'Not Started';
    }
  }
}

function updateGlobalMetrics() {
  let totalLessons = 0;
  let totalCompleted = 0;
  let completedModules = 0;
  let inProgressModules = 0;

  Object.values(modulesData).forEach(mod => {
    const modCompleted = mod.lessons.filter(l => l.completed).length;
    totalLessons += mod.lessons.length;
    totalCompleted += modCompleted;

    if (modCompleted === mod.lessons.length) {
      completedModules++;
    } else if (modCompleted > 0) {
      inProgressModules++;
    }
  });

  const overallPct = Math.round((totalCompleted / totalLessons) * 100);

  const headerFill = document.getElementById('headerProgressFill');
  const headerText = document.getElementById('headerProgressText');
  const statCompleted = document.getElementById('statCompleted');
  const statInProgress = document.getElementById('statInProgress');

  if (headerFill) headerFill.style.width = `${overallPct}%`;
  if (headerText) headerText.textContent = `${overallPct}%`;
  if (statCompleted) statCompleted.textContent = completedModules;
  if (statInProgress) statInProgress.textContent = inProgressModules;
}

/* ==========================================================================
   COMMUNITY FEED INTERACTION
   ========================================================================== */
function initCommunityFeed() {
  const publishBtn = document.getElementById('btnPublishPost');
  const composerInput = document.getElementById('composerInput');
  const feed = document.getElementById('communityFeed');
  const tagPills = document.querySelectorAll('.tag-pill');

  // Insert tag into composer
  tagPills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (composerInput) {
        composerInput.value += ` ${pill.textContent} `;
        composerInput.focus();
      }
    });
  });

  // Publish new post
  publishBtn?.addEventListener('click', () => {
    const content = composerInput?.value.trim();
    if (!content) {
      showToast('Please type your update first.');
      return;
    }

    const newPost = document.createElement('article');
    newPost.className = 'feed-post-card';
    newPost.innerHTML = `
      <div class="post-author-row">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" class="post-author-avatar">
        <div class="post-author-info">
          <h4>Alex Rivera <span class="badge-creator">Author</span></h4>
          <span class="post-time">Just now • in #CreatorCommunity</span>
        </div>
      </div>
      <div class="post-content">
        <p>${escapeHTML(content)}</p>
      </div>
      <div class="post-footer">
        <button class="post-interaction-btn like-btn" data-liked="false">
          <i data-lucide="heart"></i>
          <span class="like-count">1</span> Likes
        </button>
        <button class="post-interaction-btn comment-toggle-btn">
          <i data-lucide="message-square"></i>
          <span>0 Comments</span>
        </button>
        <button class="post-interaction-btn share-btn">
          <i data-lucide="share-2"></i>
          <span>Share</span>
        </button>
      </div>
    `;

    feed?.prepend(newPost);
    composerInput.value = '';
    showToast('🚀 Post published to DC Creator Community!');
    if (window.lucide) window.lucide.createIcons();
    attachPostInteractions(newPost);
  });

  // Attach existing post interaction listeners
  document.querySelectorAll('.feed-post-card').forEach(attachPostInteractions);

  document.getElementById('btnNewCommunityPost')?.addEventListener('click', () => {
    composerInput?.focus();
    composerInput?.scrollIntoView({ behavior: 'smooth' });
  });
}

function attachPostInteractions(postEl) {
  const likeBtn = postEl.querySelector('.like-btn');
  const commentBtn = postEl.querySelector('.comment-toggle-btn');
  const shareBtn = postEl.querySelector('.share-btn');

  likeBtn?.addEventListener('click', () => {
    const isLiked = likeBtn.getAttribute('data-liked') === 'true';
    const countEl = likeBtn.querySelector('.like-count');
    let count = parseInt(countEl?.textContent || '0', 10);

    if (isLiked) {
      likeBtn.setAttribute('data-liked', 'false');
      likeBtn.classList.remove('liked');
      if (countEl) countEl.textContent = Math.max(0, count - 1);
    } else {
      likeBtn.setAttribute('data-liked', 'true');
      likeBtn.classList.add('liked');
      if (countEl) countEl.textContent = count + 1;
      showToast('Liked post ❤️');
    }
  });

  commentBtn?.addEventListener('click', () => {
    showToast('💬 Comments thread opened');
  });

  shareBtn?.addEventListener('click', () => {
    showToast('🔗 Post link copied to clipboard!');
  });
}

/* ==========================================================================
   SETTINGS & NOTIFICATIONS
   ========================================================================== */
function initSettings() {
  const form = document.getElementById('profileSettingsForm');
  const resetBtn = document.getElementById('btnResetProgress');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const handle = document.getElementById('handle').value;

    const userNameEl = document.querySelector('.user-name');
    const userHandleEl = document.querySelector('.user-handle');

    if (userNameEl) userNameEl.textContent = name;
    if (userHandleEl) userHandleEl.textContent = handle;

    showToast('✅ Profile settings saved successfully!');
  });

  resetBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all module progress to 0%?')) {
      Object.values(modulesData).forEach(mod => {
        mod.lessons.forEach(l => l.completed = false);
      });

      Object.keys(modulesData).forEach(key => updateModuleCardProgress(key));
      updateGlobalMetrics();
      showToast('🔄 Course progress has been reset.');
    }
  });

  document.getElementById('btnNotification')?.addEventListener('click', () => {
    showToast('🔔 2 new lessons added to "How to Create AI Photo"');
  });
}

/* ==========================================================================
   LOGOUT MODAL
   ========================================================================== */
function initLogoutModal() {
  const btnLogout = document.getElementById('btnLogout');
  const logoutModal = document.getElementById('logoutModal');
  const closeBtn = document.getElementById('btnCloseLogoutModal');
  const cancelBtn = document.getElementById('btnCancelLogout');
  const confirmBtn = document.getElementById('btnConfirmLogout');

  btnLogout?.addEventListener('click', () => {
    logoutModal?.classList.add('show');
  });

  const closeModal = () => logoutModal?.classList.remove('show');

  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  logoutModal?.addEventListener('click', (e) => {
    if (e.target === logoutModal) closeModal();
  });

  confirmBtn?.addEventListener('click', () => {
    closeModal();
    showToast('👋 You have been logged out successfully.');
  });
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<i data-lucide="info"></i> <span>${message}</span>`;
  container.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
