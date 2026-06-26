// ═══════════════════════════════════════════════════════════════════════════
// NEXIV.EDU — Course Database
// All courses, lessons, and quizzes live here as a single source of truth.
// ═══════════════════════════════════════════════════════════════════════════

export const courses = [
  {
    id: "ui-ux-designing",
    title: "Advanced UI/UX Designing",
    description: "Design interfaces that feel natural and intuitive. Master user psychology, design systems, and responsive layouts to build products people love.",
    category: "UI/UX Design",
    duration: "12 Weeks",
    difficulty: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600&auto=format&fit=crop",
    skills: ["Wireframing", "Cognitive Load Theory", "Figma Design Systems", "Prototyping", "Usability Testing"],
    color: "violet",
    lessons: [
      {
        id: "uiux-l1",
        title: "Introduction to Cognitive Load Theory & Layouts",
        duration: "45 Mins",
        content: `### Principle of Least Cognitive Overhead
In modern product design, the interface must serve as an invisible conduit of intention. Minimizing cognitive load means understanding the mental storage limits of your audience. Every element, label, border, and input alignment should adhere strictly to a predictable structural visual layout.

#### 1. Fitts's Law in Action
The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target. Keep critical interactive trigger components large and isolated with substantial whitespace.

#### 2. Visual Hierarchy and Negative Space
Whitespace is not empty space; it is active breathing room. Utilizing high contrast, a restricted monochromatic palette, and typographic pairings helps users digest data without distraction. Group related items closely using the Gestalt law of proximity.`,
        quiz: [
          {
            id: "uiux-q1",
            question: "According to Fitts's Law, what factors determine the time required to interact with a target area?",
            options: [
              "The distance to and physical width of the target",
              "The visual color contrast and opacity of the target",
              "The depth level and shadow distance of the component",
              "The font family used for the action label"
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "uiux-l2",
        title: "Establishing Scalable Design Tokens & Grids",
        duration: "60 Mins",
        content: `### Foundations of Design Tokens
For enterprise scale, we convert magic pixels into functional values called "Design Tokens". Tokens are semantic variables representing colors, spacings, corners, and typographical hierarchies.

#### 1. The 8px Core Grid
Spacing should follow a strict 8px linear scale (8px, 16px, 24px, 48px, 80px). This maintains grid mathematical alignment across both desktop monitors and mobile orientations seamlessly.

#### 2. Typography Pairings
Select highly legible geometric sans-serif fonts for display headings and high-contrast system labels. Keep reading line lengths constrained between 60 to 80 characters for optimal cognitive retention.`,
        quiz: [
          {
            id: "uiux-q2",
            question: "Why is an 8px base linear grid system highly recommended in responsive UI development?",
            options: [
              "It matches standard browser performance speeds",
              "It ensures perfect mathematical scalability across diverse device screen widths",
              "It is the only grid system recognized by international graphics standards",
              "It forces all image assets to render in a 16:9 widescreen format"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: "data-analysis-fundamentals",
    title: "Data Analysis Fundamentals",
    description: "Turn raw numbers into actionable stories. Learn how to clean datasets, build statistical models, and visualize data trends using Python and R.",
    category: "Data Analysis",
    duration: "10 Weeks",
    difficulty: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    skills: ["Python Pandas", "R Tidyverse", "Statistical Modeling", "Predictive Analytics", "Data Visualization"],
    color: "emerald",
    lessons: [
      {
        id: "data-l1",
        title: "Data Wrangling with Pandas and Data Frames",
        duration: "50 Mins",
        content: `### Tidy Data Principles
Tidy data sets provide a consistent structure where every variable is placed in its own column, every observation stands in its own row, and each type of observational unit forms a table.

#### 1. Pandas Selection and Filtering
Pandas allows vectorized computational queries across data structures. Use \`.loc\` for label-based selection, and \`.iloc\` for integer-positional selections to prevent memory fragmentation during dataset copies.

#### 2. Handling Missing Data (NaNs)
Use imputation methods to fill voids with statistical centers such as the median or mean, or employ forward-fills for time-series computations where future observations are temporally distinct.`,
        quiz: [
          {
            id: "data-q1",
            question: "Under Tidy Data principles, which statement is mathematically correct?",
            options: [
              "Every row must contain a unique visual identifier called a column token",
              "Every variable must form a column and every observation must form a row",
              "All continuous features must be consolidated into a single string element",
              "Tables must be compressed into 8-bit sparse matrices"
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "data-l2",
        title: "Linear Regressions and Hypothesis Testing",
        duration: "55 Mins",
        content: `### Evaluating Statistical Hypotheses
Hypothesis testing allows us to evaluate arguments using sample variances. The null hypothesis ($H_0$) represents the status quo (no effect), while the alternative hypothesis ($H_1$) asserts statistical significance.

#### 1. The P-Value Limit
A p-value measures the probability of observing a test statistic as extreme as, or more extreme than, the actual performance given that the null hypothesis is true. A standard limit of 0.05 is commonly used to reject the null hypothesis.

#### 2. Linear Modeling
Calculating linear coefficients seeks to minimize the Sum of Squared Residuals (SSR) in a classic Ordinary Least Squares (OLS) optimization path.`,
        quiz: [
          {
            id: "data-q2",
            question: "What does a statistical P-value below 0.05 generally indicate in clinical trials or software A/B tests?",
            options: [
              "There is less than 5% error in the measurement tools",
              "The null hypothesis should be rejected due to sufficient statistical evidence of an effect",
              "The alternative hypothesis is mathematically identical to the baseline state",
              "The experiment has timed out and must be rebooted"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: "embedded-systems-fundamentals",
    title: "Embedded Systems Development",
    description: "Write code that interacts with the physical world. Learn low-level C programming, manage microcontroller registers, and control hardware sensors.",
    category: "Embedded Systems",
    duration: "8 Weeks",
    difficulty: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    skills: ["Bare-metal C", "GPIO Manipulation", "Registers & Timers", "Debugging with Oscilloscopes", "Interrupt Handlers"],
    color: "orange",
    lessons: [
      {
        id: "embed-l1",
        title: "Microcontroller Registers and GPIO Control",
        duration: "45 Mins",
        content: `### Direct Hardware Interfacing
Microcontrollers manipulate the surrounding physical reality by applying voltage potentials to General Purpose Input/Output (GPIO) pins. Every pin is controlled by specific 8-bit, 16-bit, or 32-bit hardware registers mapped into the CPU's memory layout.

#### 1. Register Bitmasks
To turn on a physical output without disturbing adjacent bits in the configuration register, apply bitwise OR filters:
\`\`\`c
PORTB |= (1 << PB5); // Turns pin 5 representing output HIGH
\`\`\`
To clear or write a pin LOW, apply a bitwise AND with a inverted mask:
\`\`\`c
PORTB &= ~(1 << PB5); // Turns pin 5 representing output LOW
\`\`\`

#### 2. Pull-up vs. Pull-down Resistors
Floating wire states introduce electrical static noise. Integrated hardware resistors pull input potentials safely to VCC (5V/3.3V) or Ground to produce crisp, clean logic values (True or False).`,
        quiz: [
          {
            id: "embed-q1",
            question: "Which C programming bitwise statement turns PB2 HIGH without changing any other register bits?",
            options: [
              "PORTB = (1 << PB2);",
              "PORTB |= (1 << PB2);",
              "PORTB &= ~(1 << PB2);",
              "PORTB ^= 0xFF;"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: "iot-basics",
    title: "IoT Basics & Connected Systems",
    description: "Connect devices to the cloud and each other. Master communication protocols like MQTT, configure smart sensor networks, and build smart systems.",
    category: "IoT Basics",
    duration: "6 Weeks",
    difficulty: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=600&auto=format&fit=crop",
    skills: ["MQTT Protocol", "Wi-Fi & Bluetooth LE", "I2C SPI Buses", "Node-RED Integration", "OTA Firmware Updates"],
    color: "cyan",
    lessons: [
      {
        id: "iot-l1",
        title: "Communication Protocols & Message Brokers (MQTT)",
        duration: "40 Mins",
        content: `### The Lightweight IoT Standard
Message Queuing Telemetry Transport (MQTT) is a publish-subscribe network protocol designed for constrained remote machines with minimal network packet overhead.

#### 1. Publisher-Broker-Subscriber Pattern
Unlike HTTP's request-response model, IoT nodes publish sensor data to specific textual "topics" hosted on a central coordinator called the Broker. Clients subscribe to topics to accept updates asynchronously.

#### 2. Quality of Service (QoS) Levels
- **QoS 0:** At most once delivery (best effort, no validation).
- **QoS 1:** At least once delivery (guaranteed, but duplicates occur).
- **QoS 2:** Exactly once delivery (the highest standard utilizing a 4-step handshaking process).`,
        quiz: [
          {
            id: "iot-q1",
            question: "Which MQTT Quality of Service (QoS) tier guarantees that a message is delivered exactly once using an advanced four-way handshake?",
            options: [
              "QoS Level 0",
              "QoS Level 1",
              "QoS Level 2",
              "QoS Custom"
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  {
    id: "graphic-design-principles",
    title: "Graphic Design Principles",
    description: "Develop your eye for visual design. Master color harmony, grid layouts, brand typography, and clean vector graphics to communicate ideas effectively.",
    category: "Graphic Design",
    duration: "4 Weeks",
    difficulty: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
    skills: ["Color Harmony", "Typography Tracking & Kerning", "Grid Frameworks", "Vector Branding", "Symmetrical Balance"],
    color: "pink",
    lessons: [
      {
        id: "graphic-l1",
        title: "Color Theory Dynamics & Accessibility Scales",
        duration: "30 Mins",
        content: `### Harmonizing Color Scales
Color evokes distinct moods and defines readability. A designer must command the interaction of hue, saturation, and luminance.

#### 1. Complementary and Split-Complementary Schemes
Opposite colors on the color wheel provide maximum visual tension and high energy. Use dominant-neutral backdrops with vibrant complements on key interactive items to navigate the viewer's gaze.

#### 2. Luminosity & WCAG Guidelines
Black text on off-white backgrounds or deep charcoal on white ensures a minimum 4.5:1 color contrast ratio. Under Academic Precision design rules, muted secondary tones create an editorial feel while preserving structural usability.`,
        quiz: [
          {
            id: "graphic-q1",
            question: "What is the minimum WCAG AA required color contrast ratio for readable body level text?",
            options: [
              "2:1 contrast scale",
              "4.5:1 contrast scale",
              "10:1 contrast scale",
              "1.5:1 contrast scale"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: "ai-production-responsive-sites",
    title: "AI Production & Rapid Prototyping",
    description: "Build and deploy working software fast. Learn how to use AI coding models, orchestrate LLMs, and go from concept to a responsive web portal in hours.",
    category: "AI Production",
    duration: "10 Weeks",
    difficulty: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    skills: ["Generative Prompts", "LLM Code Architecture", "Vector Embeddings", "Retrieval Augmented Generation (RAG)", "Production Pipeline Scaling"],
    color: "amber",
    lessons: [
      {
        id: "ai-l1",
        title: "Automating Visual Layouts and Core Codebases",
        duration: "50 Mins",
        content: `### The Next Generation of Rapid Iteration
AI Production shifts the focus from writing rote syntax to maintaining clean intent. By supplying precise structural specifications, generative models can output complete and functional user interfaces.

#### 1. Designing Clean Generative Instructions
Provide context first, followed by clear constraints (such as "minimalist layout, Inter typography, absolute zero mock libraries, valid imports, standard tailwind classes").

#### 2. Maintaining Code Integration
As models generate web components, use surgical edits and rigorous verification tests (like compiler lints) to guarantee state consistency across your full-stack system before pushing code live.`,
        quiz: [
          {
            id: "ai-q1",
            question: "What is key to obtaining correct, non-hallucinated code snippets from generative AI assistants?",
            options: [
              "Submitting short, vague questions to let the model guess structural patterns",
              "Supplying detailed context, architectural boundaries, and precise functional constraints",
              "Writing instructions solely inside a visual CSS stylesheet",
              "Ignoring compilation error messages entirely"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
];

// Category → color mapping for design system integration
export const categoryColors = {
  "UI/UX Design": { token: "violet", bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", darkBg: "bg-violet-950/30", dot: "bg-violet-400" },
  "Data Analysis": { token: "emerald", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", darkBg: "bg-emerald-950/30", dot: "bg-emerald-400" },
  "Embedded Systems": { token: "orange", bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", darkBg: "bg-orange-950/30", dot: "bg-orange-400" },
  "IoT Basics": { token: "cyan", bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", darkBg: "bg-cyan-950/30", dot: "bg-cyan-400" },
  "Graphic Design": { token: "pink", bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20", darkBg: "bg-pink-950/30", dot: "bg-pink-400" },
  "AI Production": { token: "amber", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", darkBg: "bg-amber-950/30", dot: "bg-amber-400" },
};

// Category icon names (mapped in components via lucide-react)
export const categoryIcons = {
  "UI/UX Design": "PenTool",
  "Data Analysis": "BarChart3",
  "Embedded Systems": "Cpu",
  "IoT Basics": "Wifi",
  "Graphic Design": "Palette",
  "AI Production": "Brain",
};

// Initial approval registry (for admin dashboard demo)
export const initialApprovals = [
  {
    id: "app-1",
    studentEmail: "s.jenkins@example.com",
    studentName: "Sarah Jenkins",
    courseId: "ui-ux-designing",
    courseTitle: "Advanced UI/UX Designing",
    completionDate: "Oct 24, 2023",
    score: 94,
    status: "pending"
  },
  {
    id: "app-2",
    studentEmail: "m.chen@example.com",
    studentName: "Marcus Chen",
    courseId: "ai-production-responsive-sites",
    courseTitle: "AI Production & Rapid Prototyping",
    completionDate: "Oct 24, 2023",
    score: 88,
    status: "pending"
  },
  {
    id: "app-3",
    studentEmail: "e.rodiguez@example.com",
    studentName: "Elena Rodriguez",
    courseId: "ui-ux-designing",
    courseTitle: "Advanced UI/UX Designing",
    completionDate: "Oct 23, 2023",
    score: 98,
    status: "pending"
  },
  {
    id: "app-4",
    studentEmail: "j.wilson@example.com",
    studentName: "James Wilson",
    courseId: "data-analysis-fundamentals",
    courseTitle: "Data Analysis Fundamentals",
    completionDate: "Oct 23, 2023",
    score: 85,
    status: "pending"
  }
];

// Demo user accounts
export const demoAccounts = {
  sarah: {
    email: "s.jenkins@example.com",
    name: "Sarah Jenkins",
    role: "student",
    streak: 12,
    progress: {
      "ui-ux-designing": 35,
      "data-analysis-fundamentals": 80
    },
    lessonProgress: {
      "ui-ux-designing": ["uiux-l1"]
    },
    certificates: {
      "ui-ux-designing": "none",
      "data-analysis-fundamentals": "none"
    },
    quizScores: {
      "ui-ux-designing": 85,
      "data-analysis-fundamentals": 90
    }
  },
  marcus: {
    email: "m.chen@example.com",
    name: "Marcus Chen",
    role: "student",
    streak: 0,
    progress: {},
    lessonProgress: {},
    certificates: {},
    quizScores: {}
  },
  admin: {
    email: "admin@nexiv.com",
    name: "Alex Rivera",
    role: "admin"
  }
};
