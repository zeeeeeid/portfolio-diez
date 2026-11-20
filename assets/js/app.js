// ===================================================================
// IRENE // REACT 18 FRONT-END APPLICATION
// Playful Pink & Black Portfolio with Interactive Features,
// Sound Effects, Custom Cursors, Easter Eggs & Media Gallery
// ===================================================================

const { useState, useEffect, useRef, useMemo } = React;

// -------------------------------------------------------------------
// Confetti Burst Utility (Pure Canvas - zero external library needed)
// -------------------------------------------------------------------
function triggerConfetti(originX, originY) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#ff2d75', '#ff79b0', '#ffffff', '#ff0055', '#ffd1dc', '#ffd700'];
  const particles = [];
  const startX = originX || window.innerWidth / 2;
  const startY = originY || window.innerHeight / 2;

  for (let i = 0; i < 90; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: Math.random() * 10 - 5,
      life: 1,
      decay: Math.random() * 0.02 + 0.012
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98;
      p.rotation += p.vRot;
      p.life -= p.decay;

      if (p.life > 0) {
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    });

    if (alive > 0) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }
  update();
}

// -------------------------------------------------------------------
// Initial Projects Data
// -------------------------------------------------------------------
const INITIAL_PROJECTS = [
  {
    id: 'p-capstone-video',
    title: 'Capstone Project: Hiring Management System with Intelligent Chatbot (NLP)',
    category: 'video',
    desc: 'Recorded video walkthrough of my university capstone project: AI-powered hiring management system with NLP resume parsing and Gemini API integration.',
    image: 'projects/hms.png',
    videoFile: 'projects/capstone-project.mp4',
    isVideo: true,
    tags: ['Video Demo', 'Capstone System', 'Gemini API', 'NLP', 'React.js', 'PHP', 'XAMPP'],
    demoUrl: '#',
    details: 'Complete end-to-end video demonstration presenting applicant resume parsing with Gemini API, conversational AI assistance, automated candidate profiling, and recruiter review portal.'
  },
  {
    id: 'p-logo-animation',
    title: 'Motion Design: Logo Animation & Visual Effects',
    category: 'video',
    desc: 'Dynamic motion graphics and animated logo sequence featuring keyframe transitions, visual pacing, and creative brand presentation.',
    image: 'projects/logo1.png',
    videoFile: 'projects/logo1-animation.mp4',
    isVideo: true,
    tags: ['Video Demo', 'Motion Design', 'Logo Animation', 'Video Editing'],
    demoUrl: '#',
    details: 'High-energy 2D/3D logo reveal animation produced with modern video editing and animation software, demonstrating object motion, timing, and visual composition.'
  },
  {
    id: 'p-ui-ux',
    title: 'Hiring Management System UI/UX Design & Prototype',
    category: 'uiux',
    desc: 'High-fidelity user interface wireframes and interactive prototype created for the modern hiring and recruitment web platform.',
    image: 'projects/ui-ux.png',
    tags: ['UI/UX Design', 'Interface Prototype', 'User Flow', 'Figma / Wireframes'],
    demoUrl: '#',
    details: 'Structured UI/UX wireframes and visual design screens emphasizing intuitive navigation, responsive applicant forms, candidate metrics dashboards, and aesthetic hierarchy.'
  },
  {
    id: 'p-movie-poster',
    title: 'Creative Media: Digital Movie Poster Design',
    category: 'uiux',
    desc: 'Creative visual storytelling and cinematic poster art crafted with Adobe Photoshop, emphasizing atmospheric lighting, color grading, and dramatic typography.',
    image: 'projects/movie-poster.png',
    tags: ['Graphic Design', 'Movie Poster', 'Adobe Photoshop', 'Typography', 'Lighting'],
    demoUrl: '#',
    details: 'Professional graphic design poster created utilizing advanced image compositing, blending modes, custom typography, cinematic textures, and color theory.'
  },
  {
    id: 'p-graphic-fries',
    title: 'Commercial Food Branding & Packaging Design',
    category: 'uiux',
    desc: 'Vibrant promotional advertising design and food packaging graphic showcasing product marketing, typography, and commercial visual appeal.',
    image: 'projects/graphic-design-fries.png',
    tags: ['Graphic Design', 'Product Branding', 'Advertising Art', 'Adobe Photoshop'],
    demoUrl: '#',
    details: 'Marketing and product promotional graphic created to highlight appetite appeal, vibrant color contrasts, promotional messaging, and brand personality.'
  },
  {
    id: 'p-business-card',
    title: 'Corporate Stationery & Business Card Identity',
    category: 'uiux',
    desc: 'Clean and minimalist corporate business card stationery designed with precision grid layout, modern typography, and brand contact hierarchy.',
    image: 'projects/business-card.png',
    tags: ['Corporate Identity', 'Business Card', 'Print Design', 'Typography'],
    demoUrl: '#',
    details: 'Sophisticated print stationery layout applying graphic design principles, clean margin balancing, legible typographic hierarchies, and brand aesthetic continuity.'
  },
  {
    id: 'p-logo-design',
    title: 'Brand Identity: Logo Vector Marks & Typography',
    category: 'uiux',
    desc: 'Original brand identity and custom logo mark package designed for versatile scaling across digital platforms, app icons, and merchandise.',
    image: 'projects/logo1.png',
    tags: ['Logo Design', 'Vector Identity', 'Brand Mark', 'Adobe Creative'],
    demoUrl: '#',
    details: 'Original vector logo marks engineered for high memorability, aesthetic balance, scalable geometry, and strong silhouette recognition.'
  },
  {
    id: 'p-logo2-design',
    title: 'Logo Concept & Geometric Brand Mark',
    category: 'uiux',
    desc: 'Alternative brand emblem and creative vector logo exploring distinct geometry, iconography, and modern visual branding.',
    image: 'projects/logo2.png',
    tags: ['Logo Design', 'Vector Icon', 'Branding', 'Visual Identity'],
    demoUrl: '#',
    details: 'Stylized identity mark focusing on sharp geometric contours, modern aesthetic minimalism, and versatile digital brand representation.'
  },
  {
    id: 'p-minicapstone',
    title: 'Hiring System with Online Personality Examination',
    category: 'php',
    desc: 'System Integration & Architecture Mini Capstone: Dynamic recruitment and candidate evaluation platform integrating an automated online personality test and assessment scoring engine.',
    image: 'projects/ui-ux.png',
    tags: ['PHP', 'XAMPP', 'JavaScript', 'HTML5', 'CSS3', 'Full-stack Developer'],
    demoUrl: '#',
    details: 'Full-stack developed with PHP, MySQL, JavaScript, and responsive CSS. Evaluates applicants through interactive personality questionnaires, calculating scores dynamically to aid HR hiring teams.'
  },
  {
    id: 'p-mobile-suite',
    title: 'Social Media Mobile App',
    category: 'experiments',
    desc: 'Hands-on mobile social media application built with Dart, featuring user feeds, interactions, and a responsive mobile UI.',
    image: 'projects/social-media.png',
    tags: ['Dart', 'Flutter', 'Mobile App', 'Social Media', 'UI Design'],
    demoUrl: '#',
    details: 'Mobile social media app developed through hands-on lab work. Features user feeds, interactive posts, and a clean responsive mobile interface.'
  }
];

