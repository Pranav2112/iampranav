export const siteConfig = {
  name: "Pranav",
  title: "Full Stack Developer",
  description:
    "I craft digital experiences that merge creativity with clean code. Specializing in modern web technologies to build fast, beautiful, and accessible applications.",
  email: "hello@pranav.dev",
  socials: {
    github: "https://github.com/Pranav2112",
    linkedin: "https://www.linkedin.com/in/pranav-auti/",
    twitter: "https://x.com/Pranav_Autii",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const aboutData = {
  headline: "Turning Ideas Into Digital Reality",
  bio: [
    "I'm a passionate full-stack developer who thrives at the intersection of design and engineering. I don't just write code — I architect experiences that users love and businesses rely on.",
    "My journey spans across modern web development, machine learning, blockchain ecosystems, and financial technology. I believe in building software that's not just functional, but elegant and impactful.",
    "When I'm not coding, you'll find me exploring the latest in Web3, diving into ML research papers, or tinkering with new frameworks before they go mainstream.",
  ],
  stats: [
    { value: "10+", label: "Projects Completed" },
    { value: "5+", label: "Tech Stacks" },
    { value: "2+", label: "Years of Experience" },
    { value: "3+", label: "Domains Explored" },
  ],
  interests: [
    {
      title: "Full Stack Development",
      description: "Building end-to-end applications with React, Next.js, Node.js, and modern databases.",
      icon: "code",
    },
    {
      title: "Machine Learning & AI",
      description: "Developing intelligent systems with Python, TensorFlow, and data-driven solutions.",
      icon: "brain",
    },
    {
      title: "Blockchain & Web3",
      description: "Smart contracts, DeFi protocols, and decentralized application architecture.",
      icon: "blocks",
    },
    {
      title: "Finance & FinTech",
      description: "Algorithmic trading, financial modeling, and building fintech platforms.",
      icon: "trending",
    },
  ],
};

export const skillsData = {
  headline: "My Tech Arsenal",
  subtitle: "Technologies and tools I use to bring ideas to life",
  categories: [
    {
      name: "Frontend",
      color: "indigo",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 75 },
        { name: "HTML/CSS", level: 95 },
      ],
    },
    {
      name: "Backend",
      color: "violet",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "Python", level: 85 },
        { name: "REST APIs", level: 85 },
        { name: "GraphQL", level: 70 },
        { name: "PostgreSQL", level: 75 },
      ],
    },
    {
      name: "ML & AI",
      color: "cyan",
      skills: [
        { name: "TensorFlow", level: 70 },
        { name: "PyTorch", level: 65 },
        { name: "Scikit-learn", level: 75 },
        { name: "Pandas/NumPy", level: 80 },
        { name: "NLP", level: 65 },
        { name: "Computer Vision", level: 60 },
      ],
    },
    {
      name: "Blockchain",
      color: "emerald",
      skills: [
        { name: "Solidity", level: 70 },
        { name: "Ethereum", level: 75 },
        { name: "Web3.js", level: 70 },
        { name: "Smart Contracts", level: 70 },
        { name: "DeFi", level: 65 },
        { name: "Solana", level: 55 },
      ],
    },
    {
      name: "Tools & DevOps",
      color: "amber",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Docker", level: 70 },
        { name: "Linux", level: 75 },
        { name: "VS Code", level: 95 },
        { name: "Figma", level: 65 },
        { name: "Vercel", level: 80 },
      ],
    },
  ],
};

export const experienceData = {
  headline: "Experience",
  subtitle: "My professional journey through the tech world",
  timeline: [
    {
      id: "exp-1",
      role: "Graduate Assistant",
      company: "Stevens Institute of Technology",
      location: "New Jersey, USA",
      period: "2025 – Present",
      type: "Work",
      description:
        "Serving as a Graduate Assistant while pursuing MS in Computer Science. Supporting faculty with research, coursework, and academic operations. Gaining hands-on experience in ML, blockchain, and full-stack development through academic projects.",
      achievements: [
        "Graduate Assistantship — academic & research support",
        "Built MaternaSense — ML preeclampsia prediction system",
        "Developed AvaxPay — decentralized payment platform",
        "AI Portfolio Optimization research with Reinforcement Learning",
      ],
      skills: ["Python", "React", "Solidity", "PyTorch", "FastAPI", "AWS"],
      color: "indigo",
    },
    {
      id: "exp-2",
      role: "Full Stack Developer",
      company: "Tychee",
      location: "Remote",
      period: "2024 – 2025",
      type: "Work",
      description:
        "Worked as a Full Stack Developer at Tychee, contributing to building and maintaining web applications. Collaborated with the team on product features, API development, and frontend interfaces.",
      achievements: [
        "Developed and maintained full-stack web applications",
        "Built RESTful APIs and integrated third-party services",
        "Collaborated in agile sprints with cross-functional teams",
        "Improved application performance and user experience",
      ],
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs"],
      color: "violet",
    },
    {
      id: "exp-3",
      role: "Freelance Developer",
      company: "EquityFx Trading Academy",
      location: "Remote",
      period: "2025",
      type: "Freelance",
      description:
        "Designed and developed a modern, fully responsive trading education website with advanced GSAP animations, interactive UI components, and a polished user experience for a trading education company.",
      achievements: [
        "Built responsive website with GSAP & ScrollTrigger animations",
        "Implemented modern UI/UX with interactive components",
        "Delivered high-end design matching client's brand identity",
      ],
      skills: ["React", "Vite", "Tailwind CSS", "GSAP", "ScrollTrigger"],
      color: "cyan",
    },
  ],
};

