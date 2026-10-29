export const ORG = {
  name: "All Eyez Open, LLC",
  tagline: "You Are Not Alone",
  phone: "(404) 555-0148",
  email: "hello@alleyezopen.org",
  hotline: "1-800-799-7233",
  hotlineTel: "18007997233",
  sms: "88788",
  address: "418 Auburn Avenue NE, Suite 210",
  city: "Atlanta, GA 30303",
  hours: "Monday–Friday, 9:00 a.m.–5:00 p.m. ET",
  goal: 25000,
  raised: 18420,
};

export type Role = "Survivor" | "Supporter" | "Donor" | "Volunteer" | "Advisor";

export type User = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  language: string;
  advisorId?: string;
};

export const demoUsers: User[] = [
  {
    id: "u-ariel",
    name: "Ariel James",
    nickname: "Ariel",
    email: "ariel@alleyezopen.org",
    phone: "(404) 555-0198",
    password: "Safety2026",
    role: "Survivor",
    language: "English",
  },
  {
    id: "u-jordan",
    name: "Jordan Hale",
    nickname: "Jordan",
    email: "jordan@alleyezopen.org",
    phone: "(404) 555-0172",
    password: "Advisor2026",
    role: "Advisor",
    language: "English",
    advisorId: "sp-jordan",
  },
];

