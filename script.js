document.addEventListener('DOMContentLoaded', () => {
    
    // --- SRI LANKAN AUTOMATED EVENT TRACKER (Database Alternative for GitHub) ---
    // JavaScript dates format: 'YYYY-MM-DD'
    const sriLankanEvents = [
        {
            name: "BMICH Expo Logistics Fair",
            date: "2026-06-21", 
            location: "BMICH, Colombo",
            bannerId: "YOUR_DRIVE_IMAGE_ID_1"
        },
        {
            name: "Kandy Trade Industrial Summit",
            date: "2026-07-10",
            location: "Kandy City Centre",
            bannerId: "YOUR_DRIVE_IMAGE_ID_2"
        },
        {
            name: "Galle Modern Architecture Pavilion",
            date: "2026-08-02",
            location: "Galle International Stadium Complex",
            bannerId: "YOUR_DRIVE_IMAGE_ID_3"
        }
    ];

    function runEventScheduler() {
        const adBar = document.getElementById('adBar');
        const adText = document.querySelector('.ad-text-overlay span');
        const adImage = document.querySelector('.ad-banner-img');
        
        if (!adBar || !adText) return;

        // Fetch current system timestamp (Normalized to midnight to avoid hour differences)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Target timeframe parameters: Event is active if it starts within 7 days
        const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        
        let activeEvent = null;

        for (let event of sriLankanEvents) {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            const timeDifference = eventDate - today;

            // Check if the event is today, or in the future within the 7-day target range
            if (timeDifference >= 0 && timeDifference <= oneWeekInMilliseconds) {
                activeEvent = event;
                break; // Prioritizes the earliest chronological matching event
            }
        }

        // Apply visual updates based on current event queue state
        if (activeEvent) {
            // Format the display date nicely
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedDate = new Date(activeEvent.date).toLocaleDateString('en-US', options);
            
            // Inject dynamic localized text string 
            adText.innerHTML = `🔥 Upcoming Event: <strong>${activeEvent.name}</strong> on <strong>${formattedDate}</strong> at <strong>${activeEvent.location}, Sri Lanka</strong>!`;
            
            // Swap banner background if configuration contains an asset ID
            if(activeEvent.bannerId && activeEvent.bannerId !== "YOUR_DRIVE_IMAGE_ID_1") {
                adImage.src = `https://docs.google.com/uc?export=view&id=${activeEvent.bannerId}`;
            }
            adBar.style.display = 'flex';
        } else {
            // Standard fallback configuration message if no live event falls within a 7-day alert window
            adText.innerHTML = `🔥 Premium Exhibition Stalls & Construction Blueprints by SC Creations. Contact us today!`;
        }
        
        // Maintain architectural balance of the fixed floating header fascia
        adjustHeaderPosition();
    }

    // --- Dynamic Advertisement Bar Adjustment Engine ---
    const adBar = document.getElementById('adBar');
    const closeAdBtn = document.getElementById('closeAd');
    const headerElement = document.querySelector('header');

    function adjustHeaderPosition() {
        if (adBar && adBar.style.display !== 'none' && adBar.offsetHeight > 0) {
            const adHeight = adBar.offsetHeight;
            headerElement.style.top = `${adHeight}px`;
        } else {
            headerElement.style.top = '0px';
        }
    }

    // Run scheduling checks instantly on execution pass
    runEventScheduler();

    closeAdBtn.addEventListener('click', () => {
        adBar.style.maxHeight = '0px';
        adBar.style.padding = '0px';
        setTimeout(() => {
            adBar.style.display = 'none';
            adjustHeaderPosition();
        }, 400); 
    });

    window.addEventListener('resize', adjustHeaderPosition);

    // --- Hero Portrait Video Sound Control Feature ---
    const video = document.getElementById('heroVideo');
    const muteBtn = document.getElementById('muteBtn');

    if (video && muteBtn) {
        muteBtn.addEventListener('click', () => {
            const muteIcon = muteBtn.querySelector('i');
            if (video.muted) {
                video.muted = false;
                muteIcon.className = 'fas fa-volume-up';
                muteBtn.classList.add('unmuted');
            } else {
                video.muted = true;
                muteIcon.className = 'fas fa-volume-mute';
                muteBtn.classList.remove('unmuted');
            }
        });
    }

    // --- Dark / Light Mode Toggle Logic ---
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;

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

    // --- Mobile Navigation Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

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

    // --- Form Reset Trigger Feature ---
    const contactForm = document.getElementById('contactForm');
    const clearBtn = document.querySelector('.btn-clear');

    if(clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactForm.reset();
        });
    }
});