// -------------------------------------------------------------------
// Initial Media Items (Images & Videos)
// -------------------------------------------------------------------
const INITIAL_MEDIA = [
  {
    id: 'media-capstone-video',
    title: 'Capstone Project Video Walkthrough',
    type: 'video',
    url: 'projects/capstone-project.mp4',
    poster: 'projects/ui-ux.png',
    category: 'Video Demos',
    desc: 'Full video walkthrough of the Hiring Management System with intelligent NLP resume parsing and Gemini API.'
  },
  {
    id: 'media-logo-animation',
    title: 'Logo Animation & Motion Design Reel',
    type: 'video',
    url: 'projects/logo1-animation.mp4',
    poster: 'projects/logo1.png',
    category: 'Video Demos',
    desc: 'High-energy logo animation and motion graphic showcase created with video editing software.'
  },
  {
    id: 'media-uiux',
    title: 'Hiring Management System UI/UX Prototype',
    type: 'image',
    url: 'projects/ui-ux.png',
    category: 'UI/UX Design',
    desc: 'High-fidelity interface wireframes and interactive prototype designed for modern applicant workflows.'
  },
  {
    id: 'media-movie-poster',
    title: 'Digital Movie Poster Artwork',
    type: 'image',
    url: 'projects/movie-poster.png',
    category: 'Graphic Design',
    desc: 'Cinematic poster art designed in Adobe Photoshop with dramatic lighting, compositing, and typography.'
  },
  {
    id: 'media-fries',
    title: 'Commercial Food Branding Design',
    type: 'image',
    url: 'projects/graphic-design-fries.png',
    category: 'Graphic Design',
    desc: 'Commercial packaging and product advertising graphic artwork with high visual appeal.'
  },
  {
    id: 'media-business-card',
    title: 'Corporate Business Card Stationery',
    type: 'image',
    url: 'projects/business-card.png',
    category: 'Corporate Identity',
    desc: 'Modern print stationery layout with balanced grid margins and elegant typography.'
  },
  {
    id: 'media-logo1',
    title: 'Brand Identity Logo Mark 1',
    type: 'image',
    url: 'projects/logo1.png',
    category: 'Brand Identity',
    desc: 'Custom vector logo mark designed for versatile scaling across digital media and branding.'
  },
  {
    id: 'media-logo2',
    title: 'Geometric Logo Emblem 2',
    type: 'image',
    url: 'projects/logo2.png',
    category: 'Brand Identity',
    desc: 'Modern geometric brand symbol exploring sharp contours and visual balance.'
  }
];