export const services = [
  {
    id: "housing",
    title: "Housing Assistance",
    summary: "Emergency shelter referral, transitional housing, rental help, and safe relocation.",
    category: "Basics",
    image: "service-housing",
    who: "Anyone who needs a safer place to stay, including parents with children.",
    offer: ["Confidential shelter referral", "Transitional apartments", "Rental assistance screening", "Help planning a calm move"],
    steps: [
      { title: "Request", text: "Tell us the kind of housing you need and the timing that feels safest." },
      { title: "Confidential intake", text: "A housing advocate calls or chats at the time you choose. You can use a nickname." },
      { title: "Placement plan", text: "Together you review options, transportation, and what to bring." },
    ],
    eligibility: "Open to adults in the Atlanta area who are leaving or recovering from domestic violence. You do not need a police report.",
    hours: "Intake weekdays 9:00 a.m.–4:00 p.m. ET. After-hours requests are returned the next morning.",
    faqs: [
      { q: "Will my location be shared?", a: "No. Shelter addresses are shared only with you, after intake, and only in the way you approve." },
      { q: "Can my children come?", a: "Yes. Tell us ages and any access needs so the placement can fit your family." },
      { q: "How fast is a referral?", a: "Urgent requests are reviewed the same business day. A safe night is not guaranteed until a partner confirms a bed." },
    ],
    related: ["food", "clothing", "safety"],
  },
  {
    id: "food",
    title: "Food Support",
    summary: "Food boxes, grocery vouchers, scheduled pickup, and delivery to a safe address.",
    category: "Basics",
    image: "service-food",
    who: "Households rebuilding after a crisis, including people in shelter or a new apartment.",
    offer: ["Weekly food boxes", "Grocery vouchers", "Pickup time slots", "Delivery to a safe address or PO Box"],
    steps: [
      { title: "Choose a slot", text: "Pick a pickup window or ask for delivery." },
      { title: "Share preferences", text: "Tell us about allergies, infants, or cultural foods you want included." },
      { title: "Collect in private", text: "Pickup is at a side door. You do not have to give your story." },
    ],
    eligibility: "No income paperwork is required for the first three boxes. Ongoing support is based on a short conversation.",
    hours: "Pickup: Tue & Thu, 11:00 a.m.–2:00 p.m. and 4:00–6:30 p.m. Delivery requests close at noon the day before.",
    faqs: [
      { q: "What is in a box?", a: "Staples, fresh produce when we have it, and items for children if you ask. A week of groceries for a family of three is the usual size." },
      { q: "Can someone else pick up?", a: "Yes. Give us their first name. They will need the pickup code, not your story." },
    ],
    related: ["housing", "clothing", "finance"],
  },
  {
    id: "clothing",
    title: "Clothing Support",
    summary: "A private clothing closet, interview outfits, and children’s sizes on request.",
    category: "Basics",
    image: "service-clothing",
    who: "Anyone replacing clothing in a hurry, preparing for work, or clothing children.",
    offer: ["Everyday clothing", "Interview outfits", "Children’s sizes", "Seasonal coats and shoes"],
    steps: [
      { title: "Request sizes", text: "Share sizes for each person. Photos of you are never required." },
      { title: "Private appointment", text: "Visit the closet alone or send a trusted person." },
      { title: "Take what you need", text: "There is no cost and no limit lecture. Take a reasonable set for two weeks." },
    ],
    eligibility: "Open to survivors and their children. Supporters may donate, not shop, through this program.",
    hours: "Closet hours: Wed 12:00–6:00 p.m. and Sat 10:00 a.m.–1:00 p.m.",
    faqs: [
      { q: "Are clothes new?", a: "A mix of new and gently used. Interview outfits are steamed and complete with shoes when we can." },
      { q: "Can I request modest or gender-affirming clothing?", a: "Yes. Write that in the request and we will set aside options." },
    ],
    related: ["jobs", "food", "housing"],
  },
  {
    id: "defense",
    title: "Self-Defense & Personal Care",
    summary: "Calm self-defense classes, personal safety alarms, self-care kits, and wellness sessions.",
    category: "Care",
    image: "service-defense",
    who: "Adults who want practical confidence and everyday personal care, at no pressure.",
    offer: ["Beginner self-defense classes", "Personal safety alarms", "Self-care kits", "Quiet wellness sessions"],
    steps: [
      { title: "Pick a class", text: "Classes stay small. You may watch the first session." },
      { title: "Register with a nickname", text: "We only need a safe way to reach you if class changes." },
      { title: "Practice at your pace", text: "Instructors never require partner drills you decline." },
    ],
    eligibility: "Ages 18 and older. Scholarships cover the $15 materials fee.",
    hours: "Classes listed on the program calendar. Wellness hours follow the community center schedule.",
    faqs: [
      { q: "Is the class physical?", a: "It includes stance, voice, and simple movements. You can modify anything. It is not a contact sport." },
      { q: "How do alarms work?", a: "They are personal sound devices you carry. Staff will show you the button during pickup. We do not track them." },
    ],
    related: ["safety", "therapy", "shop"],
  },
  {
    id: "therapy",
    title: "Therapy & Counseling",
    summary: "Individual therapy, support groups, trauma-informed care, and a small book library.",
    category: "Care",
    image: "service-therapy",
    who: "Survivors, and parents who want support for themselves or their children.",
    offer: ["Individual counseling", "Weekly support groups", "Children’s play sessions", "Lending library of healing books"],
    steps: [
      { title: "Match", text: "Tell us the kind of support you want and languages you prefer." },
      { title: "First conversation", text: "A 50-minute session by phone, video, or in the therapy room." },
      { title: "A plan you control", text: "You decide the pace. Stopping is always allowed." },
    ],
    eligibility: "No diagnosis is required. If we are full, we help you find a partner clinician.",
    hours: "Sessions Tuesday–Saturday. Groups meet Thursday at 6:00 p.m.",
    faqs: [
      { q: "Is this confidential?", a: "Yes, with the usual limits if someone is in immediate danger or a child is being harmed. Your counselor explains this before you begin." },
      { q: "Do you take insurance?", a: "Some counselors do. The Therapy Fund covers sessions when insurance is not safe or available to use." },
    ],
    related: ["legal", "safety", "classes"],
  },
  {
    id: "classes",
    title: "Classes & Workshops",
    summary: "Empowerment, parenting, healing circles, and legal-rights seminars.",
    category: "Growth",
    image: "gallery-workshop",
    who: "Survivors and supporters who want skills, community, and clear information.",
    offer: ["Healing circles", "Parenting workshops", "Know-your-rights seminars", "Art and writing evenings"],
    steps: [
      { title: "Browse the calendar", text: "Each listing shows the date, cost, and seats left." },
      { title: "Register", text: "Free classes need only a nickname and a safe contact." },
      { title: "Join", text: "Arrive, or use the private video link if the class is online." },
    ],
    eligibility: "Most classes are for adults. Parenting workshops welcome caregivers of any gender.",
    hours: "Evenings and Saturday mornings. See Programs for the live calendar.",
    faqs: [
      { q: "Will I have to speak?", a: "No. Listening is participation. Facilitators will not call on you." },
      { q: "Are supporters welcome?", a: "Healing circles are for survivors. Legal seminars and donation events welcome supporters." },
    ],
    related: ["therapy", "legal", "jobs"],
  },
  {
    id: "jobs",
    title: "Job Readiness",
    summary: "Resume building, mock interviews, skills training, and placement partners.",
    category: "Growth",
    image: "service-jobs",
    who: "Adults preparing for work, school, or a first independent paycheck.",
    offer: ["Resume studio", "Mock interviews", "Computer skills hours", "Introductions to hiring partners"],
    steps: [
      { title: "Apply", text: "A short form asks about your goals, not your history." },
      { title: "Plan", text: "A coach builds a two-week or six-week plan with you." },
      { title: "Practice", text: "You leave with a resume, a reference plan, and interview notes." },
    ],
    eligibility: "Open to survivors 18 and older. Childcare is available for Saturday sessions when requested in advance.",
    hours: "Resume studio: Wednesdays 1:00–4:00 p.m. Coaching by appointment.",
    faqs: [
      { q: "What if I have a gap in work?", a: "Coaches help you describe caregiving, volunteering, and training without sharing private details." },
      { q: "Do you guarantee a job?", a: "No. We prepare you and introduce partner employers. Hiring decisions stay with them." },
    ],
    related: ["finance", "clothing", "classes"],
  },
  {
    id: "finance",
    title: "Financial Literacy",
    summary: "Budgeting, credit repair, saving plans, safer banking, and independence planning.",
    category: "Growth",
    image: "service-finance",
    who: "Anyone separating money, opening an account, or rebuilding credit in their own name.",
    offer: ["Budgeting modules", "Credit review", "Safer banking checklist", "Savings and benefits navigation"],
    steps: [
      { title: "Start a module", text: "Four short lessons you can pause. Progress stays on this device." },
      { title: "Meet a counselor", text: "Optional 45-minute session to look at a real bill or account together." },
      { title: "Make a plan", text: "You leave with three next steps and no required product to buy." },
    ],
    eligibility: "Free for survivors. Supporters may attend the monthly community class.",
    hours: "Self-paced anytime. Live class: first Saturday at 10:00 a.m.",
    faqs: [
      { q: "Will you pull my credit?", a: "Only if you ask, and only with your own login. We never store account numbers." },
      { q: "Can I talk about a joint account?", a: "Yes. Counselors help you plan a safe separation of funds. They are not bankers or lawyers." },
    ],
    related: ["jobs", "legal", "housing"],
  },
  {
    id: "legal",
    title: "Legal Guidance",
    summary: "Connect with verified lawyers for protective-order information and rights education.",
    category: "Legal",
    image: "service-legal",
    who: "People who want clear, general information before deciding on any legal step.",
    offer: ["Know-your-rights seminars", "Consults with verified attorneys", "Help finding court forms", "Referrals when a case needs representation"],
    steps: [
      { title: "Read the disclaimer", text: "Information in the app is general. It is not legal advice and not a lawyer-client relationship." },
      { title: "Book a consult", text: "Choose phone, video, in person, or chat. Bring questions, not documents, unless you are asked." },
      { title: "Decide", text: "You can stop, ask for a referral, or engage a lawyer separately if you want representation." },
    ],
    eligibility: "Informational consults are free for survivors. Representation, if you choose it, is a separate agreement with the lawyer.",
    hours: "Legal line: weekdays 10:00 a.m.–4:00 p.m. ET.",
    faqs: [
      { q: "Are the lawyers verified?", a: "Yes. We confirm bar status in the states they list. A badge in the app means that check is current." },
      { q: "Can you file a case for me in the app?", a: "No. The app does not file court papers. A lawyer you engage can explain filing steps for your county." },
    ],
    related: ["safety", "therapy", "housing"],
  },
  {
    id: "safety",
    title: "Personal Safety Planning",
    summary: "A private, on-device safety plan: contacts, checklist, and a go-bag list.",
    category: "Care",
    image: "onboarding-phone",
    who: "Anyone who wants a plan for safer days, whether or not they are ready to leave.",
    offer: ["Personal checklist", "Emergency contacts", "Go-bag list", "Stored only on this device"],
    steps: [
      { title: "Start the checklist", text: "Choose the steps that fit your life. Skip anything that does not." },
      { title: "Add contacts", text: "People you trust, plus 911 and the national hotline." },
      { title: "Review your go-bag", text: "Documents, medicine, keys, and a change of clothes. Check items off as you pack." },
    ],
    eligibility: "Available to every signed-in user and guest. Nothing is uploaded.",
    hours: "Always available in the app, including offline.",
    faqs: [
      { q: "Who can see my plan?", a: "Only someone with access to this unlocked phone. App Lock adds a PIN or Face ID step." },
      { q: "What if I need to leave the app quickly?", a: "Use Quick Exit. It closes this view and shows a neutral screen. Your plan stays saved on the device." },
    ],
    related: ["defense", "legal", "housing"],
  },
] as const;

export const consultTypes = [
  { id: "legal", title: "Legal Guidance", text: "Protective orders and rights information. Not representation until you engage a lawyer." },
  { id: "counseling", title: "Counseling", text: "Trauma-informed therapy and support, at a pace you set." },
  { id: "housing", title: "Housing", text: "Shelter referral, transitional housing, and rental assistance." },
  { id: "financial", title: "Financial / Job Readiness", text: "Budgets, credit, resumes, and interview practice." },
  { id: "general", title: "General Support", text: "Not sure where to start? We will help you sort the next step." },
];

export const consultModes = [
  { id: "phone", title: "Phone Call", text: "Talk from wherever you already feel safest." },
  { id: "video", title: "Video Call", text: "You may keep your camera off." },
  { id: "person", title: "In Person", text: "Meet at the Auburn Avenue community center." },
  { id: "chat", title: "Secure Chat", text: "Write when you can. Messages can be set to disappear." },
];

