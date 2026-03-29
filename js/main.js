// Particles (Floating Hearts)
function createHearts() {
    const container = document.getElementById('hearts-container');
    const numHearts = 30; // Amount of parallel hearts

    for(let i=0; i<numHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Randomize position, size and duration
            const left = Math.random() * 100;
            const size = Math.random() * 15 + 10;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;

            heart.style.left = `${left}vw`;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;

            // Adjust Pseudo Elements logic via scale
            heart.style.transform = `rotate(-45deg) scale(${size/20})`;

            container.appendChild(heart);

            // Recycle heart
            setInterval(() => {
                heart.style.left = `${Math.random() * 100}vw`;
            }, duration * 1000);

        }, i * 300);
    }
}

// Fade In On Scroll Observer
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
}

// Anniversary Counter Logic
function initCounter() {
    // namoro started on Oct 31, 2025. Wait, or is it relative to exactly 5 months ago?
    // "dia que começamos a namorar dia 31 de outubro", 5 months = March 31.
    // Let's create a date for Oct 31, 2025
    const startDate = new Date('2025-10-31T00:00:00');
    
    function updateCounter() {
        const now = new Date();
        const diffTimer = now - startDate;

        if (diffTimer < 0) return; // if in the past?

        // Approx months calculation
        const pastDate = new Date(startDate);
        let months = (now.getFullYear() - pastDate.getFullYear()) * 12 + (now.getMonth() - pastDate.getMonth());
        
        // Adjust for days
        const tempDate = new Date(pastDate);
        tempDate.setMonth(tempDate.getMonth() + months);
        if (now < tempDate) {
            months--;
            tempDate.setMonth(tempDate.getMonth() - 1);
        }

        const diffTimeAfterMonths = now - tempDate;
        
        const days = Math.floor(diffTimeAfterMonths / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTimeAfterMonths % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        document.getElementById('months').innerText = months;
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = ساعات;
    }

    try{
        updateCounter();
        setInterval(updateCounter, 1000 * 60 * 60); // update every hour to save processing
    } catch(e){
        document.getElementById('months').innerText = '5'; // fallback 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    initScrollObserver();
    
    // Fix: We can just hardcode "5" if we want, or use simple math. Let's rely on simple math.
    // Fixed 'sاعات' typo from autocomplete
    const startDate = new Date('2025-10-31T00:00:00');
    function updateCounterSafe() {
        const now = new Date();
        let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
        
        const tempDate = new Date(startDate);
        tempDate.setMonth(tempDate.getMonth() + months);
        if (now < tempDate) {
            months--;
            tempDate.setMonth(tempDate.getMonth() - 1);
        }

        const diffTime = now - tempDate;
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        document.getElementById('months').innerText = months < 0 ? 0 : months;
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
    }
    
    updateCounterSafe();
    setInterval(updateCounterSafe, 3600000);
});

// Confetti Utility (very simple)
function spawnConfetti() {
    const colors = ['#ff6b9d', '#ffd700', '#fff', '#8a2be2'];
    for(let i=0; i<100; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.width = '10px';
        conf.style.height = '10px';
        conf.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        conf.style.top = '-10px';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.zIndex = 9999;
        
        // Random tilt & size
        conf.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(conf);

        const duration = Math.random() * 3 + 2;
        
        conf.animate([
            { transform: `translateY(0) rotate(0)`, opacity: 1 },
            { transform: `translateY(100vh) rotate(${500 + Math.random()*500}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(.25,.1,.25,1)'
        });

        setTimeout(() => {
            conf.remove();
        }, duration*1000);
    }
}
window.spawnConfetti = spawnConfetti;