// -------------------------------------------------------------------
// Educational Attainment Data
// -------------------------------------------------------------------
const EDUCATION_DATA = [
  {
    id: 'edu-1',
    period: '2022 - PRESENT',
    degree: 'Bachelor of Science in Information Technology',
    institution: 'College of Computer Studies',
    honors: "Dean's Lister & Web Development Excellence Award",
    description: 'Specializing in Web Development, User Experience Design, and Modern Software Engineering. Lead frontend developer for university tech symposium projects.',
    skills: ['Web Architecture', 'Database Systems', 'Software Engineering', 'UI/UX Principles']
  },
  {
    id: 'edu-2',
    period: '2020 - 2022',
    degree: 'Senior High School - TVL ICT Strand',
    institution: 'Academy of Science and Technology',
    honors: 'With High Honors • Best in Programming Capstone',
    description: 'Developed early mastery of HTML5, CSS3, JavaScript fundamentals, and PHP server scripting. Created award-winning interactive campus portal.',
    skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'PHP Fundamentals', 'Algorithm Design']
  },
  {
    id: 'edu-3',
    period: '2023 - 2024',
    degree: 'Advanced React & Modern Full-Stack Certification',
    institution: 'Professional Tech Academy',
    honors: 'Top 5% Graduate Capstone Project',
    description: 'Intensive specialization covering React Hooks, State Management, Custom Hook Design, RESTful PHP endpoints, and Motion Design.',
    skills: ['React Hooks', 'Full-Stack PHP', 'Web Audio API', 'Performance Optimization']
  }
];

// -------------------------------------------------------------------
// Skills & Tech Stack Data
// -------------------------------------------------------------------
const SKILLS_DATA = [
  { name: 'React.js', level: 95, category: 'frontend', tag: 'Expert' },
  { name: 'JavaScript (ES6+)', level: 92, category: 'frontend', tag: 'Expert' },
  { name: 'HTML5 & Semantic Markup', level: 98, category: 'frontend', tag: 'Master' },
  { name: 'CSS3 / CSS Grid & Flexbox', level: 96, category: 'frontend', tag: 'Wizard' },
  { name: 'PHP & Backend Scripting', level: 85, category: 'backend', tag: 'Advanced' },
  { name: 'REST APIs & JSON', level: 88, category: 'backend', tag: 'Advanced' },
  { name: 'UI Animations & Keyframes', level: 94, category: 'design', tag: 'Artisan' },
  { name: 'Figma to Code', level: 90, category: 'design', tag: 'Creative' },
  { name: 'Git & Version Control', level: 86, category: 'tools', tag: 'Pro' }
];