export const timeSlots = [
  { group: "Morning", times: ["9:00 AM", "10:00 AM", "11:00 AM"] },
  { group: "Afternoon", times: ["1:00 PM", "2:00 PM", "3:00 PM"] },
  { group: "Evening", times: ["5:00 PM", "6:00 PM"] },
];

export const specialists = [
  { id: "sp-jordan", name: "Jordan Hale", role: "Attorney", specialty: "Protective orders & family law", rating: 4.9, languages: "English, Spanish", next: "Tue, Nov 3 · 10:00 AM", photo: "avatar-jordan", years: 12, jurisdictions: "Georgia", responses: 186, bar: "GA Bar 482917", bio: "Jordan helps people understand protective orders, custody questions, and how courthouse days actually work. Consults in the app are general information until you sign a separate engagement." },
  { id: "sp-amara", name: "Amara Wells", role: "LPC", specialty: "Trauma-informed counseling", rating: 4.8, languages: "English", next: "Wed, Nov 4 · 2:00 PM", photo: "avatar-amara", years: 9, jurisdictions: "Georgia", responses: 142, bar: "LPC GA 009184", bio: "Amara offers individual counseling and the Thursday healing circle. She starts every session by asking what would make the hour feel safe." },
  { id: "sp-priya", name: "Priya Shah", role: "Housing advocate", specialty: "Shelter & rental assistance", rating: 4.9, languages: "English, Hindi, Gujarati", next: "Thu, Nov 5 · 9:00 AM", photo: "avatar-priya", years: 7, jurisdictions: "Fulton & DeKalb", responses: 98, bar: "Advocate ID 2204", bio: "Priya coordinates shelter referrals and transitional apartments with partner agencies. She will not share an address until you agree to the next step." },
  { id: "sp-luis", name: "Luis Ortega", role: "Financial counselor", specialty: "Credit, banking & budgets", rating: 4.7, languages: "English, Spanish", next: "Fri, Nov 6 · 1:00 PM", photo: "avatar-luis", years: 11, jurisdictions: "Georgia", responses: 121, bar: "AFC 44120", bio: "Luis helps people open accounts in their own name, read a credit report, and build a first month’s budget." },
  { id: "sp-naomi", name: "Naomi Brooks", role: "Career coach", specialty: "Resumes & interviews", rating: 4.8, languages: "English", next: "Mon, Nov 9 · 11:00 AM", photo: "avatar-naomi", years: 8, jurisdictions: "Metro Atlanta", responses: 76, bar: "Coach ID 118", bio: "Naomi runs Resume Studio and mock interviews. She treats work gaps as normal and helps you describe skills without private details." },
  { id: "sp-helen", name: "Helen Cho", role: "Attorney", specialty: "Employment & benefits", rating: 5, languages: "English, Korean", next: "Tue, Nov 10 · 3:00 PM", photo: "avatar-helen", years: 15, jurisdictions: "Georgia & North Carolina", responses: 64, bar: "GA Bar 390221", bio: "Helen explains workplace leave, benefits, and what to say to an employer. Informational only until you hire her." },
];

export const staff = [
  { id: "st-camille", name: "Camille Wright", role: "Executive Director", photo: "avatar-camille", bio: "Camille founded All Eyez Open so survivors could find housing, care, and community without retelling their story at every door." },
  { id: "st-andre", name: "Andre Blake", role: "Volunteer Coordinator", photo: "avatar-andre", bio: "Andre trains volunteers for the pantry, donation drives, and awareness walks." },
  { id: "st-sofia", name: "Sofia Rahman", role: "Community Programs", photo: "avatar-sofia", bio: "Sofia designs classes, healing circles, and the public gallery of community days." },
  { id: "st-miles", name: "Miles Carter", role: "Donor Relations", photo: "avatar-miles", bio: "Miles makes sure every gift is receipted and directed to the fund you chose." },
  { id: "st-imani", name: "Imani Brooks", role: "Shelter Partnerships", photo: "avatar-imani", bio: "Imani keeps relationships with shelter and housing partners across metro Atlanta." },
  { id: "st-ruth", name: "Ruth Adelayo", role: "Client Care", photo: "avatar-ruth", bio: "Ruth is often the first person you reach by chat or phone. She will not rush you." },
];

export type Comment = {
  id: string;
  author: string;
  authorId: string;
  anonymous?: boolean;
  role: "lawyer" | "counselor" | "community";
  body: string;
  time: string;
  likes: number;
  bar?: string;
  jurisdiction?: string;
  replies?: Comment[];
};

export type Post = {
  id: string;
  author: string;
  authorId: string;
  anonymous: boolean;
  avatar?: string;
  time: string;
  category: string;
  title: string;
  body: string;
  support: number;
  metoo: number;
  trigger?: boolean;
  requestLegal?: boolean;
  resolved?: boolean;
  comments: Comment[];
};

const disclaimer = "General information, not legal advice. This does not create an attorney-client relationship.";

