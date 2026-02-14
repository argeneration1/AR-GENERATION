document.addEventListener('DOMContentLoaded', () => {
    // STATE
    let isSidebarOpen = true;
    let activePage = 'Home';
    let theme = localStorage.getItem('theme') || 'default';
    let showThemeOptions = false;

    // DOM ELEMENTS
    const appContainer = document.getElementById('app-container');
    const sidebar = document.getElementById('sidebar');
    const menuToggleButton = document.getElementById('menu-toggle-button');
    const menuTitle = document.getElementById('menu-title');
    const mainContent = document.getElementById('main-content');
    const navItems = document.querySelectorAll('.nav-item');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeOptionsContainer = document.getElementById('theme-options');
    const themeOptionButtons = document.querySelectorAll('.theme-option-button');

    // --- TEMPLATES for Pages ---
    const getHomePageTemplate = () => `
        <div class="animate-slide-in-up">
            <section class="home-hero-card neu-card-outer">
                <div>
                    <h1>Welcome to AR Generation</h1>
                    <p>Menggabungkan logika seorang programmer, imajinasi seorang 3D artist, dan jiwa seorang kreator visual. 
                    Dari mengembangkan game interaktif hingga menghasilkan foto dan video yang bercerita, 
                    saya menghadirkan karya yang seimbang antara teknologi dan seni.</p>
                    <button class="neu-button" data-page-link="Profile">Explore Portfolio</button>
                </div>
                <div class="profile-image-container">
                    <img src="image/ar.jpg" alt="Profile Portrait"/>
                </div>
            </section>
            <section>
                <h2 class="section-title animate-slide-in-up" style="animation-delay: 100ms;">Latest Insights & Creations</h2>
                <div class="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-8">
                    <div class="post-card neu-card-outer animate-slide-in-up" style="animation-delay: 200ms;">
                        <svg class="post-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 15"></path></svg>
                        <h3>Modern Web Development</h3>
                        <p>Exploring the latest trends in web technologies, from server components to edge functions.</p>
                        <div class="tags-container">
                            <span class="tag">React</span><span class="tag">Next.js</span><span class="tag">Tailwind CSS</span><span class="tag">Vercel</span>
                        </div>
                    </div>
                     <div class="post-card neu-card-outer animate-slide-in-up" style="animation-delay: 300ms;">
                        <svg class="post-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25L3 12.75m18 0-9 5.25L3 18m15-9-9 5.25L3 7.5"></path></svg>
                        <h3>The World of 3D Design</h3>
                        <p>A deep dive into creating stunning visuals and assets for games and animations.</p>
                        <div class="tags-container">
                            <span class="tag">Blender</span><span class="tag">Maya</span><span class="tag">ZBrush</span><span class="tag">Substance</span>
                        </div>
                    </div>
                     <div class="post-card neu-card-outer animate-slide-in-up" style="animation-delay: 400ms;">
                        <svg class="post-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"></path></svg>
                        <h3>Building Interactive Experiences</h3>
                        <p>Developing immersive games and virtual spaces on modern social gaming platforms.</p>
                        <div class="tags-container">
                             <span class="tag">Zepeto</span><span class="tag">Roblox</span><span class="tag">Unity</span><span class="tag">C#</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;

    const getProfilePageTemplate = () => `
        <div class="animate-slide-in-up">
            <header class="profile-header-card neu-card-outer">
                <div class="profile-image-container">
                     <img src="image/ar.jpg" alt="Profile Portrait"/>
                </div>
                <div>
                    <h1 class="page-title">AR Generation</h1>
                    <p class="job-title">3D Artist, Programer, World Game Developer, Videografer, Photografer</p>
                    <p class="bio">Seorang profesional kreatif dengan perhatian pada detail dan semangat untuk menghidupkan ide. Dari kode pemrograman yang rapi, desain 3D yang imersif, hingga pengalaman game yang interaktif. 
                    Juga melalui fotografi, videografi, dan desain grafis yang memikat, saya menghadirkan karya yang menyatukan teknologi dan seni.</p>
                    <div class="social-links">
                        <a href="#" class="social-link neu-button"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg></a>
                        <a href="#" class="social-link neu-button"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a>
                    </div>
                </div>
            </header>
            <div class="space-y-16">
                 <section class="skills-list neu-card-inner animate-slide-in-up" style="animation-delay: 100ms;">
                    <h2 class="section-title">Skills & Expertise</h2>
                    <div>
                        <h3>3D Design</h3>
                        <div class="tags-container"><span class="skill-tag">Blender</span><span class="skill-tag">Maya</span><span class="skill-tag">Photoshop</span><span class="skill-tag">Unity</span><span class="skill-tag">3ds Max</span></div>
                        <h3>Frontend Development</h3>
                        <div class="tags-container"><span class="skill-tag">React</span><span class="skill-tag">TypeScript</span><span class="skill-tag">Tailwind CSS</span><span class="skill-tag">Next.js</span><span class="skill-tag">Vue.js</span><span class="skill-tag">Redux</span></div>
                        <h3>Backend Development</h3>
                        <div class="tags-container"><span class="skill-tag">Node.js</span><span class="skill-tag">Express</span><span class="skill-tag">Python</span><span class="skill-tag">Django</span><span class="skill-tag">PostgreSQL</span><span class="skill-tag">MongoDB</span></div>
                        <h3>Tools & Workflow</h3>
                        <div class="tags-container"><span class="skill-tag">Git</span><span class="skill-tag">Docker</span><span class="skill-tag">Figma</span><span class="skill-tag">Jira</span><span class="skill-tag">Agile Methodologies</span></div>
                    </div>
                </section>
                <section>
                    <h2 class="section-title animate-slide-in-up" style="animation-delay: 200ms;">Featured Projects</h2>
                    <div class="grid grid-cols-1 lg-grid-cols-3 gap-8">
                        <div class="portfolio-item neu-card-outer animate-slide-in-up" style="animation-delay: 300ms;">
                            <img src="https://images.unsplash.com/photo-1558346547-4439467bd1d5?q=80&w=800&auto=format&fit=crop" alt="Sci-Fi Rover Project"/>
                            <div class="portfolio-item-content">
                                <h3>Sci-Fi Rover "Nomad"</h3><p class="bio">A game-ready, low-poly 3D model of a futuristic exploration vehicle. Modeled in Blender, textured in Substance Painter.</p>
                                <div class="tags-container"><span class="tag">3D Modeling</span><span class="tag">Texturing</span><span class="tag">Game Art</span></div>
                            </div>
                        </div>
                        <div class="portfolio-item neu-card-outer animate-slide-in-up" style="animation-delay: 400ms;">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Project Management Dashboard"/>
                            <div class="portfolio-item-content">
                                <h3>Project Management Dashboard</h3><p class="bio">A full-stack web application for team collaboration, built with React and Node.js, featuring a clean, neumorphic UI.</p>
                                <div class="tags-container"><span class="tag">React</span><span class="tag">Node.js</span><span class="tag">Tailwind CSS</span><span class="tag">Full-Stack</span></div>
                            </div>
                        </div>
                        <div class="portfolio-item neu-card-outer animate-slide-in-up" style="animation-delay: 500ms;">
                            <img src="https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=800&auto=format&fit=crop" alt="Character Concept Art"/>
                            <div class="portfolio-item-content">
                                <h3>Character Concept Art</h3><p class="bio">A stylized 3D character sculpt created in ZBrush, designed for an animated short film project.</p>
                                <div class="tags-container"><span class="tag">ZBrush</span><span class="tag">Character Design</span><span class="tag">3D Sculpting</span></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;

    const getAppsPageTemplate = () => `
        <div class="animate-slide-in-up">
            <header class="page-header">
                <h1 class="page-title">My Applications & Projects</h1>
                <p class="page-subtitle">A collection of apps I've built, showcasing my skills in mobile and AR development.</p>
            </header>
            <section class="grid grid-cols-1 lg-grid-cols-2 xl-grid-cols-3 gap-10">
                <div class="app-card neu-card-outer animate-slide-in-up" style="animation-delay: 100ms;">
                     <img src="image/arcat.jpg" alt="AR Chat Assistant"/>
                     <div class="portfolio-item-content">
                        <h3>AR Chat Assistant</h3>
                        <p class="bio">AR Chat Assistant adalah asisten AI yang bisa membantu berbagai hal. Fungsinya mirip asisten digital serbaguna, seperti
Menjawab pertanyaan apa pun,Menulis draf email atau artikel,Merencanakan sesuatu, seperti liburan, Berinteraksi dengan berbagai format, seperti teks, gambar, dan kode.</p>
                        <div class="tags-container"><span class="tag">ARKit</span><span class="tag">SwiftUI</span><span class="tag">AI</span><span class="tag">iOS</span></div>
                        <div class="app-buttons">
                            <a href="#" class="neu-button app-button"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>Live Demo</a>
                            <a href="#" class="neu-button app-button"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>Source Code</a>
                        </div>
                     </div>
                </div>
                <div class="app-card neu-card-outer animate-slide-in-up" style="animation-delay: 200ms;">
                     <img src="image/getcar.jpg" alt="Car Rental Platform"/>
                     <div class="portfolio-item-content">
                        <h3>GeTCar Manokwari</h3>
                        <p class="bio">Aplikasi seluler lintas platform untuk mencari dan menyewa mobil. Menampilkan ketersediaan waktu nyata, pembayaran aman, dan ulasan pengguna. Dibangun dengan React Native.</p>
                        <div class="tags-container"><span class="tag">React Native</span><span class="tag">Firebase</span><span class="tag">Android</span><span class="tag">iOS</span></div>
                        <div class="app-buttons">
                            <a href="#" class="neu-button app-button"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>Live Demo</a>
                            <a href="#" class="neu-button app-button"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>Source Code</a>
                        </div>
                     </div>
                </div>
                <div class="app-card neu-card-outer animate-slide-in-up" style="animation-delay: 300ms;">
                     <img src="image/conver.jpg" alt="Number Conversion App"/>
                     <div class="portfolio-item-content">
                        <h3>Conversi Bilangan</h3>
                        <p class="bio">Utilitas Android yang praktis bagi pengembang dan pelajar untuk mengonversi angka antara sistem biner, oktal, desimal, dan heksadesimal dengan antarmuka yang bersih dan intuitif.</p>
                        <div class="tags-container"><span class="tag">Android</span><span class="tag">Kotlin</span><span class="tag">Jetpack Compose</span></div>
                        <div class="app-buttons">
                            <a href="#" class="neu-button app-button"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>Live Demo</a>
                            <a href="#" class="neu-button app-button"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>Source Code</a>
                        </div>
                     </div>
                </div>
            </section>
        </div>
    `;
    
    const getMessagesPageTemplate = () => `
        <div class="contact-form animate-slide-in-up">
            <header class="page-header">
                <h1 class="page-title">Get In Touch</h1>
                <p class="page-subtitle">Punya pertanyaan atau punya proyek? Jangan ragu untuk mengirimi saya pesan.</p>
            </header>
            <form id="contact-form" class="neu-card-outer animate-slide-in-up" style="animation-delay: 100ms;">
                <div class="form-grid">
                    <input type="text" name="name" placeholder="Full Name" required class="form-input"/>
                    <input type="email" name="email" placeholder="Email Address" required class="form-input"/>
                </div>
                <div><input type="text" name="subject" placeholder="Subject" required class="form-input"/></div>
                <div><textarea name="message" placeholder="Your Message..." required rows="6" class="form-textarea"></textarea></div>
                <div class="form-grid" style="gap: 1.5rem; grid-template-columns: 1fr; align-items: center;">
                    <label for="file-upload" class="file-upload-label neu-card-inner">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3.375 3.375 0 0 1 19.5 7.499l-9.546 9.546a1.125 1.125 0 0 1-1.591-1.591L18 9.75"></path></svg>
                        <span>Attach a file (Image, PDF, etc.)</span>
                    </label>
                    <input id="file-upload" type="file" class="sr-only"/>
                </div>
                 <div class="form-footer">
                    <p id="form-status" class="form-status"></p>
                    <button type="submit" class="neu-button">Send Message</button>
                </div>
            </form>
        </div>
    `;


    const pageTemplates = {
        Home: getHomePageTemplate,
        Profile: getProfilePageTemplate,
        Apps: getAppsPageTemplate,
        Messages: getMessagesPageTemplate,
    };

    // --- RENDER FUNCTIONS ---
    const renderPageContent = () => {
        mainContent.innerHTML = pageTemplates[activePage]();
        applyThemeToAllElements();
        attachMainContentEventListeners();
    };
    
    const applyThemeToAllElements = () => {
        const themeClass = `theme-${theme}`;
        document.documentElement.classList.toggle('dark', theme !== 'default');

        appContainer.className = 'flex h-screen bg-light-bg text-slate-800 font-sans'; // Reset
        if(theme !== 'default') appContainer.classList.add(themeClass);

        const elementsToTheme = document.querySelectorAll('#sidebar, .menu-button, .nav-item, .neu-card-outer, .neu-card-inner, .neu-button, .form-input, .form-textarea, .profile-image-container, #theme-options, .skill-tag, .social-link, .theme-option-button');
        elementsToTheme.forEach(el => {
            el.classList.remove('theme-default', 'theme-navy', 'theme-gray');
            el.classList.add(themeClass);
        });
    };

    const updateSidebarView = () => {
        sidebar.classList.toggle('open', isSidebarOpen);
        sidebar.classList.toggle('closed', !isSidebarOpen);
    };

    const updateActiveNav = () => {
        navItems.forEach(item => {
            const page = item.dataset.page;
            if (page) {
                item.classList.toggle('active', page === activePage);
            }
        });
    };
    
    const updateThemeOptionsView = () => {
        themeOptionsContainer.classList.toggle('visible', showThemeOptions);
        themeOptionButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.theme === theme);
        });
    };
    
    const attachMainContentEventListeners = () => {
        const portfolioButton = mainContent.querySelector('[data-page-link="Profile"]');
        if (portfolioButton) {
            portfolioButton.addEventListener('click', () => setActivePage('Profile'));
        }

        const contactForm = mainContent.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
    };

    // --- STATE SETTERS ---
    const setTheme = (newTheme) => {
        if (theme === newTheme) return;
        theme = newTheme;
        localStorage.setItem('theme', newTheme);
        showThemeOptions = false; // Close menu on selection
        applyThemeToAllElements();
        updateThemeOptionsView();
    };

    const setActivePage = (newPage) => {
        if (activePage === newPage) return;
        activePage = newPage;
        renderPageContent();
        updateActiveNav();
    };

    const toggleSidebar = () => {
        isSidebarOpen = !isSidebarOpen;
        if (!isSidebarOpen) {
            showThemeOptions = false; 
            updateThemeOptionsView();
        }
        updateSidebarView();
    };

    const toggleThemeOptions = () => {
        showThemeOptions = !showThemeOptions;
        updateThemeOptionsView();
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const button = form.querySelector('button[type="submit"]');
        const statusEl = form.querySelector('#form-status');
        
        button.disabled = true;
        button.textContent = 'Sending...';
        statusEl.textContent = '';
        
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2;
            if(isSuccess) {
                statusEl.textContent = 'Message sent!';
                statusEl.className = 'form-status success';
                form.reset();
            } else {
                statusEl.textContent = 'Failed to send.';
                statusEl.className = 'form-status error';
            }
            button.disabled = false;
            button.textContent = 'Send Message';

            setTimeout(() => {
                statusEl.textContent = '';
            }, 3000);

        }, 1500);
    };

    // --- EVENT LISTENERS ---
    menuToggleButton.addEventListener('click', toggleSidebar);

    navItems.forEach(item => {
        if (item.dataset.page) {
            item.addEventListener('click', () => setActivePage(item.dataset.page));
        }
    });

    themeToggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleThemeOptions();
    });

    themeOptionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            setTheme(button.dataset.theme);
        });
    });

    // Close theme options if clicking outside
    document.addEventListener('click', (e) => {
        if (showThemeOptions && !themeOptionsContainer.contains(e.target) && !themeToggleButton.contains(e.target)) {
            showThemeOptions = false;
            updateThemeOptionsView();
        }
    });

    // --- INITIALIZATION ---
    const init = () => {
        applyThemeToAllElements();
        updateSidebarView();
        renderPageContent(); // Render content for the initial page state
        updateActiveNav();   // Set the initial active nav item
    };

    init();
});