export const projectsData = {
  headline: "Featured Projects",
  subtitle: "Real projects across ML, Blockchain, FinTech, and Full Stack development",
  projects: [
    // ─── ML & AI ───────────────────────────────────────────
    {
      id: "maternasense",
      title: "MaternaSense",
      shortDescription: "ML-powered clinical tool for early prediction of preeclampsia risk in pregnancies",
      fullDescription:
        "MaternaSense is an AI-driven healthcare application that predicts the risk of preeclampsia using clinical, lab, and biomarker data. It combines machine learning models with medical rule-based adjustments to provide risk scores, explanations, and recommendations. Designed for early screening, it helps healthcare professionals and expectant mothers make informed decisions.",
      image: "",
      category: "ML & AI",
      featured: true,
      techStack: ["Python", "FastAPI", "Scikit-learn", "Pandas", "NumPy", "React", "Vite", "jsPDF", "Joblib"],
      highlights: [
        "Ensemble ML model (Random Forest + Gradient Boosting with calibration)",
        "Clinical rule-based risk adjustment using ACOG-inspired logic",
        "Explainable AI output with top contributing factors",
        "Risk tier classification (Low → Critical) with confidence score",
        "Automated downloadable PDF clinical report",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "Completed",
      year: "2026",
    },
    {
      id: "fraud-detection",
      title: "Credit Card Fraud Detection",
      shortDescription: "Detects fraudulent transactions using ML classification on imbalanced datasets",
      fullDescription:
        "This project applies machine learning techniques to detect fraudulent credit card transactions using optimized feature selection and classification. It uses Chi-Square feature selection with models like XGBoost to improve accuracy and reduce false positives in highly imbalanced datasets.",
      image: "",
      category: "ML & AI",
      featured: false,
      techStack: ["Python", "Scikit-learn", "XGBoost", "Pandas", "NumPy"],
      highlights: [
        "Chi-Square feature selection optimization",
        "Cross-validation-based model tuning",
        "Fraud detection on highly imbalanced datasets",
        "Performance evaluation with precision, recall & F1",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "Completed",
      year: "2024",
    },
    {
      id: "plant-disease",
      title: "Plant Disease Detection",
      shortDescription: "Classifies plant diseases from leaf images using deep learning CNNs",
      fullDescription:
        "This project uses convolutional neural networks (CNNs) to classify plant diseases from leaf images. It helps farmers detect diseases early and take preventive actions to improve crop yield. Achieved ~96% classification accuracy across multiple disease categories.",
      image: "",
      category: "ML & AI",
      featured: false,
      techStack: ["Python", "TensorFlow", "Keras", "OpenCV"],
      highlights: [
        "CNN model achieving ~96% classification accuracy",
        "Image preprocessing and data augmentation pipeline",
        "Multi-class disease classification across plant species",
        "Real-world agricultural application for early detection",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "Completed",
      year: "2023",
    },
    {
      id: "ai-portfolio-rl",
      title: "AI Portfolio Optimization",
      shortDescription: "Uses Reinforcement Learning to dynamically optimize financial portfolio allocation",
      fullDescription:
        "A research project that applies reinforcement learning to dynamically optimize investment portfolios under real-world constraints. The system learns optimal allocation strategies through simulation-based evaluation and dynamic rebalancing.",
      image: "",
      category: "ML & AI",
      featured: false,
      techStack: ["Python", "PyTorch", "NumPy", "Pandas"],
      highlights: [
        "Reinforcement learning-based portfolio optimization",
        "Dynamic portfolio rebalancing under constraints",
        "Simulation-based evaluation and backtesting",
        "Advanced combination of finance, AI, and RL",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "In Development",
      year: "2026",
    },
    // ─── FinTech ──────────────────────────────────────────
    {
      id: "stock-classifier",
      title: "Stock Price Trend Classifier",
      shortDescription: "Predicts next-day stock price direction using technical indicators and ML",
      fullDescription:
        "This project builds a machine learning classifier to predict next-day stock price movement using historical market data. It uses indicators like RSI, MACD, and moving averages to generate predictive signals while addressing real-world issues like non-stationarity in financial time series.",
      image: "",
      category: "FinTech",
      featured: true,
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "yfinance", "Matplotlib"],
      highlights: [
        "Technical indicator-based feature engineering (RSI, MACD, MAs)",
        "Time-series-aware train/test split to prevent data leakage",
        "Random Forest vs Logistic Regression comparison",
        "Realistic financial ML evaluation beyond just accuracy",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "Completed",
      year: "2025",
    },
    {
      id: "smart-finance",
      title: "Smart Finance Tracker",
      shortDescription: "Expense tracking system built using Agile Scrum methodology",
      fullDescription:
        "A finance tracking application designed as part of Agile coursework (CS 555), focusing on sprint planning, backlog management, and Scrum roles. Built by a 2-member team simulating a full Agile team environment with proper documentation and iterative delivery.",
      image: "",
      category: "FinTech",
      featured: false,
      techStack: ["React", "Node.js", "MongoDB", "Express.js"],
      highlights: [
        "Scrum-based development workflow with sprint planning",
        "Backlog management and prioritization",
        "Role-based execution (PO, SM, Developer)",
        "Agile documentation, retrospectives, and reporting",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "In Development",
      year: "2026",
    },
    // ─── Full Stack ──────────────────────────────────────
    {
      id: "equityfx",
      title: "EquityFx Trading Academy",
      shortDescription: "Modern responsive website for a trading education platform with advanced animations",
      fullDescription:
        "A fully responsive and animated website built for EquityFx, a trading education company. It includes multiple interactive sections like services, testimonials, founder profile, and contact forms. Features high-end UI/UX with GSAP-powered scroll animations.",
      image: "",
      category: "Full Stack",
      featured: true,
      techStack: ["React", "Vite", "Tailwind CSS", "GSAP", "ScrollTrigger"],
      highlights: [
        "Fully responsive across all device sizes",
        "Advanced scroll-based animations using GSAP & ScrollTrigger",
        "Modern UI/UX design with interactive components",
        "Multi-section layout with smooth navigation",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "In Development",
      year: "2025",
    },
    {
      id: "ticket-booking",
      title: "Automated Ticket Booking Platform",
      shortDescription: "Scalable ticket booking system with QR-based validation on AWS",
      fullDescription:
        "A full-stack ticket booking platform that automates event ticketing and generates dynamic QR codes for secure entry and validation. Built with a serverless backend architecture on AWS for scalability and cost efficiency.",
      image: "",
      category: "Full Stack",
      featured: false,
      techStack: ["Next.js", "Node.js", "AWS S3", "AWS Lambda"],
      highlights: [
        "Dynamic QR code generation for each ticket",
        "Serverless backend on AWS Lambda",
        "Secure validation workflow with real-time scanning",
        "Scalable cloud-native system design",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "Completed",
      year: "2025",
    },
    {
      id: "portfolio-website",
      title: "Developer Portfolio",
      shortDescription: "This website — built with Next.js, Framer Motion, and 3D interactions",
      fullDescription:
        "A modern, animated portfolio website featuring particle effects, 3D tilt cards, smooth scroll, custom cursor, magnetic buttons, and scroll-triggered animations. Designed and built from scratch to showcase projects and skills.",
      image: "",
      category: "Full Stack",
      featured: false,
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      highlights: [
        "Custom cursor and magnetic button interactions",
        "Particle field background with Canvas API",
        "3D tilt card effects with spring physics",
        "Fully responsive with mobile-first design",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/Pranav2112",
      status: "In Development",
      year: "2026",
    },
    // ─── Blockchain / Web3 ───────────────────────────────
    {
      id: "avaxpay",
      title: "AvaxPay",
      shortDescription: "Decentralized crypto payment platform on Avalanche blockchain",
      fullDescription:
        "AvaxPay is a decentralized payment application built on the Avalanche blockchain that enables fast and low-cost crypto transactions. It allows users to send and receive payments securely through smart contracts and wallet integrations like MetaMask.",
      image: "",
      category: "Blockchain",
      featured: true,
      techStack: ["Solidity", "Avalanche C-Chain", "Hardhat", "React", "Ethers.js", "MetaMask", "TypeScript"],
      highlights: [
        "Smart contract-based decentralized payment system",
        "Fast & low-fee transactions on Avalanche network",
        "MetaMask wallet integration for seamless UX",
        "Secure and transparent on-chain transactions",
      ],
      liveUrl: "",
      githubUrl: "https://github.com/ShreyasThakur0809/AvaxPay",
      status: "Completed",
      year: "2025",
    },
  ],
  categories: ["All", "ML & AI", "Full Stack", "Blockchain", "FinTech"],
};