export const seedPosts: Post[] = [
  {
    id: "p1",
    author: "Anonymous",
    authorId: "anon-1",
    anonymous: true,
    time: "2h ago",
    category: "Legal",
    title: "Need help understanding protective orders",
    body: "I am trying to understand what a protective order can cover and what the courthouse visit is like. I do not want to share my county in public. If you have used the legal clinic, how did the first conversation go?",
    support: 46,
    metoo: 18,
    requestLegal: true,
    resolved: false,
    comments: [
      {
        id: "c1",
        author: "Jordan Hale",
        authorId: "sp-jordan",
        role: "lawyer",
        body: `A protective order is a civil court order asking someone to stay away and stop contact. What it can include depends on your county’s forms. You can ask the clerk for the petition without telling your story in the lobby, and many shelters help people fill it out. ${disclaimer}`,
        time: "1h ago",
        likes: 22,
        bar: "GA Bar 482917",
        jurisdiction: "Georgia",
        replies: [
          {
            id: "c1r",
            author: "Anonymous",
            authorId: "anon-1",
            anonymous: true,
            role: "community",
            body: "Thank you. I will book a consult instead of posting more detail here.",
            time: "48m ago",
            likes: 4,
          },
        ],
      },
    ],
  },
  {
    id: "p2",
    author: "Anonymous",
    authorId: "anon-2",
    anonymous: true,
    time: "Yesterday",
    category: "Housing",
    title: "Looking for safe housing options after leaving",
    body: "I left last month and I am on a friend’s couch. I need a longer stay that can include my 7-year-old. What should I have ready before I call a housing advocate?",
    support: 61,
    metoo: 12,
    requestLegal: false,
    comments: [
      {
        id: "c2",
        author: "Priya Shah",
        authorId: "sp-priya",
        role: "counselor",
        body: "Have your child’s age, any access needs, and the general area you can live in. You do not need a police report. Ask for a confidential intake and say whether it is safe to leave a voicemail. I can also book a housing consult with you.",
        time: "Yesterday",
        likes: 19,
      },
      {
        id: "c3",
        author: "Marisol R.",
        authorId: "u-marisol",
        role: "community",
        body: "The intake felt calm. I used a nickname and they never asked me to retell everything.",
        time: "Yesterday",
        likes: 11,
      },
    ],
  },
  {
    id: "p3",
    author: "Dee P.",
    authorId: "u-dee",
    anonymous: false,
    avatar: "avatar-sofia",
    time: "3d ago",
    category: "Finances",
    title: "How do I rebuild my credit?",
    body: "I have bills in my name that I could not pay last year. I want a checking account that only I can open. Where did people start without making it worse?",
    support: 38,
    metoo: 21,
    requestLegal: true,
    resolved: true,
    comments: [
      {
        id: "c4",
        author: "Luis Ortega",
        authorId: "sp-luis",
        role: "counselor",
        body: "Start by listing what is actually in your name. You can get a free weekly credit view from the official AnnualCreditReport site. A new account in only your name, at a bank or credit union you choose, is a common first step. Bring one statement to a financial consult if you want company while you read it. This is education, not a promise about your score.",
        time: "3d ago",
        likes: 16,
      },
    ],
  },
  {
    id: "p4",
    author: "Anonymous",
    authorId: "anon-4",
    anonymous: true,
    time: "4d ago",
    category: "Parenting",
    title: "A calm bedtime routine for my kids and me",
    body: "Evenings are the hardest. I am looking for a simple routine other parents used while everything else still felt new. Nothing clinical, just what helped the house get quiet.",
    support: 29,
    metoo: 14,
    comments: [
      {
        id: "c5",
        author: "Amara Wells",
        authorId: "sp-amara",
        role: "counselor",
        body: "Many families start with the same three beats: a light snack, one story, and the same goodnight sentence. You can join Thursday’s parenting workshop or the healing circle if you want to build it with other people.",
        time: "4d ago",
        likes: 9,
      },
    ],
  },
  {
    id: "p5",
    author: "Chris A.",
    authorId: "u-chris",
    anonymous: false,
    time: "1w ago",
    category: "Success Stories",
    title: "I picked up the keys to a studio",
    body: "Six months ago I was asking this community about housing. Today I have a studio through the transitional program and a part-time shift. I still get nervous. I also cooked dinner in my own kitchen. Thank you for not rushing me.",
    support: 120,
    metoo: 7,
    comments: [
      {
        id: "c6",
        author: "Ruth Adelayo",
        authorId: "st-ruth",
        role: "community",
        body: "We are glad you are marking this in your own words. The housing team is here if the next month has paperwork questions.",
        time: "1w ago",
        likes: 14,
      },
    ],
  },
  {
    id: "p6",
    author: "Anonymous",
    authorId: "anon-6",
    anonymous: true,
    time: "1w ago",
    category: "Healing",
    title: "A hard week, and I still asked for help",
    body: "This week I almost cancelled counseling. I went anyway and we only talked about sleep and a grocery list. I am posting so I remember that asking was allowed. Nothing else needs to be said.",
    support: 54,
    metoo: 23,
    trigger: true,
    comments: [
      {
        id: "c7",
        author: "Amara Wells",
        authorId: "sp-amara",
        role: "counselor",
        body: "A session can be about sleep and groceries. That still counts. If you want company next week, book Counseling and mark the urgency that fits.",
        time: "6d ago",
        likes: 12,
      },
    ],
  },
];

export const categories = ["Legal", "Housing", "Healing", "Parenting", "Finances", "Safety", "Success Stories"];

export const programs = [
  {
    id: "pr-circle",
    title: "Thursday Healing Circle",
    date: "2026-11-05",
    time: "6:00 PM",
    ends: "7:30 PM",
    price: 0,
    seats: 8,
    total: 16,
    image: "gallery-workshop",
    place: "Community room",
    format: "In person or private video",
    modes: ["In person", "Private video"],
    hostId: "sp-amara",
    childcare: false,
    blurb: "A facilitated circle. You may listen without speaking.",
    detail: "Chairs in a circle, tea, and a facilitator. This month’s topic is sleep and ordinary routines. The room is closed to supporters.",
    who: "Survivors who want a quiet hour with other people who understand. Speaking is welcome and never required.",
    bring: ["Nothing is required", "A nickname is enough", "Tea and water are set out"],
    agenda: [
      { time: "6:00 PM", title: "Doors, tea, and a seat" },
      { time: "6:15 PM", title: "Welcome and agreements" },
      { time: "6:30 PM", title: "Sleep and ordinary routines" },
      { time: "7:15 PM", title: "Close, only if you want a last word" },
    ],
  },
  {
    id: "pr-finance",
    title: "Financial Foundations",
    date: "2026-11-07",
    time: "10:00 AM",
    ends: "12:00 PM",
    price: 0,
    seats: 12,
    total: 24,
    image: "service-finance",
    place: "Classroom B",
    format: "In person",
    modes: ["In person"],
    hostId: "sp-luis",
    childcare: true,
    blurb: "Safer banking, one bill, and a first savings plan.",
    detail: "A Saturday class for people starting over with money. Bring questions, not account numbers or documents. Childcare is in the next room if you request it.",
    who: "Anyone building a budget, opening an account in their own name, or reading a bill for the first time.",
    bring: ["Questions only — leave documents at home", "A notebook if you want one", "Laptops stay in the closet; we use paper"],
    agenda: [
      { time: "10:00 AM", title: "Check-in and what you want from the morning" },
      { time: "10:20 AM", title: "Safer banking, in plain language" },
      { time: "11:00 AM", title: "One bill, worked through together" },
      { time: "11:30 AM", title: "A first savings plan you can change" },
    ],
  },
  {
    id: "pr-defense",
    title: "Self-Defense Basics",
    date: "2026-11-12",
    time: "5:30 PM",
    ends: "7:00 PM",
    price: 15,
    seats: 6,
    total: 14,
    image: "service-defense",
    place: "Movement studio",
    format: "In person",
    modes: ["In person"],
    hostId: "st-sofia",
    childcare: false,
    blurb: "Stance, voice, and awareness. Every drill can be modified.",
    detail: "A beginner evening in the studio. Partner work is optional. The $15 materials fee covers a personal safety alarm if you want one. Scholarships are available — say so on the form.",
    who: "Beginners. You set the pace. Nothing in the class asks you to describe a past event.",
    bring: ["Clothes you can move in", "Water", "Sneakers or bare feet"],
    agenda: [
      { time: "5:30 PM", title: "Arrive, change, and learn the room" },
      { time: "5:45 PM", title: "Stance, voice, and awareness" },
      { time: "6:20 PM", title: "Optional partner drills" },
      { time: "6:45 PM", title: "Alarm demo and questions" },
    ],
  },
  {
    id: "pr-resume",
    title: "Resume Studio",
    date: "2026-11-18",
    time: "1:00 PM",
    ends: "3:00 PM",
    price: 0,
    seats: 10,
    total: 12,
    image: "service-jobs",
    place: "Computer lab",
    format: "In person",
    modes: ["In person"],
    hostId: "sp-naomi",
    childcare: true,
    blurb: "Leave with a one-page resume and a practice introduction.",
    detail: "A small lab with a coach at each table. Laptops are provided. Interview outfits can be requested from the clothing closet the same afternoon.",
    who: "People returning to work, changing fields, or writing a first resume. Work gaps can stay private.",
    bring: ["A nickname and the kind of work you want", "No old resume is required", "Ask for childcare when you register"],
    agenda: [
      { time: "1:00 PM", title: "What the one-page resume is for" },
      { time: "1:20 PM", title: "Draft with a coach" },
      { time: "2:20 PM", title: "A 30-second introduction" },
      { time: "2:45 PM", title: "Closet appointment, if you want one" },
    ],
  },
  {
    id: "pr-rights",
    title: "Know Your Rights Seminar",
    date: "2026-11-20",
    time: "6:30 PM",
    ends: "8:00 PM",
    price: 0,
    seats: 20,
    total: 40,
    image: "service-legal",
    place: "Main hall",
    format: "Hall and livestream",
    modes: ["In person", "Livestream"],
    hostId: "sp-jordan",
    childcare: true,
    blurb: "Protective orders, workplace leave, and what the forms are asking.",
    detail: "Jordan Hale and Helen Cho present general information for Georgia. This is a public seminar, not legal advice and not a private consult. You can book a consult afterward if you want one.",
    who: "Anyone who wants the words on the forms explained in a room full of people, or from home on the livestream.",
    bring: ["A notebook", "No court papers — leave case numbers at home", "Questions can be written on a card"],
    agenda: [
      { time: "6:30 PM", title: "Doors and livestream check" },
      { time: "6:45 PM", title: "Protective orders, in plain language" },
      { time: "7:15 PM", title: "Workplace leave and benefits" },
      { time: "7:40 PM", title: "Written questions, then how to book a private consult" },
    ],
  },
];

