// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    const layerBg = document.querySelector('.layer-bg');
    const layerFg = document.querySelector('.layer-fg');

    if (layerBg) {
        // Background: Infinite scroll using background-position (Moves slower)
        layerBg.style.backgroundPositionY = `${-scrollY * 0.1}px`;
    }

    if (layerFg) {
        // Foreground: Infinite scroll (Moves faster)
        layerFg.style.backgroundPositionY = `${-scrollY * 0.2}px`;
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

// --- Modal Logic ---

const contentData = {
    "pro": {
        title: "Gemini 3 Pro",
        desc: "Gemini 3 Pro 是 Google 目前最強大的模型版本 (Preview)，專為處理解決最複雜的任務而設計。包含深度數學推理、科學分析、以及大規模程式碼編寫能力。它能精準理解長篇文件與複雜指令，是專業人士的最佳助手。",
        icon: "cpu",
        image: "assets/feat_pro.png"
    },
    "flash": {
        title: "Gemini 3 Flash",
        desc: "Gemini 3 Flash 結合了極致速度與高 CP 值，並引入了全新的「思考模式 (Thinking Mode)」。在許多標準測試中，其表現甚至超越了上一代的 Pro 模型，適合需要即時反應的應用場景，如即時翻譯、快速問答與摘要。",
        icon: "zap",
        image: "assets/feat_flash.png"
    },
    "flash-lite": {
        title: "Gemini Flash Lite",
        desc: "專為手機與終端裝置打造的輕量化模型。它能在裝置端離線運行，處理敏感數據或需要零延遲的任務，如即時語音轉文字、智慧回覆建議，確保隱私與效能。",
        icon: "smartphone",
        image: "assets/feat_nano.png"
    },
    "extensions": {
        title: "Google 服務整合",
        desc: "Gemini 的殺手級應用。不用切換分頁，只要說「幫我查詢關於某專案的 Gmail 信件」或「讀取雲端硬碟的 PDF」，它就能直接撈出資料並進行整理。亦可結合 Google Maps 規劃旅遊路線。",
        icon: "map",
        image: "assets/feat_extensions.png"
    },
    "multimodal": {
        title: "多模態分析",
        desc: "Gemini 是原生多模態模型，意即它「天生」就看懂圖片、聽懂聲音、讀懂影片。上傳一段 1 小時的會議影片，它能在幾秒鐘內幫您生成帶有時間戳記的詳細會議記錄與重點摘要。",
        icon: "file-video",
        image: "assets/multimodal.png"
    },
    "notebook": {
        title: "NotebookLM",
        desc: "最強的個人知識庫 RAG 工具。您可以上傳多達 50 個 PDF、網站連結或筆記，NotebookLM 會成為該領域的專家。透過 Gemini 介面，您可以隨時調用這些私有知識來回答問題，甚至生成 Podcast 格式的導讀。",
        icon: "book-open",
        image: "assets/feat_notebook.png"
    },
    "image-gen": {
        title: "Nano Banana Pro",
        desc: "即 Gemini 3 Pro Image 模型。它是目前市面上對中文理解能力最強的圖像生成模型之一，且具備極強的文字渲染能力，能在圖片中精準拼寫出複雜的英文甚至中文字，適合製作海報與行銷素材。",
        icon: "image",
        image: "assets/creative.png"
    },
    "veo": {
        title: "Veo 3.1",
        desc: "Google DeepMind 的影片生成模型。支援「文生影」與「圖生影」，更能生成 1080p 高解析度影片。最獨特的是它具備影音同步功能，生成的影片會包含逼真的環境音效與配樂。",
        icon: "video",
        image: "assets/feat_veo.png"
    },
    "research": {
        title: "Deep Research",
        desc: "自動化深度研究代理人。當您給出一個廣泛的主題（如「分析 2025 電動車市場趨勢」），它會自主進行數十次搜尋，閱讀數百個網頁與 PDF，最後彙整成一份長篇、結構完整且附帶來源引用的專業報告。",
        icon: "search",
        image: "assets/feat_research.png"
    },
    "canvas": {
        title: "Canvas 畫布模式",
        desc: "專為協作而生的介面。不同於傳統對話視窗，Canvas 提供一個獨立的編輯區塊，讓您與 AI 共同編輯文章或程式碼。適合撰寫長篇部落格、行銷文案，或是預覽網頁前端效果。",
        icon: "layout",
        image: "assets/feat_canvas.png"
    }
};

const modal = document.getElementById('detail-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalIcon = document.getElementById('modal-icon');
const modalImg = document.getElementById('modal-img');

// --- 圖片預載入功能 ---
const preloadedImages = {};

function preloadImages() {
    Object.keys(contentData).forEach(key => {
        const data = contentData[key];
        if (data.image) {
            const img = new Image();
            img.src = data.image;
            preloadedImages[key] = img;
        }
    });
}

// 頁面載入時預先載入所有圖片
document.addEventListener('DOMContentLoaded', preloadImages);

function openModal(key) {
    const data = contentData[key];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    // Set Image (使用預載入的圖片)
    if (data.image) {
        // 使用預載入的圖片或直接設定 src
        if (preloadedImages[key] && preloadedImages[key].complete) {
            modalImg.src = preloadedImages[key].src;
            modalImg.style.opacity = '1';
        } else {
            modalImg.style.opacity = '0';
            modalImg.src = data.image;
            modalImg.onload = () => {
                modalImg.style.opacity = '1';
            };
        }
        modalImg.style.display = 'block';
    } else {
        modalImg.style.display = 'none';
    }

    // Reset icon manually if needed
    modalIcon.setAttribute('data-lucide', data.icon);
    lucide.createIcons();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Attach click events
document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.getAttribute('data-id');
        openModal(key);
    });
});
