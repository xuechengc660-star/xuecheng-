const previewVideos = document.querySelectorAll('[data-preview-video="true"]');

let previewVideosStarted = false;

const loadPreviewVideo = (video) => {
  if (!video || video.getAttribute("src") || !video.dataset.src) return;
  video.setAttribute("src", video.dataset.src);
  video.load();
};

const playVideo = (video) => {
  if (reducedMotionQuery?.matches) {
    video.pause();
    return;
  }
  loadPreviewVideo(video);
  video.muted = true;
  video.play().catch(() => {});
};

const startPreviewVideos = () => {
  if (previewVideosStarted || !previewVideos.length) return;
  previewVideosStarted = true;
  if (reducedMotionQuery?.matches) return;

  if (!("IntersectionObserver" in window)) {
    previewVideos.forEach(playVideo);
    return;
  }

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          playVideo(video);
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.16, rootMargin: "120px 0px" }
  );

  previewVideos.forEach((video) => videoObserver.observe(video));
};

const pageName = document.body.classList.contains("page-guide")
  ? "guide"
  : document.body.classList.contains("page-about")
    ? "about"
    : "works";

const translations = {
  zh: {
    common: {
      nav: ["关于", "作品", "AI 导览"],
      navLabel: "全局导航",
      brandSmall: {
        works: "交互 / AIGC / 空间",
        guide: "作品集导览",
        about: "关于 / 简历",
      },
    },
    worksTitle: "陈学成 | WORKS",
    guideTitle: "陈学成 | AI GUIDE",
    aboutTitle: "陈学成 | ABOUT",
    works: {
      heroKicker: "交互设计 / AIGC 视觉 / 沉浸式体验",
      heroName: "陈学成",
      heroStatement: "让视觉成为可被触发的体验。",
      heroNote: "以影像、空间和可运行原型，把抽象概念转译成可被观看、触发和进入的体验系统。",
      focusLabel: "PROJECT FOCUS",
      focusTitle: "生命自赋几何诗",
      focusBody: "5 屏沉浸式展览 / 雷达触发 / TouchDesigner 链路",
      focusItems: ["浙江美术馆入选", "空间叙事与实时影像", "可运行交互原型"],
      enterWorks: "进入作品",
      aiGuide: "AI 导览",
      decoderLabel: "PROJECT DECODER / 作品解码器",
      radarAria: "作品雷达，移动鼠标或触摸项目点以解码作品入口",
      radarEyebrow: "SCAN TO DECODE",
      radarReadoutLabel: "当前解码",
      radarProjects: {
        immersive: {
          title: "生命自赋几何诗",
          meta: "Immersive / Radar / TouchDesigner",
          body: "沉浸式空间、实时影像、雷达交互与现场输出。",
          focusMeta: "5 屏沉浸式展览 / 雷达触发 / TouchDesigner 链路",
          focusItems: ["浙江美术馆入选", "空间叙事与实时影像", "可运行交互原型"],
        },
        prototype: {
          title: "心屿",
          meta: "Product Prototype / Emotion",
          body: "情绪陪伴、产品原型、用户旅程与交互反馈。",
          focusMeta: "情绪陪伴产品 / 用户旅程 / 可演示 APP 原型",
          focusItems: ["情绪状态识别", "陪伴与倾诉流程", "疗愈型互动场景"],
        },
        brand: {
          title: "观夏 · 闻香识我",
          meta: "Brand Experience / Scent",
          body: "植物香气、用户画像、视觉物料与品牌感知路径。",
          focusMeta: "品牌体验 / 香气线索 / 互动影像装置",
          focusItems: ["植物香气选择", "用户画像匹配", "视觉触点系统"],
        },
        aigc: {
          title: "AI 影像实验",
          meta: "AIGC / Moving Image",
          body: "生成影像、镜头氛围、节奏控制与动态视觉实验。",
          focusMeta: "AIGC 视觉实验 / 镜头氛围 / 动态影像",
          focusItems: ["Prompt 结构", "生成式视觉风格", "短片节奏控制"],
        },
      },
      selectedLabel: "SELECTED WORKS",
      selectedTitle: "从空间、情绪到感官的体验实验。",
      selectedBody: "首页只保留判断力最强的入口：一个沉浸式代表项目，一组能快速辨认方向的精选作品。",
      flagshipType: "Immersive Interaction / Flagship",
      flagshipTitle: "生命自赋几何诗",
      flagshipBody: "以斐波那契生长为线索，把观众位置、卡片翻转、地面索引与主墙影像连接成一套可被触发的空间叙事。",
      prototypeType: "Emotional Prototype",
      prototypeTitle: "心屿",
      prototypeBody: "面向当代青年情绪状态的数字产品原型，把陪伴、倾诉与放松转译成可进入的互动场景。",
      brandType: "Brand Experience",
      brandTitle: "观夏 · 闻香识我",
      brandBody: "以植物香气、用户画像和视觉触点组织品牌感知体验。",
      aigcType: "AI Moving Image",
      aigcTitle: "AI 影像实验",
      aigcBody: "用生成式工具探索短片镜头、氛围、节奏和动态视觉表达。",
      nextLabel: "NEXT",
      nextTitle: "如果不确定先看哪一个，让 AI GUIDE 按关注点带你进入作品。",
      openGuide: "打开 AI GUIDE",
      viewAbout: "查看 ABOUT",
    },
    guide: {
      kicker: "AI GUIDE / CURATED PATH",
      title: "选择方向，直接进入对应作品。",
      lead: "选择你关心的方向，导览会把项目、能力和观看顺序整理成一条更清楚的路径。",
      questions: ["想看最强项目", "想看产品原型", "想看品牌体验", "想看 AIGC 视觉", "想快速了解我"],
      answerLabel: "推荐路径",
      chatWindow: "AI 导览窗口",
      chatTitle: "导览助手",
      localPreview: "AI 未连接",
      apiOnline: "AI 在线",
      apiThinking: "正在连接 AI 导览...",
      apiFallback: "AI 服务暂时未连接，先用本地导览回答：",
      greeting: "你好，我是你的导览助手，帮你快速了解我和我的对应项目",
      shortcuts: ["最强项目", "产品原型", "品牌体验", "AIGC 视觉"],
      placeholder: "输入你想了解的方向",
      send: "发送",
    },
    about: {
      kicker: "ABOUT / VALUE",
      title: "我关注画面如何被观看，也关注它如何被触发。",
      lead: "深圳技术大学艺术与科技学生。项目实践覆盖沉浸式交互、AI 生成影像、品牌感知体验和疗愈型数字产品。",
      capabilities: [
        ["空间导览", "让观众的位置成为叙事变量，使移动、停留和靠近改变画面结构。"],
        ["动态影像", "用生成式工具与实时影像建立情绪场，把抽象概念转化为可观看的系统。"],
        ["原型实现", "把界面流程做成可操作、可演示的版本，帮助想法更早被体验和验证。"],
        ["感官线索", "从香气、物料、视觉触点和用户画像中组织完整的品牌感知体验。"],
      ],
      resumeLabel: "RESUME / CONTACT",
      resumeTitle: "正在寻找交互设计、数字媒体、AIGC 视觉或体验设计方向实习。",
      wechat: "微信：cxc3014701484",
      school: "深圳技术大学 / 艺术与科技",
      openResume: "3014701484@qq.com",
    },
  },
  en: {
    common: {
      nav: ["ABOUT", "WORKS", "AI GUIDE"],
      navLabel: "Global navigation",
      brandSmall: {
        works: "Interaction / AIGC / Spatial",
        guide: "Portfolio Guide",
        about: "About / Resume",
      },
    },
    worksTitle: "Chen Xuecheng | WORKS",
    guideTitle: "Chen Xuecheng | AI GUIDE",
    aboutTitle: "Chen Xuecheng | ABOUT",
    works: {
      heroKicker: "Interaction Design / AIGC Visuals / Immersive Experience",
      heroName: "Chen Xuecheng",
      heroStatement: "Turning visuals into experiences that can be triggered.",
      heroNote: "I translate abstract concepts into viewable, touchable, and explorable systems through moving image, spatial interaction, and runnable prototypes.",
      focusLabel: "PROJECT FOCUS",
      focusTitle: "Garden of Ordinals",
      focusBody: "5-screen exhibition / radar trigger / TouchDesigner pipeline",
      focusItems: ["Selected for Zhejiang Art Museum", "Spatial narrative and real-time visuals", "Runnable interaction prototype"],
      enterWorks: "Enter Works",
      aiGuide: "AI Guide",
      decoderLabel: "PROJECT DECODER",
      radarAria: "Project radar. Move the cursor or touch project points to decode entries.",
      radarEyebrow: "SCAN TO DECODE",
      radarReadoutLabel: "Now Decoding",
      radarProjects: {
        immersive: {
          title: "Garden of Ordinals",
          meta: "Immersive / Radar / TouchDesigner",
          body: "Immersive space, real-time visuals, radar interaction, and on-site output.",
          focusMeta: "5-screen exhibition / radar trigger / TouchDesigner pipeline",
          focusItems: ["Selected for Zhejiang Art Museum", "Spatial narrative and real-time visuals", "Runnable interaction prototype"],
        },
        prototype: {
          title: "IsleSoul",
          meta: "Product Prototype / Emotion",
          body: "Emotional support, product prototype, user journey, and interactive feedback.",
          focusMeta: "Emotion product / user journey / runnable app prototype",
          focusItems: ["Emotion-state recognition", "Companion and expression flow", "Healing interaction scenes"],
        },
        brand: {
          title: "To Summer · Scented Self",
          meta: "Brand Experience / Scent",
          body: "Plant scent, user portraits, visual materials, and brand perception path.",
          focusMeta: "Brand experience / scent clue / interactive visual installation",
          focusItems: ["Plant scent selection", "User portrait matching", "Visual touchpoint system"],
        },
        aigc: {
          title: "AI Moving Image Experiments",
          meta: "AIGC / Moving Image",
          body: "Generated image, shot atmosphere, rhythm control, and dynamic visual experiments.",
          focusMeta: "AIGC visual experiment / shot atmosphere / moving image",
          focusItems: ["Prompt structure", "Generative visual style", "Short-film rhythm control"],
        },
      },
      selectedLabel: "SELECTED WORKS",
      selectedTitle: "Experiments across space, emotion, and sensory experience.",
      selectedBody: "The homepage keeps the strongest entry points: one flagship immersive project and a concise set of works that clarify my directions quickly.",
      flagshipType: "Immersive Interaction / Flagship",
      flagshipTitle: "Garden of Ordinals",
      flagshipBody: "A spatial narrative based on Fibonacci growth, linking audience position, card flipping, floor indexing, and main-wall visuals into a triggerable system.",
      prototypeType: "Emotional Prototype",
      prototypeTitle: "IsleSoul",
      prototypeBody: "A digital product prototype for contemporary youth emotion states, translating companionship, expression, and relaxation into interactive scenes.",
      brandType: "Brand Experience",
      brandTitle: "To Summer · Scented Self",
      brandBody: "A brand experience organized through plant scents, user portraits, and visual touchpoints.",
      aigcType: "AI Moving Image",
      aigcTitle: "AI Moving Image Experiments",
      aigcBody: "Exploring shot atmosphere, rhythm, and dynamic visual expression through generative tools.",
      nextLabel: "NEXT",
      nextTitle: "Not sure where to start? Let AI GUIDE lead you by focus area.",
      openGuide: "Open AI GUIDE",
      viewAbout: "View ABOUT",
    },
    guide: {
      kicker: "AI GUIDE / CURATED PATH",
      title: "Choose a direction. Enter the right project.",
      lead: "Pick what you care about, and the guide will organize projects, strengths, and viewing order into a clearer path.",
      questions: ["See the strongest project", "See product prototypes", "See brand experience", "See AIGC visuals", "Quickly understand me"],
      answerLabel: "Recommended Path",
      chatWindow: "AI GUIDE WINDOW",
      chatTitle: "Portfolio Guide Assistant",
      localPreview: "AI Offline",
      apiOnline: "AI Online",
      apiThinking: "Connecting to AI guide...",
      apiFallback: "AI service is not connected yet. Local guide answer:",
      greeting: "Hi, I can guide you into the most relevant project based on what recruiters usually care about.",
      shortcuts: ["Strongest", "Prototype", "Brand", "AIGC"],
      placeholder: "Ask what you want to see",
      send: "Send",
    },
    about: {
      kicker: "ABOUT / VALUE",
      title: "I care how visuals are seen, and how they are triggered.",
      lead: "Art and Technology student at Shenzhen Technology University. My projects cover immersive interaction, AI-generated moving image, brand experience, and healing-oriented digital products.",
      capabilities: [
        ["Spatial Guidance", "Turning audience position into a narrative variable, so movement, pause, and proximity can change the image structure."],
        ["Dynamic Image", "Building emotional fields with generative tools and real-time visuals, translating abstract concepts into viewable systems."],
        ["Prototype Realization", "Turning interface flows into runnable, demonstrable prototypes so ideas can be experienced and tested earlier."],
        ["Sensory Cues", "Organizing brand perception through scent, material, visual touchpoints, and user portraits."],
      ],
      resumeLabel: "RESUME / CONTACT",
      resumeTitle: "Looking for internships in interaction design, digital media, AIGC visual design, or experience design.",
      wechat: "WeChat: cxc3014701484",
      school: "Shenzhen Technology University / Art & Technology",
      openResume: "3014701484@qq.com",
    },
  },
};