export const products = [
  { id: "bk-heal", title: "Healing After Hard Seasons", price: 18, rating: 4.9, reviews: 42, category: "Books", image: "product-books", blurb: "A gentle workbook on routines, boundaries, and asking for help.", detail: "Short chapters you can stop anywhere. Written with trauma-informed counselors. Proceeds support survivors.", sizes: [], colors: ["Plum cloth"] },
  { id: "bk-bound", title: "Boundaries Workbook", price: 20, rating: 4.8, reviews: 31, category: "Books", image: "product-books", blurb: "Plain-language exercises for work, family, and money.", detail: "Includes tear-out planning pages. Proceeds support survivors.", sizes: [], colors: ["Cream cloth"] },
  { id: "jn-ground", title: "Grounded Journal", price: 16, rating: 4.7, reviews: 28, category: "Books", image: "product-journal", blurb: "Undated pages with quiet prompts. No diagnosis language.", detail: "Linen cover, 160 pages. Proceeds support survivors.", sizes: [], colors: ["Natural", "Plum"] },
  { id: "kit-calm", title: "Calm Self-Care Kit", price: 42, rating: 4.9, reviews: 19, category: "Self-Care Kits", image: "product-kit", blurb: "Tea, a candle, balm, and a card of simple reset ideas.", detail: "Packed in a plain kraft box. Discreet packaging is the default at checkout. Proceeds support survivors.", sizes: [], colors: ["Standard"] },
  { id: "al-key", title: "Personal Safety Alarm", price: 22, rating: 4.6, reviews: 54, category: "Safety Gear", image: "product-alarm", blurb: "A small sound alarm for a keychain. Staff can demo it at pickup.", detail: "130 dB device with a pin clip. This is a sound alarm, not a monitoring service. Proceeds support survivors.", sizes: [], colors: ["White", "Purple"] },
  { id: "tote", title: "Awareness Tote", price: 24, rating: 4.8, reviews: 16, category: "Awareness Merch", image: "product-tote", blurb: "Heavy canvas tote with the eye mark. No slogan on the outside.", detail: "Proceeds support survivors. The mark is embroidered without words, so the bag stays discreet.", sizes: ["One size"], colors: ["Oatmeal"] },
  { id: "tee", title: "Community Tee", price: 28, rating: 4.7, reviews: 22, category: "Awareness Merch", image: "product-tee", blurb: "Soft plum tee with a small chest mark.", detail: "Unisex sizes. Proceeds support survivors.", sizes: ["XS", "S", "M", "L", "XL", "2XL"], colors: ["Plum", "Black"] },
  { id: "band", title: "Wristband 3-Pack", price: 12, rating: 4.5, reviews: 11, category: "Awareness Merch", image: "product-band", blurb: "Purple, cream, and black bands. No printed words.", detail: "Silicone, one size. Proceeds support survivors.", sizes: ["One size"], colors: ["Mixed"] },
];

export const shopCategories = ["Books", "Self-Care Kits", "Safety Gear", "Awareness Merch"];

export const causes = [
  { id: "housing", title: "Housing Fund", text: "Safe nights and rental help", image: "service-housing" },
  { id: "food", title: "Food & Clothing", text: "Pantry boxes and interview outfits", image: "service-food" },
  { id: "therapy", title: "Therapy Fund", text: "Counseling when insurance is not an option", image: "service-therapy" },
  { id: "defense", title: "Self-Defense Classes", text: "Scholarships for safety classes", image: "service-defense" },
  { id: "general", title: "Where Needed Most", text: "Staff direct the gift to the most urgent need", image: "hero-hands" },
];

export function impactLine(amount: number) {
  if (amount >= 250) return "$250 can fund a month of counseling support for one person.";
  if (amount >= 100) return "$100 can cover a self-defense class scholarship.";
  if (amount >= 50) return "$50 can provide interview clothing for a new job.";
  if (amount >= 25) return "$25 provides a week of groceries for a family.";
  return "$10 helps stock a personal care kit.";
}

export const supporters = [
  { name: "The Harper Family", note: "Monthly · Housing Fund", amount: "$200" },
  { name: "Northside Book Club", note: "Therapy Fund", amount: "$500" },
  { name: "Anonymous", note: "Where Needed Most", amount: "$1,000" },
  { name: "In honor of June", note: "Food & Clothing", amount: "$150" },
  { name: "Camille’s Run Club", note: "Self-Defense Classes", amount: "$320" },
];

export const gallery = [
  { id: "g1", album: "Workshops", image: "gallery-workshop", caption: "October healing circle setup before guests arrived.", date: "Oct 8, 2026" },
  { id: "g2", album: "Donation Drives", image: "gallery-drive", caption: "Saturday pantry and coat drive on Auburn Avenue.", date: "Oct 10, 2026" },
  { id: "g3", album: "Awareness Walks", image: "gallery-walk", caption: "Morning awareness walk in Piedmont Park.", date: "Oct 3, 2026" },
  { id: "g4", album: "Community", image: "gallery-ceremony", caption: "Empowerment ceremony for the fall cohort.", date: "Sep 26, 2026" },
  { id: "g5", album: "Events", image: "hero-hands", caption: "Hands-in at the volunteer welcome.", date: "Sep 19, 2026" },
  { id: "g6", album: "Workshops", image: "service-jobs", caption: "Resume Studio in the computer lab.", date: "Sep 16, 2026" },
  { id: "g7", album: "Workshops", image: "service-finance", caption: "Financial Foundations Saturday class.", date: "Sep 12, 2026" },
  { id: "g8", album: "Events", image: "service-defense", caption: "Self-defense basics, first evening of the series.", date: "Sep 9, 2026" },
  { id: "g9", album: "Donation Drives", image: "service-food", caption: "Food boxes packed for Tuesday pickup.", date: "Sep 8, 2026" },
  { id: "g10", album: "Donation Drives", image: "service-clothing", caption: "Interview outfits steamed for the closet.", date: "Aug 29, 2026" },
  { id: "g11", album: "Community", image: "onboarding-circle", caption: "Supporters gathering before the walk.", date: "Aug 22, 2026" },
  { id: "g12", album: "Community", image: "service-housing", caption: "A transitional apartment, ready for keys.", date: "Aug 15, 2026" },
  { id: "g13", album: "Workshops", image: "service-therapy", caption: "The counseling room on a quiet morning.", date: "Aug 11, 2026" },
  { id: "g14", album: "Events", image: "service-legal", caption: "Know Your Rights seminar room.", date: "Aug 6, 2026" },
  { id: "g15", album: "Awareness Walks", image: "onboarding-sunrise", caption: "Sunrise stretch before the August walk.", date: "Aug 1, 2026" },
  { id: "g16", album: "Community", image: "onboarding-phone", caption: "Client care testing the private chat line.", date: "Jul 24, 2026" },
];

