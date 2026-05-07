let gameSequence = [];
let userSequence = [];
let level = 1;
let highScore = 0;
const colors = ['red', 'green', 'blue', 'yellow'];

window.onload = function() {
    alert("مرحباً بكِ في تحدي الذاكرة البصرية! 🧠✨\n\nاضغطي ابدأ وورينا شطارتك في حفظ الألوان!");
};

function setCirclesClickable(status) {
    document.querySelectorAll('.circle').forEach(circle => {
        if (status) {
            circle.classList.remove('disabled');
            circle.style.pointerEvents = "auto";
        } else {
            circle.classList.add('disabled');
            circle.style.pointerEvents = "none";
        }
    });
}

function updateDesign() {
    const body = document.body;
    const container = document.getElementById('main-container');
    const extra = document.getElementById('extra-section');
    const levels = ['lvl-5', 'lvl-10', 'lvl-15', 'lvl-20'];
    
    body.classList.remove(...levels);
    container.classList.remove(...levels);
    extra.classList.remove(...levels);
    
    if (level >= 20) {
        body.classList.add('lvl-20');
        container.classList.add('lvl-20');
    } else if (level >= 15) {
        body.classList.add('lvl-15');
        container.classList.add('lvl-15');
    } else if (level >= 10) {
        body.classList.add('lvl-10');
        container.classList.add('lvl-10');
    } else if (level >= 5) {
        body.classList.add('lvl-5');
        container.classList.add('lvl-5');
    }
}

function startGame() {
    userSequence = [];
    gameSequence = [];
    level = 1;
    updateDesign();
    document.getElementById('level-num').innerText = level;
    document.getElementById('text-content').innerHTML = "💡 ركزي على الألوان..";
    
    gameSequence.push(colors[Math.floor(Math.random() * 4)]);
    gameSequence.push(colors[Math.floor(Math.random() * 4)]);
    setTimeout(playSequence, 800);
}

function resetGame() {
    location.reload();
}

function playSequence() {
    let i = 0;
    setCirclesClickable(false);
    const interval = setInterval(() => {
        flashColor(gameSequence[i]);
        i++;
        if (i >= gameSequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('text-content').innerHTML = "🕹️ اضغطيها بالترتيب!";
                setCirclesClickable(true);
            }, 500);
        }
    }, 800);
}

function flashColor(color) {
    const el = document.getElementById(color);
    if (el) {
        el.classList.add('active');
        setTimeout(() => el.classList.remove('active'), 500);
    }
}

document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', (e) => {
        const clickedColor = e.target.id;
        flashColor(clickedColor);
        userSequence.push(clickedColor);
        checkAnswer(userSequence.length - 1);
    });
});

function checkAnswer(currentIndex) {
    if (userSequence[currentIndex] === gameSequence[currentIndex]) {
        if (userSequence.length === gameSequence.length) {
            setCirclesClickable(false);
            
            if (level > highScore) {
                highScore = level;
                document.getElementById('high-score').innerText = highScore;
            }
            
            level++;
            
            if ([5, 10, 15, 20].includes(level)) {
                document.getElementById('text-content').innerHTML = "🔥 تطور المستوى !";
            } else {
                document.getElementById('text-content').innerHTML = "ممتازة! استمري ✨";
            }
            
            setTimeout(() => {
                userSequence = [];
                document.getElementById('level-num').innerText = level;
                updateDesign();
                gameSequence.push(colors[Math.floor(Math.random() * 4)]);
                playSequence();
            }, 1200);
        }
    } else {
        document.getElementById('text-content').innerHTML =
            `<span style='color:#ef5350'>أفااا ! خطأ.</span> المستوى الذي وصلتِ له: ${level}`;
        gameSequence = [];
        setCirclesClickable(false);
    }
}