const guideContent = {
  zh: {
    immersive: {
      title: "生命自赋几何诗",
      body: "先看这个项目。它最集中地呈现了沉浸式空间交互、动态影像、观众触发、TouchDesigner/NDI/Hirender 技术链路和现场输出能力。",
      meta: ["沉浸式空间", "实时影像", "雷达交互"],
      image: "./assets/garden-hero.png",
      link: "project:immersive",
      label: "进入项目详情",
      question: "我想先看最能代表你的项目。",
      answer: "建议先看《生命自赋几何诗》。它入选浙江美术馆，能同时证明空间叙事、实时影像、雷达触发、多屏播控和现场执行能力。",
    },
    prototype: {
      title: "心屿",
      body: "如果你想判断产品原型和体验流程能力，先看《心屿》。它把情绪陪伴、场景选择和互动反馈做成可以演示的疗愈型数字产品。",
      meta: ["情绪陪伴", "产品原型", "用户旅程"],
      image: "./assets/islesoul-cover.jpg",
      link: "project:prototype",
      label: "查看作品入口",
      question: "我想看你怎么做产品体验。",
      answer: "可以进入《心屿》。它是非临床情绪陪伴产品原型，重点看如何把“想说、睡不着、想放空”拆成三空间任务流，并做成可操作前端原型。",
    },
    brand: {
      title: "观夏 · 闻香识我",
      body: "如果你关心品牌体验，可以看这个项目。它以植物香气为线索，把用户画像、香气选择、视觉物料和交互反馈串成完整感知路径。",
      meta: ["品牌感知", "香气线索", "视觉系统"],
      image: "./assets/guanxia-cover.png",
      link: "project:brand",
      label: "查看作品入口",
      question: "我想看品牌体验方向。",
      answer: "推荐《观夏 · 闻香识我》。它获第十九届好创意广东赛区三等奖，适合看品牌体验、香味人格化、手势交互和 TouchDesigner 动态视觉落地。",
    },
    aigc: {
      title: "AI 影像实验",
      body: "如果你想看 AIGC 视觉表达，可以从 AI 影像实验进入，再回看沉浸式项目中的生成影像工作流。",
      meta: ["AIGC 视觉", "动态影像", "氛围生成"],
      image: "./assets/ai-generated-cover.jpg",
      link: "project:aigc",
      label: "查看作品入口",
      question: "我想看你的 AIGC 视觉能力。",
      answer: "可以先看 AI 影像实验，再看《生命自赋几何诗》的动态画面。前者说明生成影像、镜头氛围和剪辑判断，后者说明视觉如何进入真实空间和多屏系统。",
    },
    about: {
      title: "ABOUT",
      body: "如果你想快速判断我是谁、适合什么岗位、联系方式在哪里，直接进入 ABOUT。那里包含能力结构、求职方向和 SVG 简历。",
      meta: ["简历", "联系方式", "能力结构"],
      image: "./assets/resume.svg",
      link: "./about.html",
      label: "进入 ABOUT",
      question: "我想快速了解你本人。",
      answer: "建议进入 ABOUT。那里可以快速看到个人方向、能力结构、求职目标、联系方式和简历；如果想判断能力证据，再回到《生命自赋几何诗》和《心屿》。",
    },
  },
  en: {
    immersive: {
      title: "Garden of Ordinals",
      body: "Start here. This project best shows immersive spatial interaction, dynamic visuals, audience-triggered logic, TouchDesigner workflow, and on-site output.",
      meta: ["Immersive Space", "Real-time Visuals", "Radar Interaction"],
      image: "./assets/garden-hero.png",
      link: "project:immersive",
      label: "Enter Case Study",
      question: "I want to see your most representative project.",
      answer: "Start with Garden of Ordinals. It proves spatial narrative, real-time visuals, interaction logic, and on-site execution in one project.",
    },
    prototype: {
      title: "IsleSoul",
      body: "For product prototype and experience-flow ability, view IsleSoul. It turns emotional support, scene selection, and feedback into a demonstrable healing-oriented product.",
      meta: ["Emotional Support", "Product Prototype", "User Journey"],
      image: "./assets/islesoul-cover.jpg",
      link: "project:prototype",
      label: "View Works",
      question: "I want to see how you design product experiences.",
      answer: "Go to IsleSoul. It is a lightweight product prototype focused on how emotion is recognized, answered, and transformed into an explorable scene.",
    },
    brand: {
      title: "To Summer · Scented Self",
      body: "For brand experience, view this project. It uses plant scent as the clue and connects user portraits, scent choices, visual assets, and feedback into a complete perception path.",
      meta: ["Brand Perception", "Scent Journey", "Visual System"],
      image: "./assets/guanxia-cover.png",
      link: "project:brand",
      label: "View Works",
      question: "I want to see the brand experience direction.",
      answer: "I recommend To Summer · Scented Self. It shows how brand tone, user portraits, scent choices, and visual materials become one experience.",
    },
    aigc: {
      title: "AI Moving Image Experiments",
      body: "For AIGC visual expression, start from the AI moving-image experiments, then revisit the generated visual workflow inside the immersive project.",
      meta: ["AIGC Visuals", "Moving Image", "Atmosphere"],
      image: "./assets/ai-generated-cover.jpg",
      link: "project:aigc",
      label: "View Works",
      question: "I want to see your AIGC visual ability.",
      answer: "Start with the AI moving-image experiments, then compare them with the dynamic visuals in the immersive work. Together they show control over tools, atmosphere, and visual rhythm.",
    },
    about: {
      title: "ABOUT",
      body: "For identity, role fit, and contact details, go directly to ABOUT. It includes my capability structure, internship direction, contact information, and full resume.",
      meta: ["Resume", "Contact", "Capability"],
      image: "./assets/resume.svg",
      link: "./about.html",
      label: "Enter ABOUT",
      question: "I want to understand you quickly.",
      answer: "Go to ABOUT. You can quickly see my direction, capability structure, internship target, contact details, and full resume.",
    },
  },
};