export const albums = ["Events", "Workshops", "Donation Drives", "Awareness Walks", "Community"];

export const faqs = [
  { category: "About us", q: "Who is All Eyez Open?", a: "All Eyez Open, LLC is a community organization in Atlanta. We help domestic violence survivors settle into safer, more independent lives, and we welcome supporters, donors, and volunteers." },
  { category: "About us", q: "Do I have to share my story?", a: "No. You can use a nickname, browse as a guest, and skip any question. Staff will not ask for graphic detail." },
  { category: "Getting help", q: "What if I am in immediate danger?", a: "Call 911. You can also call the National Domestic Violence Hotline at 1-800-799-7233 or text START to 88788. Quick Exit is on every screen." },
  { category: "Getting help", q: "How do I book a consultation?", a: "Choose a type of help, the mode that feels safest, an optional specialist, and a time. You can say whether voicemail or text is safe." },
  { category: "Legal", q: "Is this legal advice?", a: "No. Lawyer replies and seminars are general information. A lawyer-client relationship starts only if you sign a separate engagement with that lawyer." },
  { category: "Legal", q: "Are attorneys verified?", a: "We confirm bar status for the jurisdictions shown on each profile. The badge means that check is current." },
  { category: "Donations", q: "Is my gift tax-deductible?", a: "All Eyez Open, LLC is organized for charitable community work. Receipts are emailed for your records. Ask your tax advisor about your own deduction." },
  { category: "Donations", q: "Can I give monthly?", a: "Yes. You can change or cancel a monthly gift from Donation History at any time." },
  { category: "Privacy & Safety", q: "What does Quick Exit do?", a: "One tap replaces the app with a neutral weather or notes screen. Press and hold the city name, or the Notes title, to return. Your data stays on the device." },
  { category: "Privacy & Safety", q: "Where is my safety plan stored?", a: "Only on this device. Delete Account or Clear Data removes it." },
  { category: "Shop & Orders", q: "Do purchases help survivors?", a: "Yes. Proceeds from books, kits, alarms, and merch support programs. Packaging can be discreet, with no organization name on the box." },
  { category: "Shop & Orders", q: "Can you ship to a PO Box?", a: "Yes. Checkout includes “Ship to a safe address or PO Box” and discreet packaging." },
];

export const seedReviews = [
  { id: "r1", name: "Marisol R.", stars: 5, title: "They let me go slowly", text: "Housing intake was calm. I used a nickname and left with a written plan, not pressure.", date: "Oct 12, 2026", verified: true, area: "Services", photo: false },
  { id: "r2", name: "Anonymous", stars: 5, title: "The circle felt safe", text: "I did not speak the first night. No one made that a problem. I came back the next week.", date: "Oct 4, 2026", verified: true, area: "Services", photo: false },
  { id: "r3", name: "Elena V.", stars: 5, title: "Resume studio", text: "I left with a one-page resume and language for a work gap that did not expose my private life.", date: "Sep 28, 2026", verified: true, area: "Services", photo: false },
  { id: "r4", name: "The Harper Family", stars: 5, title: "Clear receipts", text: "Monthly giving is simple, and the impact note tells us what the housing fund is doing.", date: "Sep 20, 2026", verified: true, area: "Shop", photo: false },
  { id: "r5", name: "Jonah P.", stars: 4, title: "Alarm arrived in a plain box", text: "Discreet packaging was exactly that. The demo card inside was easy to follow.", date: "Sep 14, 2026", verified: true, area: "Shop", photo: true },
  { id: "r6", name: "Anonymous", stars: 5, title: "Legal seminar", text: "I finally understood what the protective-order form was asking, without being told what to do.", date: "Sep 2, 2026", verified: true, area: "Services", photo: false },
  { id: "r7", name: "Dee P.", stars: 4, title: "Credit session", text: "Luis did not rush. We only looked at one bill. I want a second session next month.", date: "Aug 22, 2026", verified: false, area: "Services", photo: false },
];

export const shelters = [
  { name: "Partner shelter — north", area: "North metro", phone: "(404) 555-0160", note: "Call first. The address is shared only after a confidential screening." },
  { name: "Partner shelter — south", area: "South metro", phone: "(404) 555-0164", note: "Family rooms available. Ask for the after-hours line if it is past 5 p.m." },
  { name: "Transitional apartments", area: "City of Atlanta", phone: "(404) 555-0148", note: "Longer stays through All Eyez Open housing advocates." },
  { name: "Daytime community center", area: "Auburn Avenue", phone: "(404) 555-0148", note: "Public office for classes and consults. Not an overnight shelter." },
];

