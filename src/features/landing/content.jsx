export const SITE = {
  email: "Grilli@Satyahar.com",
  phone: "1800-22-4950",
  phoneHref: "tel:+11234567890",
  supportPhone: "9769823751",
  supportPhoneHref: "tel:+919769823751",
  github: "https://github.com/KushalNerpagar",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Scanner", href: "#/scanner" },
  { label: "About Us", href: "#about" },
  { label: "Recipe", href: "#/recipes" },
  { label: "Contact", href: "#contact" },
];

export const TOPBAR_ITEMS = [
  { icon: "location", text: "Place to be a Food literate.", wideOnly: true },
  { icon: "clock", text: "Improve food & life's quality", wideOnly: true },
  { icon: "phone", text: SITE.phone, href: SITE.phoneHref },
  { icon: "mail", text: SITE.email, href: `mailto:${SITE.email}` },
];

export const HERO_SLIDES = [
  {
    subtitle: "Traditional & Hygienic",
    title: (
      <>
        For the love of <br />
        delicious food
      </>
    ),
    text: "Eat more home made and traditional food, to be health rich.",
    cta: {
      label: "View Blog",
      href: "https://himalayarestaurant.com.au/the-health-benefits-of-traditional-indian-food/",
    },
    image: "images/hero-slider-1.jpg",
    imageSmall: "images/hero-slider-1-960.jpg",
  },
  {
    subtitle: "Delightful experience",
    title: (
      <>
        Flavors that bring joy <br />
        not illnesses.
      </>
    ),
    text: "Eat that which feels delightful, with proper food knowledge.",
    cta: { label: "View Blog", href: "#about" },
    image: "images/star1.jpg",
    imageSmall: "images/star1-960.jpg",
  },
  {
    subtitle: "Label Reading",
    title: (
      <>
        Where every product <br />
        keeps a secret.
      </>
    ),
    text: "Learn to read labels to avoid companies' fraud marketing.",
    cta: {
      label: "View Blog",
      href: "https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label",
    },
    image: "images/label-read.jpg",
    imageSmall: "images/label-read-960.jpg",
  },
];

export const SERVICES = [
  {
    title: "Recipe",
    href: "#/recipes",
    image: "images/service-1.jpg",
    alt: "Fresh ingredients ready to cook",
  },
  {
    title: "Recognize",
    href: "#/scanner",
    image: "images/1aiii (Custom).jpg",
    alt: "Scanning a food product barcode",
  },
  {
    title: "Label Read",
    href: "#/scanner",
    image: "images/label (Custom).png",
    alt: "Reading a nutrition label",
  },
];

export const NUTRI_SCORES = [
  {
    name: "24 Mantra Chana",
    image: "images/channa (Custom).jpeg",
    badge: "Top Snack",
    grade: "A",
    text: "Iron rich, high protein, low added sugars, low cholesterol & trans fat, and a rich source of fiber.",
  },
  {
    name: "Raw Coconut Water",
    image: "images/raw (Custom).jpeg",
    grade: "A",
    text: "Rich source of fiber, low added sugar, low carbs, low sodium.",
  },
  {
    name: "Real Fruit Power",
    image: "images/real (Custom).jpeg",
    grade: "C",
    text: "High total sugars, vitamin C rich, ultra-processed food, low fat.",
  },
  {
    name: "Alphino Oats",
    image: "images/ots (Custom).jpeg",
    badge: "New",
    grade: "A",
    text: "Rich source of fiber, low added sugar, low carbs.",
  },
  {
    name: "Parle-G Gluco Biscuits",
    image: "images/bisct (Custom).jpeg",
    grade: "B",
    text: "Good source of fiber, high calories, high saturated fat, high added sugar, low cholesterol.",
  },
  {
    name: "Cocacola",
    image: "images/coc (Custom).png",
    grade: "D",
    text: "High added sugar, low carbs, low fat.",
  },
];

export const FEATURES = [
  {
    icon: "images/features-icon-1.png",
    title: "Eat fresh & hygienic",
    text: "Always eat homemade and hygienic food.",
  },
  {
    icon: "images/features-icon-2.png",
    title: "Be aware",
    text: "Stay away from the fraudulent marketing of food.",
  },
  {
    icon: "images/features-icon-3.png",
    title: "Well-trained guides",
    text: "Help you choose the right, quality food.",
  },
  {
    icon: "images/features-icon-4.png",
    title: "Health care",
    text: "With the right choices and a little awareness, more life and fun.",
  },
];

export const UPDATES = [
  {
    date: "15/09/2024",
    datetime: "2024-09-15",
    category: "Food, Flavour",
    title: "Food and flavor unite to create memorable, nourishing experiences daily.",
    image: "images/event-1.jpg",
  },
  {
    date: "08/09/2024",
    datetime: "2024-09-08",
    category: "Healthy Food",
    title: "Healthy food nurtures your body, empowers your life, and inspires strength.",
    image: "images/event-2.jpg",
  },
  {
    date: "03/09/2024",
    datetime: "2024-09-03",
    category: "Recipe",
    title: "A recipe is a journey of love, flavor, and creativity.",
    image: "images/event-3.jpg",
  },
];

export const DONATION_PEOPLE = [1, 2, 3, 4, 5, 6, 7];

export const DONATION_TIMES = [
  "08 : 00 am",
  "09 : 00 am",
  "10 : 00 am",
  "11 : 00 am",
  "12 : 00 pm",
  "01 : 00 pm",
  "02 : 00 pm",
  "03 : 00 pm",
  "04 : 00 pm",
  "05 : 00 pm",
  "06 : 00 pm",
  "07 : 00 pm",
  "08 : 00 pm",
  "09 : 00 pm",
  "10 : 00 pm",
];

export const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Scanner", href: "#/scanner" },
  { label: "About Us", href: "#about" },
  { label: "Recipe", href: "#/recipes" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: SITE.github },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "X", href: "https://x.com" },
];