const guideButtons = document.querySelectorAll(".guide-question");
const answerTitle = document.querySelector("[data-answer-title]");
const answerBody = document.querySelector("[data-answer-body]");
const answerMeta = document.querySelector("[data-answer-meta]");
const answerLink = document.querySelector("[data-answer-link]");
const answerCard = document.querySelector(".guide-answer");
const chatQuestion = document.querySelector("[data-chat-question]");
const chatAnswer = document.querySelector("[data-chat-answer]");
const chatIntro = document.querySelector("[data-chat-intro]");
const chatLog = document.querySelector("[data-chat-log]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatStatus = document.querySelector("[data-chat-status]");
const entrySequence = document.querySelector("[data-entry-sequence]");
const entrySkip = document.querySelector("[data-entry-skip]");
const entryMedia = entrySequence?.querySelector(".entry-media");
const worksHero = document.querySelector(".works-hero");
const heroFilmMain = document.querySelector(".hero-film-main");
const decoderStage = document.querySelector("[data-decoder-stage]");
const radar = document.querySelector(".project-radar");
const radarNodes = document.querySelectorAll("[data-radar-node]");
const radarTitle = document.querySelector("[data-radar-title]");
const radarBody = document.querySelector("[data-radar-body]");
let currentLang = localStorage.getItem("portfolio-lang") || "zh";
let currentGuideKey = window.location.hash.replace("#", "") || "immersive";
let lastAppliedLang = currentLang;
let currentRadarKey = "immersive";
let radarFrame = null;
let latestRadarPointer = null;
let heroParallaxFrame = null;
let latestHeroPointer = null;
const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
const compactHeroQuery = window.matchMedia?.("(max-width: 1080px)");
const chatApiEndpoint = window.PORTFOLIO_API_ENDPOINT || (window.location.protocol === "file:" ? "http://127.0.0.1:8787/api/chat" : "/api/chat");
const projectLinks = {
  immersive: {
    file: "./projects/garden/index.html",
    server: "/project/garden/",
  },
  prototype: {
    file: "./projects/islesoul/index.html",
    server: "/project/islesoul/",
  },
  brand: {
    file: "./projects/guanxia/index.html",
    server: "/project/guanxia/",
  },
  aigc: {
    file: "./projects/ai-video/ai-video.html",
    server: "/project/ai-video/",
  },
};

const projectUrl = (key) => {
  const link = projectLinks[key];
  if (!link) return "./index.html#selected";
  return link.file;
};

const setText = (selector, text) => {
  const element = document.querySelector(selector);
  if (element && text !== undefined) element.textContent = text;
};

const setAllText = (selector, values) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
};