export const socials = [
  { id: "facebook", name: "Facebook", url: "https://www.facebook.com/search/pages?q=All%20Eyez%20Open" },
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/explore/search/keyword/?q=All%20Eyez%20Open" },
  { id: "x", name: "X", url: "https://x.com/search?q=All%20Eyez%20Open" },
  { id: "youtube", name: "YouTube", url: "https://www.youtube.com/results?search_query=All+Eyez+Open" },
  { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/search?q=All%20Eyez%20Open" },
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/search/results/all/?keywords=All%20Eyez%20Open" },
];

export const guidelines = [
  { title: "Respect", text: "Disagree kindly. No insults, slurs, or piling on." },
  { title: "Confidentiality", text: "Do not share another person’s story, photo, or contact information." },
  { title: "No identifying details", text: "Do not post your address, phone, workplace, school, or court case number." },
  { title: "No abuser contact", text: "Do not post someone else’s name in order to reach, shame, or locate them." },
  { title: "No solicitation", text: "No fundraising for personal accounts, no legal solicitation, no dating." },
  { title: "Care with hard topics", text: "Use the trigger-warning option. Skip graphic detail. Moderators may hide a post behind a tap." },
];

export const aboutSections = [
  { title: "Our mission", text: "Acclimating domestic violence survivors to healed lives and helping them reclaim their independence." },
  { title: "Our story", text: "All Eyez Open, LLC began as a living-room clothing closet and a borrowed office hour with one attorney. Neighbors kept showing up with food, spare rooms, and time. We incorporated so the help could be steady: housing partners, a pantry, counseling, classes, and a community that does not require a public story." },
  { title: "How we work", text: "Survivors choose what to use. Supporters give time and money. Lawyers who reply in the community are verified, and they label general information clearly. Nothing in the app replaces 911." },
];

export const impactStats = [
  { n: "1,200+", l: "Survivors supported" },
  { n: "300+", l: "Safe nights provided" },
  { n: "50+", l: "Volunteers" },
  { n: "20+", l: "Legal advisors" },
];

export const partners = ["Fulton community churches", "Metro pantry collective", "Atlanta career network", "Regional bar pro-bono night"];

export const careers = [
  { title: "Client Care Advocate", type: "Full-time · Atlanta", text: "Answer chat and phone with patience. Bilingual English/Spanish preferred." },
  { title: "Housing Navigator", type: "Full-time · Hybrid", text: "Coordinate shelter and transitional placements with partner agencies." },
  { title: "Volunteer shift lead", type: "Part-time · Weekends", text: "Guide pantry and closet volunteers through discreet pickup." },
];

export const policies = {
  privacy: [
    { title: "What this preview stores", text: "This demonstration keeps your profile, posts, cart, donations, and safety plan in local storage on this device. It does not send them to a server." },
    { title: "What we would collect in production", text: "A production app would collect the contact details you type, booking information, and gift records, and would explain each use at the moment you provide it." },
    { title: "Safety tools", text: "Quick Exit, Discreet Mode, and App Lock are device-side controls. Discreet Mode uses generic notification wording such as “You have a new update.”" },
    { title: "Your choices", text: "You may use a nickname, post anonymously, browse as a guest, download nothing, and delete the account data stored on this device." },
  ],
  terms: [
    { title: "Using the app", text: "All Eyez Open, LLC offers education, community, and referrals. We do not promise a shelter bed, a legal outcome, a job, or a clinical result." },
    { title: "Not legal, medical, or financial advice", text: "Content from lawyers, counselors, and coaches is general information unless you sign a separate agreement with that professional." },
    { title: "Community", text: "We may hide or remove posts that include identifying details, harassment, or graphic content. Repeated violations can lead to a block." },
    { title: "Shop & gifts", text: "Prices in this preview are samples. No real card is charged. Receipts are generated on this device for demonstration." },
  ],
  confidentiality: [
    { title: "Your story is yours", text: "Do not feel required to share history in order to receive food, clothing, classes, or a consult." },
    { title: "Staff", text: "Staff discuss a situation only with the teammates who need it to help you, and only with the contact method you mark as safe." },
    { title: "Limits", text: "We may need to act if a child is being harmed or if there is an immediate risk of death. Those limits are explained before a counseling relationship begins." },
    { title: "Community posts", text: "Public posts are visible to other people in the app. Anonymous posts hide your name and photo, but the words themselves can still identify you. Leave out addresses, numbers, and workplaces." },
  ],
};

export const quickActions = [
  { id: "book", label: "Book a Consultation", to: "/consult", icon: "calendar" },
  { id: "donate", label: "Donate Now", to: "/donate", icon: "heart" },
  { id: "services", label: "Services", to: "/services", icon: "grid" },
  { id: "community", label: "Community", to: "/community", icon: "people" },
  { id: "chat", label: "Chat with Us", to: "/chat", icon: "chat" },
  { id: "plan", label: "Safety Plan", to: "/safety-plan", icon: "shield" },
];

export const modules = [
  { id: "m1", title: "A first budget", detail: "Income you can count on, and the bills that must be paid this month." },
  { id: "m2", title: "Banking safely", detail: "Accounts in your name, statements, and alerts that do not put you at risk." },
  { id: "m3", title: "Credit, slowly", detail: "How to read a report and which steps are optional." },
  { id: "m4", title: "An independence plan", detail: "A 90-day sketch for housing, work, and a small emergency fund." },
];

export type ChatMessage = { id: string; from: "them" | "me"; text: string; time: string; kind?: "photo" | "file" };

export type Thread = {
  id: string;
  title: string;
  role: string;
  photo?: string;
  online?: boolean;
  unread: number;
  disappearing: boolean;
  messages: ChatMessage[];
};

export const seedThreads: Thread[] = [
  {
    id: "th-support",
    title: "Support Team",
    role: "Client care",
    photo: "avatar-ruth",
    online: true,
    unread: 1,
    disappearing: false,
    messages: [
      { id: "m1", from: "them", text: "You are not alone. I am Ruth on client care. What would be most useful right now?", time: "9:14 AM" },
      { id: "m2", from: "me", text: "I want to know how housing intake works before I call.", time: "9:16 AM" },
      { id: "m3", from: "them", text: "You have a new update waiting in Housing. I can also book a consult whenever you are ready.", time: "9:18 AM" },
    ],
  },
  {
    id: "th-amara",
    title: "Amara Wells",
    role: "Counselor",
    photo: "avatar-amara",
    online: false,
    unread: 0,
    disappearing: true,
    messages: [
      { id: "m4", from: "them", text: "Confirming our video conversation on Wed, Nov 4 at 2:00 PM ET. Camera optional.", time: "Mon" },
    ],
  },
  {
    id: "th-jordan",
    title: "Jordan Hale",
    role: "Attorney",
    photo: "avatar-jordan",
    online: false,
    unread: 0,
    disappearing: false,
    messages: [
      { id: "m5", from: "them", text: "I replied in the community thread with general information. If you want a private consult, book Legal Guidance. That still would not be representation until we agree in writing.", time: "Tue" },
    ],
  },
];

export const seedBookings = [
  { id: "AEO-2041", userId: "u-ariel", type: "counseling", mode: "video", specialistId: "sp-amara", date: "2026-11-04", time: "2:00 PM", name: "Ariel", phone: "(404) 555-0198", voicemail: false, textOk: true, contactTime: "Afternoon", language: "English", need: "I want to talk about sleep and a weekly routine.", urgency: "Soon", status: "upcoming" as const },
  { id: "AEO-1888", userId: "u-ariel", type: "housing", mode: "phone", specialistId: "sp-priya", date: "2026-10-12", time: "11:00 AM", name: "Ariel", phone: "(404) 555-0198", voicemail: false, textOk: false, contactTime: "Morning", language: "English", need: "Looking at transitional housing.", urgency: "Routine", status: "past" as const, rating: 5, review: "Priya was steady and clear." },
];

export const seedDonations = [
  { id: "DN-4412", userId: "u-ariel", amount: 25, fee: 0, total: 25, fund: "food", frequency: "One-time", date: "Oct 2, 2026", anonymous: false, honor: "", status: "Receipt sent" },
];

export const seedOrders = [
  {
    id: "AEO-1901",
    userId: "u-ariel",
    items: [{ productId: "al-key", title: "Personal Safety Alarm", qty: 1, price: 22, variant: "Purple" }],
    total: 22,
    status: "Shipped" as const,
    placed: "Oct 20, 2026",
    address: "PO Box 1184, Atlanta, GA 30303",
    discreet: true,
    timeline: ["Placed", "Packed", "Shipped"],
  },
  {
    id: "AEO-1842",
    userId: "u-ariel",
    items: [{ productId: "jn-ground", title: "Grounded Journal", qty: 1, price: 16, variant: "Natural" }],
    total: 16,
    status: "Delivered" as const,
    placed: "Sep 18, 2026",
    address: "PO Box 1184, Atlanta, GA 30303",
    discreet: true,
    timeline: ["Placed", "Packed", "Shipped", "Delivered"],
  },
];

export const seedNotices = [
  { id: "n1", userId: "u-ariel", type: "consult", title: "You have a new update", body: "A consultation reminder is ready.", time: "Today · 8:00 AM", group: "Today" },
  { id: "n2", userId: "u-ariel", type: "community", title: "You have a new update", body: "A verified professional replied in the community.", time: "Today · 7:10 AM", group: "Today" },
  { id: "n3", userId: "u-ariel", type: "order", title: "You have a new update", body: "An order update is available.", time: "Yesterday", group: "Earlier" },
  { id: "n4", userId: "u-ariel", type: "event", title: "You have a new update", body: "A program you follow is coming up.", time: "Mon", group: "Earlier" },
  { id: "n5", userId: "u-ariel", type: "donation", title: "You have a new update", body: "A donation receipt is ready.", time: "Oct 2", group: "Earlier" },
];

export const seedQuestions = [
  { id: "q1", userId: "u-ariel", name: "Ariel", email: "ariel@alleyezopen.org", category: "Getting help", question: "Can I attend the rights seminar online?", answer: "Yes. Register and choose the livestream. The private link arrives the morning of the seminar.", status: "Answered" as const },
];

export const safetyDefaults = {
  checks: [
    { id: "s1", label: "I know a door I can leave through", on: true },
    { id: "s2", label: "A neighbor knows I may need a quiet place to stand", on: false },
    { id: "s3", label: "I have a code word with someone I trust", on: true },
    { id: "s4", label: "Important numbers are saved under ordinary names", on: false },
    { id: "s5", label: "I will call 911 if I am in immediate danger", on: true },
  ],
  contacts: [
    { id: "ct1", name: "Trusted sister", phone: "(404) 555-0119" },
    { id: "ct2", name: "National hotline", phone: "1-800-799-7233" },
  ],
  bag: [
    { id: "b1", label: "Identification and birth certificates", on: true },
    { id: "b2", label: "Medications for a week", on: false },
    { id: "b3", label: "A change of clothes", on: true },
    { id: "b4", label: "Keys, transit card, and a little cash", on: false },
    { id: "b5", label: "Copies of court papers, if I choose to carry them", on: false },
    { id: "b6", label: "Comfort item for a child", on: true },
  ],
};

export const onboarding = [
  { image: "onboarding-sunrise", title: "You Are Not Alone", text: "Confidential, caring support for survivors of domestic violence, available whenever you need it." },
  { image: "onboarding-circle", title: "Rebuild Your Independence", text: "Housing, food, clothing, therapy, job readiness and financial literacy, all in one place." },
  { image: "onboarding-phone", title: "A Community That Stands With You", text: "Share safely, get guidance from verified legal professionals, and connect with people who understand." },
];

export const reportReasons = [
  "Identifying information",
  "Harassment",
  "Graphic or distressing detail",
  "Solicitation",
  "Someone is in immediate danger",
  "Other",
];

export const cancelReasons = ["Plans changed", "No longer need this consult", "Time is no longer safe", "Booked another way", "Other"];

export const sitemap = [
  ["Splash", "/"],
  ["Onboarding", "/onboarding"],
  ["Safety tips", "/safety-tips"],
  ["Welcome", "/welcome"],
  ["Log in", "/login"],
  ["Create account", "/register"],
  ["OTP verification", "/verify"],
  ["Forgot password", "/forgot"],
  ["Reset password", "/reset"],
  ["Set up safety", "/setup-safety"],
  ["Home", "/home"],
  ["Services", "/services"],
  ["Service detail", "/services/housing"],
  ["Book consultation", "/consult"],
  ["Consultation mode", "/consult/mode"],
  ["Choose specialist", "/consult/specialist"],
  ["Date and time", "/consult/when"],
  ["Your details", "/consult/details"],
  ["Review booking", "/consult/review"],
  ["Booking confirmed", "/consult/done"],
  ["My consultations", "/consultations"],
  ["Consultation detail", "/consultations/AEO-2041"],
  ["Join video call", "/call/AEO-2041"],
  ["Rate session", "/rate/AEO-1888"],
  ["Donate", "/donate"],
  ["Donor details", "/donate/details"],
  ["Payment", "/donate/pay"],
  ["Review gift", "/donate/review"],
  ["Thank you", "/donate/thanks"],
  ["Donation history", "/donations"],
  ["Recurring gift", "/donate/recurring/DN-4412"],
  ["Supporters", "/supporters"],
  ["Volunteer", "/volunteer"],
  ["Sponsorship", "/sponsor"],
  ["Community", "/community"],
  ["Post", "/community/p1"],
  ["New post", "/community/new"],
  ["Guidelines", "/guidelines"],
  ["Lawyer profile", "/lawyers/sp-jordan"],
  ["Professional queue", "/professional"],
  ["Q&A", "/qa"],
  ["Ask a question", "/qa/ask"],
  ["My questions", "/qa/mine"],
  ["Answer", "/questions/q1"],
  ["Gallery", "/gallery"],
  ["Album", "/gallery/Workshops"],
  ["Photo", "/photos/g1"],
  ["Programs", "/programs"],
  ["Program detail", "/programs/pr-circle"],
  ["Register", "/programs/pr-circle/register"],
  ["Ticket", "/ticket/pr-circle"],
  ["Shop", "/shop"],
  ["Product", "/shop/bk-heal"],
  ["Cart", "/cart"],
  ["Checkout", "/checkout"],
  ["Order confirmed", "/order-confirmed/AEO-1901"],
  ["My orders", "/orders"],
  ["Order detail", "/orders/AEO-1901"],
  ["Return request", "/orders/AEO-1842/return"],
  ["Chat", "/chat"],
  ["Conversation", "/chat/th-support"],
  ["Contact", "/contact"],
  ["Message sent", "/contact/sent"],
  ["My queries", "/queries"],
  ["Reviews", "/reviews"],
  ["Profile", "/profile"],
  ["Edit profile", "/profile/edit"],
  ["Saved posts", "/saved"],
  ["My posts", "/my-posts"],
  ["Settings", "/settings"],
  ["Notification settings", "/settings/notifications"],
  ["Privacy & security", "/settings/privacy"],
  ["Appearance", "/settings/appearance"],
  ["Accessibility", "/settings/accessibility"],
  ["Notifications", "/notifications"],
  ["Help & emergency", "/help"],
  ["Local shelters", "/shelters"],
  ["Safety plan", "/safety-plan"],
  ["About", "/about"],
  ["Impact", "/impact"],
  ["Team", "/team"],
  ["Careers", "/careers"],
  ["Privacy policy", "/privacy"],
  ["Terms of use", "/terms"],
  ["Confidentiality", "/confidentiality"],
  ["Social", "/social"],
  ["More", "/more"],
  ["Screen index", "/index-map"],
];
