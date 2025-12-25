// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    const layerBg = document.querySelector('.layer-bg');
    const layerFg = document.querySelector('.layer-fg');

    if (layerBg) {
        // Background moves very slowly
        layerBg.style.transform = `translateY(${scrollY * 0.1}px)`;
    }

    if (layerFg) {
        // Foreground moves slightly faster
        layerFg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive Quiz
function startQuiz() {
    const questions = [
        {
            q: "Gemini 3 Pro 的強項是什麼？",
            options: ["A. 快速翻譯", "B. 複雜邏輯與多模態理解", "C. 手機端離線運算"],
            answer: 1 // B
        },
        {
            q: "要在網頁中直接生成 App，應該使用哪個工具？",
            options: ["A. Opal", "B. Google Maps", "C. Deep Research"],
            answer: 0 // A
        },
        {
            q: "Nano Banana Pro 是指哪個模型？",
            options: ["A. Gemini 3 Flash", "B. Veo 3.1", "C. Gemini 3 Pro Image"],
            answer: 2 // C
        }
    ];

    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        const userChoice = prompt(`${questions[i].q}\n${questions[i].options.join('\n')}\n(請輸入 A, B, 或 C)`);

        if (!userChoice) return; // User cancelled

        let choiceIndex = -1;
        const input = userChoice.toUpperCase().trim();
        if (input === 'A') choiceIndex = 0;
        if (input === 'B') choiceIndex = 1;
        if (input === 'C') choiceIndex = 2;

        if (choiceIndex === questions[i].answer) {
            score++;
            alert("✅ 答對了！");
        } else {
            alert(`❌ 答錯了，正確答案是：${questions[i].options[questions[i].answer]}`);
        }
    }

    alert(`測驗結束！你的得分是：${score} / ${questions.length}\n${score === 3 ? "太強了！你是 Gemini 大師！✨" : "再接再厲！"}`);
}

// Reveal Animation on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .section-title, .feature-item').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});