const renderQuestionButtons = (lang) => {
  const labels = translations[lang].guide.questions;
  guideButtons.forEach((button, index) => {
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span>${labels[index]}`;
  });
};

const applyCommonLanguage = (lang) => {
  const t = translations[lang].common;
  setAllText(".nav-links a", t.nav);
  setText(".brand small", t.brandSmall[pageName]);

  const nav = document.querySelector(".nav-links");
  if (nav) nav.setAttribute("aria-label", t.navLabel);
};

const resetChatToCurrentLanguage = () => {
  if (!chatLog) return;
  chatLog.querySelectorAll(".chat-message:not([data-chat-intro]):not([data-chat-question]):not([data-chat-answer])").forEach((message) => {
    message.remove();
  });
};

const scrambleText = (element, finalText) => {
  if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTextFor(element, finalText);
    return;
  }

  const glyphs = "CXC1375AIGCTDNDIUXFLOW";
  let frame = 0;
  const total = 12;

  const tick = () => {
    const progress = frame / total;
    element.textContent = Array.from(finalText)
      .map((char, index) => {
        if (char === " " || char === "/" || char === "。") return char;
        return index / finalText.length < progress ? char : glyphs[(index + frame) % glyphs.length];
      })
      .join("");

    frame += 1;
    if (frame <= total) requestAnimationFrame(tick);
    else element.textContent = finalText;
  };

  tick();
};

const applyHeroFocusProject = (data, worksCopy = translations[currentLang].works) => {
  if (!data) return;
  setText("[data-focus-label]", worksCopy.focusLabel);
  setText("[data-focus-title]", data.title || worksCopy.focusTitle);
  setText("[data-focus-body]", data.focusMeta || data.meta || worksCopy.focusBody);
  setAllText("[data-focus-item]", data.focusItems || worksCopy.focusItems);
};

const applyRadarProject = (key = currentRadarKey) => {
  if (!radarTitle || !radarBody) return;
  const data = translations[currentLang].works.radarProjects[key] || translations[currentLang].works.radarProjects.immersive;
  const shouldRefreshReadout = key !== currentRadarKey || radarTitle.textContent !== data.title || radarBody.textContent !== data.body;
  currentRadarKey = key;

  radarNodes.forEach((node) => {
    node.classList.toggle("is-active", node.dataset.radarNode === key);
  });

  applyHeroFocusProject(data);
  if (!shouldRefreshReadout) return;

  scrambleText(radarTitle, data.title);
  radarBody.textContent = data.body;
};

const updateRadarCopy = (lang) => {
  const t = translations[lang].works;
  setText(".decoder-label", t.decoderLabel);
  setText(".radar-eyebrow", t.radarEyebrow);
  setText(".radar-readout-label", t.radarReadoutLabel);
  if (radar) radar.setAttribute("aria-label", t.radarAria);

  radarNodes.forEach((node) => {
    const data = t.radarProjects[node.dataset.radarNode];
    if (!data) return;
    setTextFor(node.querySelector("strong"), data.title);
    setTextFor(node.querySelector("small"), data.meta);
    let detail = node.querySelector("[data-radar-detail]");
    if (!detail) {
      detail = document.createElement("em");
      detail.dataset.radarDetail = "";
      node.appendChild(detail);
    }
    detail.textContent = data.focusMeta || data.body;
  });

  applyRadarProject(currentRadarKey);
};

const scrollChatToLatest = () => {
  if (!chatLog) return;
  window.requestAnimationFrame(() => {
    chatLog.scrollTop = chatLog.scrollHeight;
  });
};

const applyGuide = (key = currentGuideKey, button, syncChat = true) => {
  const data = guideContent[currentLang][key] || guideContent[currentLang].immersive;
  currentGuideKey = key;
  if (!data || !answerTitle || !answerBody || !answerMeta || !answerLink) return;

  guideButtons.forEach((item) => {
    item.classList.toggle("is-selected", item === button || item.dataset.guide === key);
  });
  answerTitle.textContent = data.title;
  answerBody.textContent = data.body;
  answerMeta.innerHTML = data.meta.map((item) => `<span>${item}</span>`).join("");
  answerLink.href = data.link?.startsWith("project:") ? projectUrl(data.link.replace("project:", "")) : data.link;
  answerLink.textContent = data.label;

  if (answerCard && data.image) {
    answerCard.style.setProperty("--answer-bg", `url("${data.image}")`);
  }

  if (syncChat) {
    if (chatQuestion) chatQuestion.textContent = data.question;
    if (chatAnswer) chatAnswer.textContent = data.answer;
    scrollChatToLatest();
  }
};

const applyWorksLanguage = (lang) => {
  const t = translations[lang].works;
  document.title = translations[lang].worksTitle;
  setText(".works-hero .kicker", t.heroKicker);
  setText("#hero-title", t.heroName);
  document.querySelector("#hero-title")?.setAttribute("data-decode-text", t.heroName);
  setText(".hero-statement", t.heroStatement);
  document.querySelector(".hero-statement")?.setAttribute("data-decode-text", t.heroStatement);
  setText(".hero-note", t.heroNote);
  applyHeroFocusProject(t.radarProjects[currentRadarKey] || t.radarProjects.immersive, t);
  setAllText(".hero-actions .text-link", [t.enterWorks, t.aiGuide]);
  updateRadarCopy(lang);
  setText(".section-intro .section-label", t.selectedLabel);
  setText("#selected-title", t.selectedTitle);
  setText(".section-intro .intro-copy p", t.selectedBody);
  setText(".showcase-primary .project-type", t.flagshipType);
  setText(".showcase-primary .project-copy h2", t.flagshipTitle);
  setText(".showcase-primary .project-copy p:last-child", t.flagshipBody);
  const cards = document.querySelectorAll(".showcase-stack .project-strip");
  const cardCopy = [
    [t.prototypeType, t.prototypeTitle, t.prototypeBody],
    [t.brandType, t.brandTitle, t.brandBody],
    [t.aigcType, t.aigcTitle, t.aigcBody],
  ];
  cards.forEach((card, index) => {
    const [type, title, body] = cardCopy[index];
    setTextFor(card.querySelector(".project-type"), type);
    setTextFor(card.querySelector("h3"), title);
    setTextFor(card.querySelector("p:not(.project-type)"), body);
  });
  setText(".quiet-next .section-label", t.nextLabel);
  setText("#next-title", t.nextTitle);
  setAllText(".next-actions .soft-button", [t.openGuide, t.viewAbout]);
};

const setTextFor = (element, text) => {
  if (element && text !== undefined) element.textContent = text;
};

const finishEntrySequence = () => {
  if (!entrySequence) return;
  document.body.classList.remove("entry-playing");
  document.body.classList.add("entry-finished");
  startPreviewVideos();
  window.setTimeout(() => {
    entrySequence.setAttribute("aria-hidden", "true");
    entrySequence.classList.add("is-hidden");
    entryMedia?.pause?.();
    if (entryMedia?.tagName === "VIDEO") {
      entryMedia.removeAttribute("src");
      entryMedia.load?.();
    }
  }, 520);
};

if (pageName === "works" && entrySequence) {
  document.body.classList.add("entry-playing");
  const shouldReduceEntry = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const entryTimer = window.setTimeout(finishEntrySequence, shouldReduceEntry ? 0 : 3400);

  entrySkip?.addEventListener("click", () => {
    window.clearTimeout(entryTimer);
    finishEntrySequence();
  });

  entrySequence.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" && event.key !== "Enter" && event.key !== " ") return;
    window.clearTimeout(entryTimer);
    finishEntrySequence();
  });
} else {
  document.body.classList.add("entry-finished");
  startPreviewVideos();
}

const applyGuideLanguage = (lang) => {
  const t = translations[lang].guide;
  document.title = translations[lang].guideTitle;
  setText(".guide-hero .kicker", t.kicker);
  setText("#guide-title", t.title);
  setText(".guide-hero p:not(.kicker)", t.lead);
  renderQuestionButtons(lang);
  setText(".answer-label", t.answerLabel);
  setText(".chat-topline .section-label", t.chatWindow);
  setText("#chat-title", t.chatTitle);
  if (chatStatus && chatStatus.dataset.state !== "online") chatStatus.textContent = t.localPreview;
  if (chatIntro) chatIntro.textContent = t.greeting;
  document.querySelectorAll(".chat-suggestions button").forEach((button, index) => {
    button.textContent = t.shortcuts[index];
  });
  if (chatInput) chatInput.placeholder = t.placeholder;
  setText(".chat-input button", t.send);
  applyGuide(currentGuideKey, document.querySelector(`.guide-question[data-guide="${currentGuideKey}"]`));
};

const applyAboutLanguage = (lang) => {
  const t = translations[lang].about;
  document.title = translations[lang].aboutTitle;
  setText(".about-hero .kicker", t.kicker);
  setText("#about-title", t.title);
  setText(".about-hero p:not(.kicker)", t.lead);
  document.querySelectorAll(".capability-grid div").forEach((card, index) => {
    setTextFor(card.querySelector("h2"), t.capabilities[index][0]);
    setTextFor(card.querySelector("p"), t.capabilities[index][1]);
  });
  setText(".resume-copy .section-label", t.resumeLabel);
  setText("#resume-title", t.resumeTitle);
  const contacts = document.querySelectorAll(".contact-list a, .contact-list span");
  setTextFor(contacts[1], t.wechat);
  setTextFor(contacts[2], t.school);
  setTextFor(contacts[3], t.openResume);
  contacts[3]?.setAttribute("href", `mailto:${t.openResume}`);
  contacts[3]?.setAttribute("data-copy", t.openResume);
};

const setLanguage = (lang) => {
  const nextLang = translations[lang] ? lang : "zh";
  const languageChanged = nextLang !== lastAppliedLang;

  currentLang = translations[lang] ? lang : "zh";
  document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN";
  document.body.dataset.lang = currentLang;
  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langToggle === currentLang);
  });

  applyCommonLanguage(currentLang);
  if (languageChanged) resetChatToCurrentLanguage();

  if (pageName === "works") applyWorksLanguage(currentLang);
  if (pageName === "guide") applyGuideLanguage(currentLang);
  if (pageName === "about") applyAboutLanguage(currentLang);

  localStorage.setItem("portfolio-lang", currentLang);
  lastAppliedLang = currentLang;
};

guideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyGuide(button.dataset.guide, button);
  });
});

document.querySelectorAll("[data-guide-shortcut]").forEach((shortcut) => {
  shortcut.addEventListener("click", () => {
    const key = shortcut.dataset.guideShortcut;
    const button = document.querySelector(`.guide-question[data-guide="${key}"]`);
    if (button) button.click();
    chatInput?.focus();
  });
});

document.querySelectorAll("[data-project-link]").forEach((link) => {
  link.href = projectUrl(link.dataset.projectLink);
});

const copyText = async (value) => {
  if (!value) return false;
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
};

document.querySelectorAll(".contact-list [data-copy]").forEach((item) => {
  const activateCopy = async (event) => {
    event.preventDefault();
    const originalText = item.textContent;
    const copied = await copyText(item.dataset.copy || originalText.trim());
    item.classList.toggle("is-copied", copied);
    if (copied) item.textContent = "已复制";
    window.setTimeout(() => {
      item.classList.remove("is-copied");
      item.textContent = originalText;
    }, 900);
  };

  item.addEventListener("click", activateCopy);
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") activateCopy(event);
  });
});

const setScanPosition = (event, element) => {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  element.style.setProperty("--scan-x", `${Math.max(0, Math.min(100, x))}%`);
  element.style.setProperty("--scan-y", `${Math.max(0, Math.min(100, y))}%`);
};

const setHeroParallax = (event) => {
  if (!worksHero || reducedMotionQuery?.matches) return;
  latestHeroPointer = { x: event.clientX, y: event.clientY };

  if (heroParallaxFrame) return;
  heroParallaxFrame = requestAnimationFrame(() => {
    heroParallaxFrame = null;
    if (!latestHeroPointer) return;

    const rect = worksHero.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = Math.max(-1, Math.min(1, ((latestHeroPointer.x - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((latestHeroPointer.y - rect.top) / rect.height - 0.5) * 2));
    const isCompactHero = compactHeroQuery?.matches;
    const filmRangeX = isCompactHero ? 28 : 24;
    const filmRangeY = isCompactHero ? 10 : 16;
    const noiseRangeX = isCompactHero ? 26 : 22;
    const noiseRangeY = isCompactHero ? 10 : 14;

    worksHero.style.setProperty("--hero-film-x", `${(-x * filmRangeX).toFixed(2)}px`);
    worksHero.style.setProperty("--hero-film-y", `${(-y * filmRangeY).toFixed(2)}px`);
    worksHero.style.setProperty("--hero-noise-x", `${(x * noiseRangeX).toFixed(2)}px`);
    worksHero.style.setProperty("--hero-noise-y", `${(y * noiseRangeY).toFixed(2)}px`);
  });
};

const resetHeroParallax = () => {
  if (!worksHero) return;
  if (heroParallaxFrame) {
    cancelAnimationFrame(heroParallaxFrame);
    heroParallaxFrame = null;
  }
  latestHeroPointer = null;
  ["--hero-film-x", "--hero-film-y", "--hero-veil-x", "--hero-veil-y", "--hero-noise-x", "--hero-noise-y"].forEach((property) => {
    worksHero.style.setProperty(property, "0px");
  });
};

const updateNearestRadarNode = (event) => {
  if (!radar || !radarNodes.length) return;
  latestRadarPointer = { x: event.clientX, y: event.clientY };

  if (radarFrame) return;
  radarFrame = requestAnimationFrame(() => {
    radarFrame = null;
    if (!latestRadarPointer) return;
    let nearestKey = currentRadarKey;
    let nearestDistance = Number.POSITIVE_INFINITY;

    radarNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(latestRadarPointer.x - centerX, latestRadarPointer.y - centerY);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestKey = node.dataset.radarNode;
      }
    });

    applyRadarProject(nearestKey);
  });
};

worksHero?.addEventListener("pointermove", setHeroParallax, { passive: true });
worksHero?.addEventListener("pointerleave", resetHeroParallax);
reducedMotionQuery?.addEventListener?.("change", resetHeroParallax);

decoderStage?.addEventListener("pointerenter", () => {
  document.querySelectorAll("[data-decode-text]").forEach((element) => {
    scrambleText(element, element.getAttribute("data-decode-text") || element.textContent);
  });
});

radarNodes.forEach((node) => {
  const update = () => applyRadarProject(node.dataset.radarNode);
  node.addEventListener("pointerenter", update);
  node.addEventListener("focus", update);
});

const detectGuideKey = (text) => {
  const value = text.toLowerCase();
  if (/(aigc|ai|影像|视频|生成|视觉|moving image|visual)/i.test(value)) return "aigc";
  if (/(产品|原型|心屿|情绪|疗愈|app|交互流程|prototype|product|emotion|islesoul)/i.test(value)) return "prototype";
  if (/(品牌|观夏|香|香气|感官|视觉系统|brand|scent|summer)/i.test(value)) return "brand";
  if (/(about|简历|联系|联系方式|你是谁|了解|岗位|实习|resume|contact|who are you)/i.test(value)) return "about";
  if (/(最强|代表|沉浸|空间|主项目|touchdesigner|雷达|展览|strongest|flagship|immersive|spatial)/i.test(value)) {
    return "immersive";
  }
  return "immersive";
};

const appendChatMessage = (text, type) => {
  if (!chatLog) return;
  const message = document.createElement("p");
  message.className = `chat-message chat-message-${type}`;
  message.textContent = text;
  chatLog.appendChild(message);
  scrollChatToLatest();
  return message;
};

const setChatStatus = (state) => {
  if (!chatStatus) return;
  chatStatus.dataset.state = state;
  chatStatus.textContent = state === "online" ? translations[currentLang].guide.apiOnline : translations[currentLang].guide.localPreview;
};

const recentChatMessages = () => {
  if (!chatLog) return [];
  return [...chatLog.querySelectorAll(".chat-message")]
    .slice(-8)
    .map((message) => ({
      role: message.classList.contains("chat-message-user") ? "user" : "assistant",
      content: message.textContent.trim(),
    }))
    .filter((message) => message.content);
};

const askAiGuide = async (message, key) => {
  const response = await fetch(chatApiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      language: currentLang,
      guideKey: key,
      guide: guideContent[currentLang][key],
      history: recentChatMessages(),
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "AI request failed");
  }
  return data.answer;
};

chatForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = chatInput?.value.trim();
  if (!value) return;

  appendChatMessage(value, "user");
  const key = detectGuideKey(value);
  const button = document.querySelector(`.guide-question[data-guide="${key}"]`);
  applyGuide(key, button, false);
  const pendingMessage = appendChatMessage(translations[currentLang].guide.apiThinking, "ai");
  chatInput.value = "";
  chatInput.disabled = true;

  try {
    const answer = await askAiGuide(value, key);
    if (pendingMessage) pendingMessage.textContent = answer;
    setChatStatus("online");
    scrollChatToLatest();
  } catch (error) {
    const fallback = `${translations[currentLang].guide.apiFallback}${guideContent[currentLang][key].answer}`;
    if (pendingMessage) pendingMessage.textContent = fallback;
    setChatStatus("offline");
    scrollChatToLatest();
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
  }
});

document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langToggle));
});

setLanguage(currentLang);

const revealTargets = document.querySelectorAll(
  ".section-intro, .showcase-primary, .project-strip, .quiet-next, .guide-board, .chat-window, .capability-grid, .resume-section"
);

if ("IntersectionObserver" in window) {
  revealTargets.forEach((target) => target.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -36px 0px" }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}