// ===================================================================
// Main App Component
// ===================================================================
function PortfolioApp() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Media Gallery State
  const [mediaList, setMediaList] = useState(INITIAL_MEDIA);
  const [selectedMedia, setSelectedMedia] = useState(null); // for lightbox/video modal
  const [mediaFilter, setMediaFilter] = useState('all');

  // Project Modal State
  const [selectedProject, setSelectedProject] = useState(null);

  // Sync theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Try fetching media from PHP API if running in PHP environment
  useEffect(() => {
    fetch('api/media.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success' && data.media && data.media.length > 0) {
          // Merge detected PHP files with gallery
          const phpMedia = data.media.map((m, idx) => ({
            id: 'php-' + idx,
            title: m.title,
            type: m.type,
            url: m.url,
            category: m.type === 'video' ? 'PHP Video' : 'PHP Upload',
            desc: `Detected from assets/media/ (${m.filename})`
          }));
          setMediaList(prev => [...phpMedia, ...prev]);
        }
      })
      .catch(() => {
        // Silently fall back to initial media if running purely statically
      });
  }, []);

  // Theme Toggle Handler
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  // Switch Tab Handler
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-wrapper">
      {/* Decorative Floating Gradient Orbs */}
      <div className="bg-decorations" aria-hidden="true">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onNavClick={handleNavClick}
        theme={theme}
        onToggleTheme={toggleTheme}
        mobileOpen={mobileMenuOpen}
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content Area: Tab Views or Scroll Sections */}
      <main className="main-content">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExplore={() => handleNavClick('projects')}
              onViewGallery={() => handleNavClick('gallery')}
              onContact={() => handleNavClick('contact')}
            />
            <AboutSection onExploreSkills={() => handleNavClick('about')} />
            <ProjectsSection onViewProject={(p) => setSelectedProject(p)} />
            <EducationSection />
            <GallerySection
              mediaList={mediaList}
              filter={mediaFilter}
              onFilterChange={setMediaFilter}
              onSelectMedia={setSelectedMedia}
              onAddMedia={(newItems) => setMediaList([...newItems, ...mediaList])}
            />
            <ContactSection />
          </>
        )}

        {activeTab === 'about' && (
          <div style={{ paddingTop: '2rem' }}>
            <AboutSection fullView={true} />
            <EducationSection />
          </div>
        )}

        {activeTab === 'projects' && (
          <div style={{ paddingTop: '2rem' }}>
            <ProjectsSection fullView={true} onViewProject={(p) => setSelectedProject(p)} />
          </div>
        )}

        {activeTab === 'education' && (
          <div style={{ paddingTop: '2rem' }}>
            <EducationSection fullView={true} />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div style={{ paddingTop: '2rem' }}>
            <GallerySection
              fullView={true}
              mediaList={mediaList}
              filter={mediaFilter}
              onFilterChange={setMediaFilter}
              onSelectMedia={setSelectedMedia}
              onAddMedia={(newItems) => setMediaList([...newItems, ...mediaList])}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ paddingTop: '2rem' }}>
            <ContactSection fullView={true} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Modals & Overlays */}
      {selectedMedia && (
        <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

// -------------------------------------------------------------------
// Component: Navigation Bar
// -------------------------------------------------------------------
function Navbar({
  activeTab,
  onNavClick,
  theme,
  onToggleTheme,
  mobileOpen,
  onToggleMobile
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '⚡' },
    { id: 'about', label: 'About & Skills', icon: '🌸' },
    { id: 'projects', label: 'Projects', icon: '💻' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'gallery', label: 'Media & Videos', icon: '🎬' },
    { id: 'contact', label: 'Contact', icon: '💌' }
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand-logo" onClick={() => onNavClick('home')}>
          <div className="brand-dot"></div>
          <span>IRENE<span className="text-pink">.DEV</span></span>
        </div>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-item-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => onNavClick(item.id)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions: Theme, Mobile toggle */}
        <div className="nav-actions">
          {/* Theme Switcher */}
          <button
            className="btn-icon"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="btn-icon"
            style={{ display: 'none' }}
            id="mobile-nav-toggle"
            onClick={onToggleMobile}
          >
            <span>☰</span>
          </button>
        </div>
      </div>
    </header>
  );
}
            <span>☰</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// -------------------------------------------------------------------
