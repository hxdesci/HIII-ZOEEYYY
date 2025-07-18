$(document).ready(function() {
    var envelope = $("#envelope");
    var btn_open = $("#open");
    var btn_reset = $("#reset");

    envelope.click(function() {
        open();
    });
    btn_open.click(function() {
        open();
    });
    btn_reset.click(function() {
        close();
    });

    function open() {
        envelope.addClass("open")
            .removeClass("close");
    }

    function close() {
        envelope.addClass("close")
            .removeClass("open");
    }

})

const texts = {
    line1: "HIIII MISSSS GORGEOUSSS,",
    line2: "HRUUU??? Soo..... I saw you",
    line3: "scrolling at tiktok the other day\n but I WAS TOO\nSHY TO ASK ABT IT",
    line4: "Soooooooooooooooooo"
};

function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(element, text, i + 1), 100);
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'popup-floating-heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.querySelector('.popup-floating-hearts').appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => heart.remove(), 4000);
}

function startHeartAnimation() {
    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHeart, Math.random() * 2000);
    }
    
    // Continue creating hearts
    setInterval(() => {
        if (document.getElementById('popup').style.display === 'block') {
            createFloatingHeart();
        }
    }, 500);
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    
    // Start floating hearts animation
    startHeartAnimation();
    
    // Make the No button move to random positions
    noButton.addEventListener('mouseover', function() {
        const maxX = window.innerWidth - this.clientWidth;
        const maxY = window.innerHeight - this.clientHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        this.style.position = 'fixed';
        this.style.left = randomX + 'px';
        this.style.top = randomY + 'px';
        this.style.transition = 'all 0.3s ease';
    });
    
    // Yes button click
    yesButton.addEventListener('click', function() {
        popup.style.display = 'none';
        const tiktokMessage = document.getElementById('tiktokFlash');
        tiktokMessage.style.display = 'block';
    });
}

function startTyping() {
    const lines = document.querySelectorAll('.words');
    let delay = 0;
    let totalDelay = 0;
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            typeWriter(line, texts[`line${index + 1}`]);
        }, delay);
        delay += (texts[`line${index + 1}`].length * 100) + 500;
        totalDelay = delay;
    });

    // Show popup after all text is typed
    setTimeout(showPopup, totalDelay + 1000);
}

// Add this to your existing envelope open event listener
document.getElementById('open').addEventListener('click', function() {
    document.getElementById('envelope').className = 'open';
    setTimeout(startTyping, 1000); // Start typing after envelope opens
});

// Modify your reset button to clear the text
document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('envelope').className = 'close';
    document.querySelectorAll('.words').forEach(element => {
        element.innerHTML = '';
    });
});