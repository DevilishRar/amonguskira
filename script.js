
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();


document.querySelectorAll('a, .social-card, .meme-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorTrail.style.transform = 'scale(2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorTrail.style.transform = 'scale(1)';
    });
});


function triggerLightning() {
    const lightning = document.querySelector('.lightning');
    lightning.classList.add('flash');
    
    setTimeout(() => {
        lightning.classList.remove('flash');
    }, 300);
}


setInterval(() => {
    if (Math.random() > 0.7) {
        triggerLightning();
    }
}, 8000);


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        const speed = 0.5 + (index * 0.2);
        page.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});


let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateKiraMode();
    }
});

function activateKiraMode() {
    
    const body = document.body;
    body.style.animation = 'none';
    
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            triggerLightning();
        }, i * 200);
    }
    
    
    setTimeout(() => {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(139, 0, 0, 0.95);
            color: #f4f1e8;
            padding: 40px 60px;
            font-family: 'Creepster', cursive;
            font-size: 3rem;
            text-align: center;
            z-index: 10000;
            border: 3px solid #DC143C;
            box-shadow: 0 0 50px rgba(139, 0, 0, 0.8);
            animation: glitch 0.5s infinite;
        `;
        message.innerHTML = '計画通り<br><span style="font-size: 1.5rem;">Just as planned</span>';
        body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }, 1000);
}


const deathNoteRules = document.querySelectorAll('.rule-item p');
let currentRule = 0;

function typeWriteRules() {
    if (currentRule < deathNoteRules.length) {
        const rule = deathNoteRules[currentRule];
        const text = rule.textContent;
        rule.textContent = '';
        rule.style.opacity = '1';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                rule.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
                currentRule++;
                setTimeout(typeWriteRules, 500);
            }
        }, 30);
    }
}


const rulesSection = document.querySelector('.rules-section');
if (rulesSection) {
    const rulesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentRule === 0) {
                setTimeout(typeWriteRules, 500);
            }
        });
    }, { threshold: 0.3 });
    
    rulesObserver.observe(rulesSection);
}


const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', () => {
        glitchTitle.style.animation = 'glitch 0.3s infinite';
    });
    
    glitchTitle.addEventListener('mouseleave', () => {
        glitchTitle.style.animation = 'glitch 3s infinite';
    });
}


document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(139, 0, 0, 0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


const ryukApple = document.querySelector('.ryuk-apple');
if (ryukApple) {
    ryukApple.addEventListener('click', () => {
        const laughs = ['Hyuk hyuk hyuk!', 'Humans are so interesting!', 'I want an apple!', 'This is amusing!'];
        const randomLaugh = laughs[Math.floor(Math.random() * laughs.length)];
        
        const laughBubble = document.createElement('div');
        laughBubble.textContent = randomLaugh;
        laughBubble.style.cssText = `
            position: fixed;
            bottom: 150px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(75, 0, 130, 0.9);
            color: #f4f1e8;
            padding: 15px 30px;
            border-radius: 20px;
            font-family: 'Special Elite', cursive;
            font-size: 1.2rem;
            z-index: 10000;
            animation: fadeInOut 2s ease-in-out;
            border: 2px solid #FFD700;
            box-shadow: 0 0 20px rgba(75, 0, 130, 0.8);
        `;
        
        document.body.appendChild(laughBubble);
        
        setTimeout(() => {
            laughBubble.remove();
        }, 2000);
    });
}


const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(fadeStyle);


document.querySelectorAll('.meme-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'translateY(-5px) rotate(0deg) scale(1.05)';
        
        setTimeout(() => {
            card.style.transform = 'translateY(-5px) rotate(2deg)';
        }, 200);
    });
});


let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        
        if (Math.random() > 0.95) {
            createBloodDrip();
        }
    }
    
    lastScrollTop = scrollTop;
});

function createBloodDrip() {
    const drip = document.createElement('div');
    drip.style.cssText = `
        position: fixed;
        top: 0;
        left: ${Math.random() * 100}%;
        width: 2px;
        height: 0;
        background: linear-gradient(180deg, transparent, #8B0000);
        z-index: 9997;
        pointer-events: none;
        animation: drip 2s ease-in forwards;
    `;
    
    document.body.appendChild(drip);
    
    setTimeout(() => {
        drip.remove();
    }, 2000);
}


const dripStyle = document.createElement('style');
dripStyle.textContent = `
    @keyframes drip {
        to {
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(dripStyle);


window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    
    setTimeout(() => {
        hero.style.transition = 'opacity 1.5s ease-in';
        hero.style.opacity = '1';
        triggerLightning();
    }, 100);
});


let titleClicks = 0;
if (glitchTitle) {
    glitchTitle.addEventListener('click', () => {
        titleClicks++;
        
        if (titleClicks === 5) {
            const names = document.createElement('div');
            names.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 10, 0.95);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family: 'Special Elite', cursive;
                color: #8B0000;
                font-size: 2rem;
                animation: fadeIn 1s ease-in;
            `;
            
            names.innerHTML = `
                <div style="text-align: center; line-height: 2;">
                    <p style="font-size: 3rem; color: #DC143C; text-shadow: 0 0 20px #DC143C;">DEATH NOTE</p>
                    <p>Red was not The Impostor</p>
                    <p>Blue was not The Impostor</p>
                    <p>Green was not The Impostor</p>
                    <p style="margin-top: 40px; font-size: 2.5rem; color: #FFD700;">Amongus Kira was The Impostor</p>
                    <p style="font-size: 1.2rem; margin-top: 20px; color: #f4f1e8; cursor: pointer;" onclick="this.parentElement.parentElement.remove()">
                        Click to close
                    </p>
                </div>
            `;
            
            document.body.appendChild(names);
            titleClicks = 0;
        }
    });
}


const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(fadeInStyle);

console.log('%c計画通り (Just as planned)', 'font-size: 30px; color: #8B0000; font-weight: bold; text-shadow: 0 0 10px #DC143C;');
console.log('%cWelcome to the world of Amongus Kira', 'font-size: 16px; color: #FFD700;');
console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #f4f1e8;');
