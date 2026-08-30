document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Announcement Bar Header Position Control ---
    const adBar = document.getElementById('adBar');
    const closeAdBtn = document.getElementById('closeAd');
    const headerElement = document.querySelector('header');

    // Header එක Announcement Bar එකට යටින් තියන්න Height එක calculate කරන Function එක
    function adjustHeaderPosition() {
        if (adBar && adBar.style.display !== 'none' && adBar.offsetHeight > 0) {
            const adHeight = adBar.offsetHeight;
            headerElement.style.top = `${adHeight}px`;
        } else {
            headerElement.style.top = '0px';
        }
    }

    // Page එක Load වෙද්දි සහ Resize වෙද්දි Header Position එක හදනවා
    adjustHeaderPosition();
    window.addEventListener('resize', adjustHeaderPosition);

    // Close Button එක එබුවම Ad Bar එක අයින් කරලා Header එක උඩට ගන්නවා
    if (closeAdBtn) {
        closeAdBtn.addEventListener('click', () => {
            adBar.style.display = 'none';
            adjustHeaderPosition();
        });
    }

    // --- EXHIBITION SHOWCASE EVENTS SELECTION LOGIC ---
    const exhibitionShows = [
        "ProFood",
        "Hotel Show",
        "Sancharaka Udawa",
        "EduExpo",
        "International Book Fair",
        "Techno",
        "Inco",
        "Colombo Motor Show",
        "Architect",
        "JITF",
        "BITF",
        "YIBF",
        "Hotel Asia & Culinary Challenge"
    ];

    const filterBtns = document.querySelectorAll('.filter-btn');
    const subEventsContainer = document.getElementById('subEventsContainer');
    const subEventsList = document.getElementById('subEventsList');
    const yearHeader = document.getElementById('yearHeader');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const year = btn.getAttribute('data-year');
            
            if (year === 'previous') {
                subEventsContainer.style.display = 'none';
                subEventsList.innerHTML = '';
            } else {
                yearHeader.textContent = `${year} Exhibitions & Expos`;
                subEventsList.innerHTML = '';

                exhibitionShows.forEach(show => {
                    const showBtn = document.createElement('button');
                    showBtn.className = 'btn-see-more';
                    showBtn.style.padding = '6px 14px';
                    showBtn.style.fontSize = '0.85rem';
                    showBtn.textContent = show;
                    
                    showBtn.addEventListener('click', () => {
                        alert(`Filtering showcase for ${show} (${year})`);
                    });

                    subEventsList.appendChild(showBtn);
                });

                subEventsContainer.style.display = 'block';
            }
        });
    });

    // --- Dark / Light Mode Toggle Logic ---
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            let newTheme = 'dark';

            if (currentTheme === 'dark') {
                newTheme = 'light';
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                newTheme = 'dark';
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }

            htmlElement.setAttribute('data-theme', newTheme);
        });
    }

    // --- Mobile Navigation Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }

    // --- Form Reset Trigger Feature ---
    const contactForm = document.getElementById('contactForm');
    const clearBtn = document.querySelector('.btn-clear');

    if (clearBtn && contactForm) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactForm.reset();
        });
    }

    // --- EXHIBITION SHOWCASE VIDEO GALLERY CONTROLS ---
    // --- EXHIBITION SHOWCASE VIDEO GALLERY CONTROLS ---
    function initGalleryVideos() {
        const videoCards = document.querySelectorAll('.gallery-item.video-item');

        videoCards.forEach(card => {
            const iframe = card.querySelector('iframe');
            const soundBtn = card.querySelector('.sound-btn');
            const playBtn = card.querySelector('.play-btn');

            let isMuted = true;
            let isPlaying = true;

            if (iframe) {
                const videoUrl = new URL(iframe.src);
                videoUrl.searchParams.set('autoplay', '1');
                videoUrl.searchParams.set('mute', '1');
                iframe.src = videoUrl.toString();
            }

            if (soundBtn) {
                soundBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    isMuted = !isMuted;

                    if (!isMuted) {
                        // Mute all other cards
                        document.querySelectorAll('.gallery-item.video-item .sound-btn').forEach(btn => {
                            if (btn !== soundBtn && btn.classList.contains('unmuted')) {
                                btn.click();
                            }
                        });

                        soundBtn.classList.add('unmuted');
                        const icon = soundBtn.querySelector('i');
                        if (icon) icon.className = 'fas fa-volume-high';
                        soundBtn.setAttribute('title', 'Mute Sound');

                        if (iframe && iframe.src && !iframe.src.includes('YOUR_FACEBOOK_VIDEO_URL')) {
                            let src = iframe.src;
                            if (src.includes('mute=1')) {
                                iframe.src = src.replace('mute=1', 'mute=0');
                            } else if (!src.includes('mute=0')) {
                                const sep = src.includes('?') ? '&' : '?';
                                iframe.src = `${src}${sep}mute=0`;
                            }
                        }
                    } else {
                        soundBtn.classList.remove('unmuted');
                        const icon = soundBtn.querySelector('i');
                        if (icon) icon.className = 'fas fa-volume-xmark';
                        soundBtn.setAttribute('title', 'Turn Sound On');

                        if (iframe && iframe.src && !iframe.src.includes('YOUR_FACEBOOK_VIDEO_URL')) {
                            let src = iframe.src;
                            if (src.includes('mute=0')) {
                                iframe.src = src.replace('mute=0', 'mute=1');
                            } else if (!src.includes('mute=1')) {
                                const sep = src.includes('?') ? '&' : '?';
                                iframe.src = `${src}${sep}mute=1`;
                            }
                        }
                    }
                });
            }

            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    isPlaying = !isPlaying;

                    if (isPlaying) {
                        card.classList.remove('is-paused');
                        const icon = playBtn.querySelector('i');
                        if (icon) icon.className = 'fas fa-pause';
                        playBtn.setAttribute('title', 'Pause Video');

                        if (iframe && iframe.src && !iframe.src.includes('YOUR_FACEBOOK_VIDEO_URL')) {
                            iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1').replace('autoplay=false', 'autoplay=true');
                        }
                    } else {
                        card.classList.add('is-paused');
                        const icon = playBtn.querySelector('i');
                        if (icon) icon.className = 'fas fa-play';
                        playBtn.setAttribute('title', 'Play Video');

                        if (iframe && iframe.src && !iframe.src.includes('YOUR_FACEBOOK_VIDEO_URL')) {
                            iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0').replace('autoplay=true', 'autoplay=false');
                        }
                    }
                });
            }
        });
    }

    initGalleryVideos();
});