// Component: Hero Section
// -------------------------------------------------------------------
function HeroSection({ onExplore, onViewGallery, onContact }) {
  // Animated Typing Subtitle
  const roles = [
    'Graphic & UI/UX Designer',
    'Quality Assurance (QA) Analyst',
    'Visual Interface & Systems Designer',
    'Software Quality & UX Specialist'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFull = roles[roleIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFull) {
      speed = 1800; // Pause at full text
      const timeout = setTimeout(() => setIsDeleting(true), speed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
      speed = 300;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentFull.substring(0, displayText.length - 1)
          : currentFull.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="hero-section container">
      <div className="hero-grid">
        {/* Left Text Content */}
        <div className="hero-text-col">
          <div className="hero-status-pill">
            <span className="status-indicator-glow"></span>
            <span>Available for projects & creative collaborations</span>
          </div>

          <h1 className="hero-title">
            Innovating solutions through <span className="text-gradient">UI & Graphic Design</span> and Quality Assurance.
          </h1>

          <div className="hero-typing-wrapper">
            <span>&gt; </span>
            <span>{displayText}</span>
            <span className="typing-cursor"></span>
          </div>

          <p className="hero-bio">
            Hello, I'm <strong className="text-pink">Ailyn Diez</strong> — an Information Technology specialist focused on
            <strong className="text-pink"> Graphic & UI/UX Design</strong> and <strong className="text-pink">Quality Assurance (QA)</strong>.
            I specialize in designing intuitive, aesthetically compelling digital interfaces while ensuring every application meets
            rigorous standards of functionality, reliability, and seamless user experience.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn btn-pink"
              onClick={(e) => {
                triggerConfetti(e.clientX, e.clientY);
                onExplore();
              }}
            >
              <span>Explore My Projects</span>
            </button>

            <button
              className="btn btn-outline"
              onClick={onViewGallery}
            >
              <span>Watch Video Reels & Gallery</span>
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <h4>15+</h4>
              <p>Projects Built</p>
            </div>
            <div className="hero-stat-item">
              <h4>100%</h4>
              <p>Pixel Devotion</p>
            </div>
            <div className="hero-stat-item">
              <h4>99.9%</h4>
              <p>Matcha & Pink Vibes</p>
            </div>
          </div>
        </div>

        {/* Right Visual / Avatar with Playful Floating Badges */}
        <div className="hero-visual-wrapper">
          <div className="hero-avatar-frame">
            <img
              src="assets/media/avatar.svg"
              alt="Irene Cyberpunk Avatar"
              className="hero-avatar-img"
            />
          </div>

          {/* Floating Interactive Stickers */}
          <div
            className="floating-sticker sticker-top-right"
            onClick={() => {
              if (window.soundFx) window.soundFx.playPop(700);
            }}
          >
            <span>💖</span>
            <span>Pink & Black Vibe</span>
          </div>

          <div
            className="floating-sticker sticker-bottom-left"
            onClick={() => {
              if (window.soundFx) window.soundFx.playPop(620);
            }}
          >
            <span>⚛️</span>
            <span>React & PHP Powered</span>
          </div>

          <div
            className="floating-sticker sticker-top-left"
            onClick={() => {
              if (window.soundFx) window.soundFx.playPop(850);
            }}
          >
            <span>✨</span>
            <span>Playful Motion</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Component: About Me & Skills Section
// -------------------------------------------------------------------
function AboutSection({ fullView = false }) {
  const [skillCategory, setSkillCategory] = useState('all');

  const filteredSkills = useMemo(() => {
    if (skillCategory === 'all') return SKILLS_DATA;
    return SKILLS_DATA.filter(s => s.category === skillCategory);
  }, [skillCategory]);

  return (
    <section className="about-section container" style={{ padding: '4rem 0' }}>
      <div className="section-header">
        <span className="section-tag">About Me</span>
        <h2 className="section-title">Who is Irene? 🌸</h2>
        <p className="section-desc">
          A creative front-end developer dedicated to building lovable, high-speed, and
          delightfully animated web applications.
        </p>
      </div>

      <div className="about-grid">
        {/* Left Column: Bio & Superpowers */}
        <div className="card about-card">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--pink-primary)' }}>
            Design with Passion, Code with Precision
          </h3>
          <p className="about-story-text">
            I love bridging the gap between imaginative design aesthetics and robust technical
            implementation. With a signature style of high-contrast <strong>Pink and Black</strong> cyber-elegance,
            I craft websites that feel responsive, alive, and memorable.
          </p>
          <p className="about-story-text">
            Whether building reactive state-driven user interfaces in <strong>React 18</strong> or connecting
            dynamic data workflows and APIs through <strong>PHP</strong>, I ensure every single interaction
            sparks joy.
          </p>

          <h4 style={{ fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.8rem' }}>
            ⚡ My Developer Superpowers
          </h4>
          <div className="superpowers-grid">
            <div className="superpower-item">
              <div className="superpower-icon">🎨</div>
              <h4>Aesthetic Vision</h4>
              <p>Bold color palettes, neons, and polished typography.</p>
            </div>
            <div className="superpower-item">
              <div className="superpower-icon">⚡</div>
              <h4>Smooth Animations</h4>
              <p>Physics-based springs, keyframe delights, and micro-interactions.</p>
            </div>
            <div className="superpower-item">
              <div className="superpower-icon">📱</div>
              <h4>100% Responsive</h4>
              <p>Flawless mobile, tablet, and desktop viewing experiences.</p>
            </div>
            <div className="superpower-item">
              <div className="superpower-icon">🛠️</div>
              <h4>Full-Stack Fluent</h4>
              <p>Front-end React mastery paired with PHP & RESTful APIs.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Skills & Tech Stack */}
        <div className="card about-card">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Technical Proficiencies 🚀
          </h3>

          <div className="skills-category-tabs">
            {['all', 'frontend', 'backend', 'design', 'tools'].map(cat => (
              <button
                key={cat}
                className={`badge badge-bounce ${skillCategory === cat ? 'active' : ''}`}
                style={{
                  background: skillCategory === cat ? 'var(--pink-primary)' : 'var(--pink-subtle)',
                  color: skillCategory === cat ? '#ffffff' : 'var(--pink-primary)',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
                onClick={() => {
                  setSkillCategory(cat);
                  if (window.soundFx) window.soundFx.playPop(640);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="skills-bars-container">
            {filteredSkills.map(skill => (
              <div key={skill.name} className="skill-bar-item">
                <div className="skill-bar-header">
                  <span>{skill.name}</span>
                  <span className="badge" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>
                    {skill.tag} • {skill.level}%
                  </span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fun Facts Row */}
      <div className="fun-facts-row">
        <div className="card fun-fact-card">
          <div className="fun-fact-emoji">☕</div>
          <h4>Fuel Source</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Iced Matcha Latte & Pink Bubble Tea
          </p>
        </div>
        <div className="card fun-fact-card">
          <div className="fun-fact-emoji">🎧</div>
          <h4>Coding Soundtrack</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Synthwave, Lo-Fi, & Cyberpop beats
          </p>
        </div>
        <div className="card fun-fact-card">
          <div className="fun-fact-emoji">🎮</div>
          <h4>When Not Coding</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Indie gaming, 3D modeling, and motion experiments
          </p>
        </div>
        <div className="card fun-fact-card">
          <div className="fun-fact-emoji">🌟</div>
          <h4>Core Philosophy</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Make the web feel alive and fun again!
          </p>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Component: Projects Section
// -------------------------------------------------------------------
function ProjectsSection({ onViewProject, fullView = false }) {
  const [filter, setFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return INITIAL_PROJECTS;
    return INITIAL_PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <section className="projects-section container" style={{ padding: '4rem 0' }}>
      <div className="section-header">
        <span className="section-tag">Portfolio Showcase</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-desc">
          Hand-crafted interactive web applications combining React logic, PHP backends,
          custom CSS neons, and playful micro-animations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="projects-filter-bar">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'video', label: 'Video Demos' },
          { id: 'uiux', label: 'Graphic & UI/UX' },
          { id: 'php', label: 'Fullstack & Systems' },
          { id: 'react', label: 'Web & Mobile' },
          { id: 'experiments', label: 'Interactive' }
        ].map(cat => (
          <button
            key={cat.id}
            className={`btn ${filter === cat.id ? 'btn-pink' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="card project-card">
            <div className="project-image-box">
              {project.isVideo ? (
                <>
                  <div className="project-video-badge" style={{ zIndex: 2, pointerEvents: 'none' }}>VIDEO DEMO</div>
                  <video controls preload="metadata" playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#000' }} src={project.videoFile} poster={project.image}>
                    Your browser does not support the video tag.
                  </video>
                </>
              ) : (
                <>
                  <img src={project.image} alt={project.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }} onClick={() => onViewProject(project)} />
                  <div className="project-card-overlay" onClick={() => onViewProject(project)}>
                    <button
                      className="btn btn-pink"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      onClick={() => onViewProject(project)}
                    >
                      <span>View Details</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>

              <div className="project-tech-tags">
                {project.tags.map(t => (
                  <span key={t} className="badge">
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-footer-links">
                <button
                  className="btn btn-pink"
                  style={{ width: '100%', padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                  onClick={() => onViewProject(project)}
                >
                  <span>{project.isVideo ? 'Watch Video' : 'View Details'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Component: Educational Attainment Section
// -------------------------------------------------------------------
function EducationSection({ fullView = false }) {
  return (
    <section className="education-section container" style={{ padding: '4rem 0' }}>
      <div className="section-header">
        <span className="section-tag">Learning Journey</span>
        <h2 className="section-title">Educational Attainment 🎓</h2>
        <p className="section-desc">
          Academic milestones, formal degrees, and continuous self-driven specializations.
        </p>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-line"></div>

        {EDUCATION_DATA.map((item, index) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="card timeline-card">
              <div className="timeline-date">{item.period}</div>
              <h3 className="timeline-degree">{item.degree}</h3>
              <div className="timeline-institution">{item.institution}</div>
              
              {item.honors && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="badge" style={{ background: 'var(--pink-primary)', color: '#ffffff' }}>
                    🏆 {item.honors}
                  </span>
                </div>
              )}

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {item.skills.map(skill => (
                  <span key={skill} className="badge" style={{ fontSize: '0.75rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Component: Dedicated Media & Video Gallery Section
// -------------------------------------------------------------------
function GallerySection({
  mediaList,
  filter,
  onFilterChange,
  onSelectMedia,
  onAddMedia,
  fullView = false
}) {
  const [showUploader, setShowUploader] = useState(false);
  const fileInputRef = useRef(null);

  const filteredMedia = useMemo(() => {
    if (filter === 'all') return mediaList;
    if (filter === 'image') return mediaList.filter(m => m.type === 'image');
    if (filter === 'video') return mediaList.filter(m => m.type === 'video');
    return mediaList;
  }, [mediaList, filter]);

  // Handle local file upload (Live Client Preview)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newMediaItems = files.map((file, idx) => {
      const isVideo = file.type.startsWith('video/');
      const objectUrl = URL.createObjectURL(file);
      return {
        id: `user-upload-${Date.now()}-${idx}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        type: isVideo ? 'video' : 'image',
        url: objectUrl,
        poster: isVideo ? 'assets/media/sample-video-thumb.svg' : null,
        category: 'My Upload',
        desc: `Added from your local device (${(file.size / (1024 * 1024)).toFixed(2)} MB)`
      };
    });

    onAddMedia(newMediaItems);
    setShowUploader(false);
    if (window.soundFx) window.soundFx.playSuccess();
    triggerConfetti();
  };

  return (
    <section className="gallery-section container">
      <div className="section-header">
        <span className="section-tag">Visuals & Demo Reels</span>
        <h2 className="section-title">Media & Video Gallery 🎬</h2>
        <p className="section-desc">
          A dedicated showcase for high-resolution graphics, interface mockups, and video demo reels.
          You can also drop in your own photos and videos directly!
        </p>
      </div>

      {/* Action Bar */}
      <div className="gallery-action-panel">
        <div className="gallery-filters">
          {[
            { id: 'all', label: 'All Media', icon: '✨' },
            { id: 'image', label: 'Images & Mockups', icon: '🖼️' },
            { id: 'video', label: 'Video Demos & Reels', icon: '🎥' }
          ].map(btn => (
            <button
              key={btn.id}
              className={`btn ${filter === btn.id ? 'btn-pink' : 'btn-outline'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              onClick={() => {
                onFilterChange(btn.id);
                if (window.soundFx) window.soundFx.playPop(560);
              }}
            >
              <span>{btn.icon}</span>
              <span>{btn.label}</span>
            </button>
          ))}
        </div>

        <button
          className="btn btn-pink"
          style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
          onClick={() => {
            setShowUploader(!showUploader);
            if (window.soundFx) window.soundFx.playPop(700);
          }}
        >
          <span>{showUploader ? '✕ Close Uploader' : '+ Add Your Media'}</span>
        </button>
      </div>

      {/* Interactive Uploader / Dropzone */}
      {showUploader && (
        <div
          className="gallery-uploader-box"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📁</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--pink-primary)' }}>
            Select Images or Videos from Your Computer
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Supports .PNG, .JPG, .WEBP, .GIF, .MP4, and .WEBM files. They will immediately appear in the gallery!
          </p>
          <button className="btn btn-outline" style={{ pointerEvents: 'none' }}>
            <span>Browse Files</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*,video/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Media Items Grid */}
      <div className="gallery-grid">
        {filteredMedia.map(item => (
          <div
            key={item.id}
            className="gallery-item-card"
            onClick={() => {
              if (window.soundFx) window.soundFx.playChime();
              onSelectMedia(item);
            }}
          >
            <div className="gallery-media-thumb">
              {item.type === 'video' ? (
                <>
                  <img
                    src={item.poster || 'assets/media/sample-video-thumb.svg'}
                    alt={item.title}
                  />
                  <div className="gallery-type-badge">
                    <span>▶ VIDEO</span>
                  </div>
                  <div className="gallery-play-btn">
                    <span>▶</span>
                  </div>
                </>
              ) : (
                <>
                  <img src={item.url} alt={item.title} loading="lazy" />
                  <div className="gallery-type-badge">
                    <span>🖼️ IMAGE</span>
                  </div>
                </>
              )}
            </div>

            <div className="gallery-info">
              <span className="badge" style={{ fontSize: '0.72rem', marginBottom: '0.35rem' }}>
                {item.category}
              </span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Component: Media Modal (Image Lightbox & Video Player)
// -------------------------------------------------------------------
function MediaModal({ media, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">
          ✕
        </button>

        <div style={{ padding: '1.5rem', background: '#000000', textAlign: 'center' }}>
          {media.type === 'video' ? (
            <video
              controls
              autoPlay
              style={{ width: '100%', maxHeight: '65vh', borderRadius: '12px' }}
              src={media.url}
              poster={media.poster}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={media.url}
              alt={media.title}
              style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: '12px' }}
            />
          )}
        </div>

        <div style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge" style={{ background: 'var(--pink-primary)', color: '#ffffff' }}>
              {media.type.toUpperCase()}
            </span>
            <span className="badge">{media.category}</span>
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{media.title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{media.desc}</p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Component: Project Details Modal
// -------------------------------------------------------------------
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">
          ✕
        </button>

        <div style={{ maxHeight: '520px', overflow: 'hidden', background: '#0c0c12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {project.isVideo ? (
            <video controls autoPlay playsInline style={{ width: '100%', maxHeight: '480px', background: '#000' }} src={project.videoFile}>
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              style={{ maxWidth: '100%', maxHeight: '480px', objectFit: 'contain' }}
            />
          )}
        </div>

        <div style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: 'var(--pink-primary)' }}>
            {project.title}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            {project.details || project.desc}
          </p>

          <h4 style={{ fontSize: '1rem', marginBottom: '0.6rem' }}>Technologies Used:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {project.tags.map(t => (
              <span key={t} className="badge" style={{ padding: '0.4rem 0.9rem' }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-pink" onClick={onClose}>
              <span>Close Preview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Component: Contact Section
// -------------------------------------------------------------------
function ContactSection({ fullView = false }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'info', text: 'Sending your message...' });

    try {
      const response = await fetch('api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.status === 'success') {
        setStatus({ type: 'success', text: data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
        triggerConfetti();
      } else {
        setStatus({ type: 'error', text: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      // Gentle mock front-end fallback if running without PHP server
      setStatus({
        type: 'success',
        text: `Thank you ${formData.name}! Your message was successfully recorded.`
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      triggerConfetti();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section container" style={{ padding: '4rem 0' }}>
      <div className="section-header">
        <span className="section-tag">Get in Touch</span>
        <h2 className="section-title">Let's Build Something Cool 💌</h2>
        <p className="section-desc">
          Have an exciting project idea, a freelance opportunity, or just want to chat about
          React, PHP, and cute pink designs? Drop me a line!
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Info Card */}
        <div className="card contact-info-card">
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: 'var(--pink-primary)' }}>
            Connect Directly
          </h3>

          <div className="contact-method-item">
            <div className="contact-method-icon">📧</div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>EMAIL</div>
              <a
                href="mailto:irene.portfolio@example.com"
                style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}
              >
                irene.portfolio@example.com
              </a>
            </div>
          </div>

          <div className="contact-method-item">
            <div className="contact-method-icon">📍</div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>LOCATION</div>
              <div style={{ fontWeight: 600 }}>Available Worldwide • Remote Friendly</div>
            </div>
          </div>

          <div className="contact-method-item">
            <div className="contact-method-icon">⚡</div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AVAILABILITY</div>
              <div style={{ fontWeight: 600, color: '#22c55e' }}>● Open for freelance & full-time</div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.8rem' }}>Social Networks</h4>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['GitHub', 'LinkedIn', 'Twitter/X', 'Discord'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="btn btn-outline"
                  style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Alex Mercer"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="alex@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                placeholder="Project Inquiry / Hello"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Message</label>
              <textarea
                required
                className="form-textarea"
                placeholder="Tell me about your project or idea..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            {status.text && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  background: status.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 45, 117, 0.15)',
                  border: `1px solid ${status.type === 'success' ? '#22c55e' : 'var(--pink-primary)'}`,
                  color: status.type === 'success' ? '#22c55e' : 'var(--pink-primary)'
                }}
              >
                {status.text}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-pink"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <span>{submitting ? 'Sending...' : 'Send Message ✨'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Component: Footer
// -------------------------------------------------------------------
function Footer({ onNavClick }) {
  return (
    <footer className="footer container">
      <div className="footer-socials">
        <a href="#home" className="btn-icon" onClick={() => onNavClick('home')}>
          <span>⚡</span>
        </a>
        <a href="#about" className="btn-icon" onClick={() => onNavClick('about')}>
          <span>🌸</span>
        </a>
        <a href="#projects" className="btn-icon" onClick={() => onNavClick('projects')}>
          <span>💻</span>
        </a>
        <a href="#gallery" className="btn-icon" onClick={() => onNavClick('gallery')}>
          <span>🎬</span>
        </a>
      </div>

      <p style={{ marginBottom: '0.5rem' }}>
        Designed & Coded with <span style={{ color: 'var(--pink-primary)' }}>💖</span> by <strong>Irene</strong>
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        React 18 • PHP 8 • Modern CSS3 • HTML5 • Web Audio API
      </p>
    </footer>
  );
}

// Mount the React Application
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<PortfolioApp />);
}

