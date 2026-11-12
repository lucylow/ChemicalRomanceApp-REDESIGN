import { useEffect, useMemo, useRef, useState } from "react";

type ElementData = {
  symbol: string;
  number: number;
  name: string;
  nickname: string;
  type: string;
  tagline: string;
  personality: string;
  color: string;
  colorDark: string;
  accent: string;
  mass: string;
  electron: string;
  valence: string;
  bonds: string;
  funFact: string;
  personalityMatch: number;
  chemistryMatch: number;
  chemistryNote: string;
  mood: "bright" | "cool" | "bold" | "soft";
};

const elements: ElementData[] = [
  {
    symbol: "O",
    number: 8,
    name: "Oxygen",
    nickname: "Oxy",
    type: "Reactive nonmetal",
    tagline: "Looking for someone who takes my breath away.",
    personality:
      "Energetic, essential, and a tiny bit dramatic. I bring life to every room—and combustion to the wrong one.",
    color: "#f38cad",
    colorDark: "#bc4f78",
    accent: "#ffd8e6",
    mass: "15.999 u",
    electron: "1s² 2s² 2p⁴",
    valence: "6 electrons",
    bonds: "Usually forms 2 covalent bonds; also forms O²⁻ in ionic compounds.",
    funFact: "About 21% of Earth’s atmosphere is oxygen, mostly as O₂.",
    personalityMatch: 94,
    chemistryMatch: 88,
    chemistryNote: "Strong covalent potential",
    mood: "bright",
  },
  {
    symbol: "Ne",
    number: 10,
    name: "Neon",
    nickname: "Neo",
    type: "Noble gas",
    tagline: "I glow differently, but I need lots of space.",
    personality:
      "Calm, luminous, and fiercely independent. I light up the night without getting attached too easily.",
    color: "#b09af3",
    colorDark: "#6953b0",
    accent: "#e4ddff",
    mass: "20.180 u",
    electron: "1s² 2s² 2p⁶",
    valence: "8 electrons",
    bonds: "A complete octet makes neon extremely unreactive under normal conditions.",
    funFact: "Neon signs glow reddish-orange; other “neon” colors usually use different gases.",
    personalityMatch: 87,
    chemistryMatch: 12,
    chemistryNote: "Great vibe, little reactivity",
    mood: "cool",
  },
  {
    symbol: "Na",
    number: 11,
    name: "Sodium",
    nickname: "Sodi",
    type: "Alkali metal",
    tagline: "I’m soft-hearted, salty, and ready to give.",
    personality:
      "Bold, generous, and quick to react. I’ll happily give away my outer electron for the right connection.",
    color: "#f5ae7b",
    colorDark: "#bb6f3d",
    accent: "#ffe4ce",
    mass: "22.990 u",
    electron: "[Ne] 3s¹",
    valence: "1 electron",
    bonds: "Readily loses one electron to form Na⁺ and ionic compounds such as NaCl.",
    funFact: "Pure sodium is soft enough to cut with a knife—but reacts dangerously with water.",
    personalityMatch: 79,
    chemistryMatch: 91,
    chemistryNote: "High ionic potential",
    mood: "bold",
  },
  {
    symbol: "C",
    number: 6,
    name: "Carbon",
    nickname: "Carby",
    type: "Versatile nonmetal",
    tagline: "Four bonds, endless possibilities. Let’s build something.",
    personality:
      "Creative, grounded, and wildly adaptable. From diamonds to DNA, I’m always becoming something new.",
    color: "#78c9bc",
    colorDark: "#378b82",
    accent: "#d6f5ef",
    mass: "12.011 u",
    electron: "1s² 2s² 2p²",
    valence: "4 electrons",
    bonds: "Forms up to 4 covalent bonds and stable chains, rings, and networks.",
    funFact: "Carbon’s ability to bond with itself is the foundation of organic chemistry.",
    personalityMatch: 91,
    chemistryMatch: 96,
    chemistryNote: "Exceptional bond potential",
    mood: "soft",
  },
];

type PeriodicElement = {
  number: number;
  symbol: string;
  name: string;
  period: number;
  group: number;
  family: string;
};

const elementNames = [
  "Hydrogen|H",
  "Helium|He",
  "Lithium|Li",
  "Beryllium|Be",
  "Boron|B",
  "Carbon|C",
  "Nitrogen|N",
  "Oxygen|O",
  "Fluorine|F",
  "Neon|Ne",
  "Sodium|Na",
  "Magnesium|Mg",
  "Aluminium|Al",
  "Silicon|Si",
  "Phosphorus|P",
  "Sulfur|S",
  "Chlorine|Cl",
  "Argon|Ar",
  "Potassium|K",
  "Calcium|Ca",
  "Scandium|Sc",
  "Titanium|Ti",
  "Vanadium|V",
  "Chromium|Cr",
  "Manganese|Mn",
  "Iron|Fe",
  "Cobalt|Co",
  "Nickel|Ni",
  "Copper|Cu",
  "Zinc|Zn",
  "Gallium|Ga",
  "Germanium|Ge",
  "Arsenic|As",
  "Selenium|Se",
  "Bromine|Br",
  "Krypton|Kr",
  "Rubidium|Rb",
  "Strontium|Sr",
  "Yttrium|Y",
  "Zirconium|Zr",
  "Niobium|Nb",
  "Molybdenum|Mo",
  "Technetium|Tc",
  "Ruthenium|Ru",
  "Rhodium|Rh",
  "Palladium|Pd",
  "Silver|Ag",
  "Cadmium|Cd",
  "Indium|In",
  "Tin|Sn",
  "Antimony|Sb",
  "Tellurium|Te",
  "Iodine|I",
  "Xenon|Xe",
  "Caesium|Cs",
  "Barium|Ba",
  "Lanthanum|La",
  "Cerium|Ce",
  "Praseodymium|Pr",
  "Neodymium|Nd",
  "Promethium|Pm",
  "Samarium|Sm",
  "Europium|Eu",
  "Gadolinium|Gd",
  "Terbium|Tb",
  "Dysprosium|Dy",
  "Holmium|Ho",
  "Erbium|Er",
  "Thulium|Tm",
  "Ytterbium|Yb",
  "Lutetium|Lu",
  "Hafnium|Hf",
  "Tantalum|Ta",
  "Tungsten|W",
  "Rhenium|Re",
  "Osmium|Os",
  "Iridium|Ir",
  "Platinum|Pt",
  "Gold|Au",
  "Mercury|Hg",
  "Thallium|Tl",
  "Lead|Pb",
  "Bismuth|Bi",
  "Polonium|Po",
  "Astatine|At",
  "Radon|Rn",
  "Francium|Fr",
  "Radium|Ra",
  "Actinium|Ac",
  "Thorium|Th",
  "Protactinium|Pa",
  "Uranium|U",
  "Neptunium|Np",
  "Plutonium|Pu",
  "Americium|Am",
  "Curium|Cm",
  "Berkelium|Bk",
  "Californium|Cf",
  "Einsteinium|Es",
  "Fermium|Fm",
  "Mendelevium|Md",
  "Nobelium|No",
  "Lawrencium|Lr",
  "Rutherfordium|Rf",
  "Dubnium|Db",
  "Seaborgium|Sg",
  "Bohrium|Bh",
  "Hassium|Hs",
  "Meitnerium|Mt",
  "Darmstadtium|Ds",
  "Roentgenium|Rg",
  "Copernicium|Cn",
  "Nihonium|Nh",
  "Flerovium|Fl",
  "Moscovium|Mc",
  "Livermorium|Lv",
  "Tennessine|Ts",
  "Oganesson|Og",
];

const periodGroups = [
  [1, 18],
  [1, 2, 13, 14, 15, 16, 17, 18],
  [1, 2, 13, 14, 15, 16, 17, 18],
  Array.from({ length: 18 }, (_, index) => index + 1),
  Array.from({ length: 18 }, (_, index) => index + 1),
  [1, 2, 3, ...Array.from({ length: 15 }, (_, index) => index + 4)],
  [1, 2, 3, ...Array.from({ length: 15 }, (_, index) => index + 4)],
];

function getFamily(number: number, group: number) {
  if (number >= 57 && number <= 71) return "lanthanide";
  if (number >= 89 && number <= 103) return "actinide";
  if (group === 18) return "noble gas";
  if (group === 17) return "halogen";
  if (group === 1 && number !== 1) return "alkali metal";
  if (group === 2) return "alkaline earth";
  if (
    (number >= 21 && number <= 30) ||
    (number >= 39 && number <= 48) ||
    (number >= 72 && number <= 80) ||
    (number >= 104 && number <= 112)
  )
    return "transition metal";
  if ([5, 14, 32, 33, 51, 52, 84].includes(number)) return "metalloid";
  if ([1, 6, 7, 8, 15, 16, 34].includes(number)) return "nonmetal";
  return "post-transition";
}

const periodicElements: PeriodicElement[] = (() => {
  let number = 0;
  return periodGroups.flatMap((groups, periodIndex) =>
    groups.map((group) => {
      number += 1;
      if (periodIndex === 5 && number === 58) number = 72;
      if (periodIndex === 6 && number === 90) number = 104;
      const [name, symbol] = elementNames[number - 1].split("|");
      return {
        number,
        symbol,
        name,
        period: periodIndex + 1,
        group,
        family: getFamily(number, group),
      };
    }),
  );
})();

const fBlockElements: PeriodicElement[] = [
  ...Array.from({ length: 15 }, (_, index) => index + 57),
  ...Array.from({ length: 15 }, (_, index) => index + 89),
].map((number) => {
  const [name, symbol] = elementNames[number - 1].split("|");
  return {
    number,
    symbol,
    name,
    period: number < 89 ? 6 : 7,
    group: 3,
    family: number < 89 ? "lanthanide" : "actinide",
  };
});

type IconName =
  | "heart"
  | "close"
  | "spark"
  | "chat"
  | "cards"
  | "users"
  | "back"
  | "send"
  | "info"
  | "bolt"
  | "flask"
  | "atom"
  | "grid"
  | "trophy"
  | "search"
  | "refresh"
  | "check"
  | "lock";

function Icon({
  name,
  size = 24,
  filled = false,
}: {
  name: IconName;
  size?: number;
  filled?: boolean;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    close: <path d="M18 6 6 18M6 6l12 12" />,
    spark: (
      <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3ZM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
    ),
    chat: (
      <path d="M21 14a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 0 1 3 11V9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v5Z" />
    ),
    cards: (
      <path d="M5 4h12a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2V4Zm14 3h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9" />
    ),
    users: (
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    ),
    back: <path d="m15 18-6-6 6-6" />,
    send: <path d="m22 2-7 20-4-9-9-4 20-7Zm-11 11L22 2" />,
    info: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-6v-5m0-3h.01" />,
    bolt: <path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z" />,
    flask: (
      <path d="M9 3h6m-5 0v6l-5.5 9.4A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.6L14 9V3M7 15h10" />
    ),
    atom: (
      <>
        <circle cx="12" cy="12" r="1.5" />
        <path d="M19.1 4.9c2 2-1.6 8.8-5.4 12.6s-7.1 5.3-8.8 3.6c-2-2 1.6-8.8 5.4-12.6s7.1-5.3 8.8-3.6Z" />
        <path d="M4.9 4.9c-2 2 1.6 8.8 5.4 12.6s7.1 5.3 8.8 3.6c2-2-1.6-8.8-5.4-12.6S6.6 3.2 4.9 4.9Z" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    trophy: (
      <path d="M8 21h8m-4-4v4M7 4h10v4a5 5 0 0 1-10 0V4Zm0 2H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4" />
    ),
    search: <path d="m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />,
    refresh: <path d="M20 7h-6V1M4 17h6v6M19 12a7 7 0 0 0-12-5L4 10m16 4-3 3a7 7 0 0 1-12-5" />,
    check: <path d="m5 12 4 4L19 6" />,
    lock: <path d="M6 10h12v11H6V10Zm3 0V7a3 3 0 0 1 6 0v3" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Character({ element, compact = false }: { element: ElementData; compact?: boolean }) {
  const { color, colorDark, accent, symbol } = element;
  const skin =
    symbol === "Ne"
      ? "#9b624f"
      : symbol === "C"
        ? "#704738"
        : symbol === "Na"
          ? "#f3c6aa"
          : "#f6cbb7";
  const skinShadow =
    symbol === "Ne"
      ? "#754538"
      : symbol === "C"
        ? "#553126"
        : symbol === "Na"
          ? "#dda88d"
          : "#dfa994";

  return (
    <svg
      className={compact ? "character compact" : "character"}
      viewBox="0 0 320 280"
      role="img"
      aria-label={`${element.name} anime character`}
    >
      <defs>
        <linearGradient id={`hair-${symbol}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={accent} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient id={`shirt-${symbol}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={color} />
          <stop offset="1" stopColor={colorDark} />
        </linearGradient>
        <radialGradient id={`aura-${symbol}`}>
          <stop stopColor="white" stopOpacity=".8" />
          <stop offset=".55" stopColor={accent} stopOpacity=".3" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <filter id={`shadow-${symbol}`}>
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor={colorDark} floodOpacity=".18" />
        </filter>
      </defs>

      <circle cx="160" cy="139" r="128" fill={`url(#aura-${symbol})`} />
      <g
        className={`character-motif motif-${symbol.toLowerCase()}`}
        opacity=".62"
        fill="none"
        stroke={color}
        strokeWidth="2"
      >
        {symbol === "O" && (
          <>
            <circle cx="56" cy="115" r="13" />
            <circle cx="79" cy="67" r="6" />
            <circle cx="258" cy="104" r="18" />
            <circle cx="274" cy="61" r="5" />
            <text
              x="59"
              y="120"
              textAnchor="middle"
              fill={color}
              stroke="none"
              fontSize="11"
              fontWeight="900"
            >
              O₂
            </text>
          </>
        )}
        {symbol === "Ne" && (
          <>
            <path d="M42 87h39l-20 22h34M239 55h35l-18 20h28" strokeLinecap="round" />
            <circle cx="53" cy="181" r="5" fill={color} />
            <circle cx="265" cy="156" r="8" />
          </>
        )}
        {symbol === "Na" && (
          <>
            <path
              d="m58 62-13 27h17l-8 22 29-35H66l10-14M256 95l-12 22h14l-7 18 25-29h-16l8-11"
              strokeLinejoin="round"
            />
            <circle cx="61" cy="172" r="7" fill={color} />
          </>
        )}
        {symbol === "C" && (
          <>
            <path d="M51 75h35l18 30-18 30H51l-18-30 18-30ZM242 69h28l14 24-14 24h-28l-14-24 14-24Z" />
            <path d="M86 105h40M215 93h27" strokeDasharray="3 4" />
          </>
        )}
      </g>

      <g className="character-float" filter={`url(#shadow-${symbol})`}>
        {symbol === "O" && (
          <>
            <path
              d="M67 279c4-49 29-73 72-81l21 24 21-24c42 8 68 32 72 81Z"
              fill={`url(#shirt-${symbol})`}
            />
            <path
              d="M116 207c10-8 21-12 32-13l12 28-23 29-27-35 6-9ZM204 207c-10-8-21-12-32-13l-12 28 23 29 27-35-6-9Z"
              fill="#fff8fb"
            />
            <path d="M143 175h34v37c-10 10-24 10-34 0Z" fill={skinShadow} />
            <path
              d="M91 101c-25 22-25 88 13 116 8-13 14-30 14-48l-7-55-20-13ZM229 101c25 22 25 88-13 116-8-13-14-30-14-48l7-55 20-13Z"
              fill={colorDark}
            />
            <path
              d="M105 72c-26-22-50 4-35 23 8 10 26 10 39-4M215 72c26-22 50 4 35 23-8 10-26 10-39-4"
              fill={color}
            />
            <circle cx="96" cy="78" r="17" fill={`url(#hair-${symbol})`} />
            <circle cx="224" cy="78" r="17" fill={`url(#hair-${symbol})`} />
            <ellipse cx="160" cy="129" rx="57" ry="67" fill={skin} />
            <ellipse cx="105" cy="140" rx="8" ry="14" fill={skinShadow} />
            <ellipse cx="215" cy="140" rx="8" ry="14" fill={skinShadow} />
            <path
              d="M103 125C98 65 127 39 163 41c42 2 68 31 54 87-15-8-26-27-31-45-18 24-46 37-83 42Z"
              fill={`url(#hair-${symbol})`}
            />
            <path
              d="M113 80c6-22 21-38 43-40-12 13-10 24-2 33-14-6-27-4-41 7Z"
              fill="white"
              opacity=".35"
            />
            <path
              d="M119 125c9-7 18-7 27 0M174 125c8-7 18-7 27 0"
              stroke={colorDark}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <ellipse cx="134" cy="140" rx="9" ry="13" fill="#56374f" />
            <path
              d="M176 140c5 5 12 5 17 0"
              stroke="#56374f"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="137" cy="136" r="3.3" fill="white" />
            <ellipse cx="120" cy="159" rx="13" ry="6" fill={color} opacity=".27" />
            <ellipse cx="199" cy="159" rx="13" ry="6" fill={color} opacity=".27" />
            <path d="M148 166c8 10 18 10 25 0-7 3-17 3-25 0Z" fill="#b85976" />
            <path
              d="m91 99-12-14M229 99l12-14"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="113" cy="215" r="8" fill="#fff" />
            <circle cx="207" cy="215" r="8" fill="#fff" />
            <path d="M149 226h22v42h-22z" fill="#fff" opacity=".9" />
          </>
        )}

        {symbol === "Ne" && (
          <>
            <path d="M70 279c5-50 34-76 78-81l12 24 12-24c44 5 73 31 78 81Z" fill="#392f5f" />
            <path
              d="M78 276c8-32 21-51 42-63l18 66H78ZM242 276c-8-32-21-51-42-63l-18 66h60Z"
              fill={`url(#shirt-${symbol})`}
            />
            <path d="M141 175h35v38c-9 9-25 9-35 0Z" fill={skinShadow} />
            <path
              d="M104 102c-20 25-20 74 5 105l22-17 68 12 17-19c17-43 6-87-19-105-26-18-72-7-93 24Z"
              fill="#49387c"
            />
            <ellipse cx="158" cy="130" rx="55" ry="67" fill={skin} />
            <ellipse cx="106" cy="141" rx="8" ry="14" fill={skinShadow} />
            <ellipse cx="211" cy="141" rx="8" ry="14" fill={skinShadow} />
            <path
              d="M102 129c-5-58 24-91 61-93 40-2 67 28 55 86-17-6-31-19-41-38-8 23-28 36-45 45l-3-30c-7 15-15 24-27 30Z"
              fill={`url(#hair-${symbol})`}
            />
            <path
              d="M163 37c34-2 61 25 57 67-18-23-34-35-58-40-18-4-34 3-52 19 8-30 27-44 53-46Z"
              fill="#ddd5ff"
              opacity=".45"
            />
            <path
              d="M112 115c20-12 46-14 67-8l25 8-4 25c-7 8-20 8-28 0l-4-20c-7-3-14-3-21 0l-5 20c-7 8-20 8-27 0l-3-25Z"
              fill="#cefbff"
              opacity=".5"
              stroke="#7c62cb"
              strokeWidth="3"
            />
            <path d="M147 120c7-3 14-3 21 0" stroke="#7c62cb" strokeWidth="3" />
            <ellipse cx="129" cy="130" rx="6" ry="9" fill="#37294e" />
            <ellipse cx="185" cy="130" rx="6" ry="9" fill="#37294e" />
            <circle cx="131" cy="127" r="2" fill="#fff" />
            <circle cx="187" cy="127" r="2" fill="#fff" />
            <path
              d="M146 165c8 4 17 4 25-1"
              stroke="#703e50"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="207" cy="154" r="4" fill="#d8cbff" />
            <circle cx="207" cy="166" r="3" fill="#d8cbff" />
            <path d="M135 217c14 12 35 12 49 0" fill="none" stroke="#d6c8ff" strokeWidth="5" />
            <path d="M153 225h14v53h-14z" fill="#a88cef" />
            <path
              d="M92 256h35M193 256h35"
              stroke="#8e76d6"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        )}

        {symbol === "Na" && (
          <>
            <path
              d="M66 279c7-50 39-75 82-80l12 22 12-22c43 5 75 30 82 80Z"
              fill={`url(#shirt-${symbol})`}
            />
            <path
              d="M81 277c7-31 19-52 38-64l21 66H81ZM239 277c-7-31-19-52-38-64l-21 66h59Z"
              fill="#fff5e9"
            />
            <path d="M143 174h34v38c-9 9-25 9-34 0Z" fill={skinShadow} />
            <path
              d="M102 108c-11 47 4 85 28 101l60-2c24-18 36-60 25-101-15-54-98-53-113 2Z"
              fill={colorDark}
            />
            <ellipse cx="160" cy="130" rx="56" ry="65" fill={skin} />
            <ellipse cx="106" cy="140" rx="8" ry="14" fill={skinShadow} />
            <ellipse cx="214" cy="140" rx="8" ry="14" fill={skinShadow} />
            <path
              d="M102 127c-8-37 6-73 37-83l3-19 14 16 17-25 4 26 27-13-10 24c24 20 27 48 23 75-15-8-23-23-29-41-19 22-48 34-86 40Z"
              fill={`url(#hair-${symbol})`}
            />
            <path
              d="M120 71c19-22 46-27 71-14-23 1-42 12-57 31-5-8-9-13-14-17Z"
              fill="#ffe4c7"
              opacity=".46"
            />
            <path
              d="M119 124c8-6 17-6 25 0M176 124c8-6 17-6 25 0"
              stroke="#6c453e"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <ellipse cx="134" cy="139" rx="8" ry="11" fill="#4b3b48" />
            <ellipse cx="187" cy="139" rx="8" ry="11" fill="#4b3b48" />
            <circle cx="137" cy="136" r="3" fill="#fff" />
            <circle cx="190" cy="136" r="3" fill="#fff" />
            <g fill="#b97863" opacity=".7">
              <circle cx="117" cy="157" r="1.7" />
              <circle cx="124" cy="160" r="1.5" />
              <circle cx="130" cy="157" r="1.4" />
              <circle cx="190" cy="157" r="1.4" />
              <circle cx="197" cy="160" r="1.5" />
              <circle cx="204" cy="157" r="1.7" />
            </g>
            <path d="M145 165c9 13 22 13 31 0-9 5-22 5-31 0Z" fill="#9b4b49" />
            <path d="M151 170c6 4 13 4 19 0" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <path d="m122 202 38 26 38-26 13 14-24 20-27-8-27 8-24-20 13-14Z" fill="#fff" />
            <path d="M128 239h64M160 228v51" stroke={colorDark} strokeWidth="4" opacity=".45" />
            <path
              d="m84 239 15-14M236 239l-15-14"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        )}

        {symbol === "C" && (
          <>
            <path d="M68 279c5-47 35-73 77-80l15 26 15-26c42 7 72 33 77 80Z" fill="#f7f4f0" />
            <path
              d="M96 279c7-33 17-55 35-71l29 17 29-17c18 16 28 38 35 71Z"
              fill={`url(#shirt-${symbol})`}
            />
            <path d="M143 175h34v38c-9 9-25 9-34 0Z" fill={skinShadow} />
            <g fill={colorDark}>
              <circle cx="109" cy="86" r="27" />
              <circle cx="133" cy="61" r="26" />
              <circle cx="165" cy="55" r="27" />
              <circle cx="194" cy="65" r="27" />
              <circle cx="215" cy="93" r="26" />
              <circle cx="108" cy="126" r="25" />
              <circle cx="212" cy="130" r="25" />
              <circle cx="119" cy="166" r="24" />
              <circle cx="202" cy="168" r="24" />
            </g>
            <ellipse cx="160" cy="130" rx="56" ry="66" fill={skin} />
            <ellipse cx="107" cy="141" rx="8" ry="14" fill={skinShadow} />
            <ellipse cx="213" cy="141" rx="8" ry="14" fill={skinShadow} />
            <g fill={`url(#hair-${symbol})`}>
              <circle cx="111" cy="90" r="25" />
              <circle cx="135" cy="62" r="25" />
              <circle cx="165" cy="56" r="26" />
              <circle cx="194" cy="68" r="25" />
              <circle cx="211" cy="98" r="23" />
              <circle cx="116" cy="112" r="23" />
            </g>
            <path
              d="M118 124c8-6 17-6 25 0M177 124c8-6 17-6 25 0"
              stroke="#412d2b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="134" cy="140" r="17" fill="none" stroke="#315d5c" strokeWidth="4" />
            <circle cx="187" cy="140" r="17" fill="none" stroke="#315d5c" strokeWidth="4" />
            <path d="M151 140h19" stroke="#315d5c" strokeWidth="4" />
            <ellipse cx="134" cy="140" rx="6" ry="9" fill="#272530" />
            <ellipse cx="187" cy="140" rx="6" ry="9" fill="#272530" />
            <circle cx="136" cy="137" r="2" fill="#fff" />
            <circle cx="189" cy="137" r="2" fill="#fff" />
            <path
              d="M148 166c8 8 18 8 25 0"
              stroke="#512e32"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="m203 50 7 11 13 2-9 9 2 13-13-6-11 6 2-13-9-9 13-2 5-11Z"
              fill="#dff7f2"
              stroke={colorDark}
              strokeWidth="2"
            />
            <path
              d="M106 218 91 278h38l8-65M214 218l15 60h-38l-8-65"
              fill="#fff"
              stroke="#dce7e4"
              strokeWidth="2"
            />
            <path d="M151 229h18v50h-18z" fill="#334a52" />
            <g fill="#fff">
              <circle cx="108" cy="243" r="3" />
              <circle cx="214" cy="243" r="3" />
            </g>
            <path d="M211 226h17v11h-17z" fill="#d6f5ef" stroke={colorDark} strokeWidth="2" />
          </>
        )}

        <g className="element-medallion">
          <circle cx="160" cy="251" r="18" fill="white" opacity=".94" />
          <circle
            cx="160"
            cy="251"
            r="14"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity=".5"
          />
          <text
            x="160"
            y="257"
            textAnchor="middle"
            fontFamily="Nunito, sans-serif"
            fontWeight="900"
            fontSize={symbol.length > 1 ? "13" : "17"}
            fill={colorDark}
          >
            {symbol}
          </text>
        </g>
      </g>
    </svg>
  );
}

function Compatibility({ element }: { element: ElementData }) {
  return (
    <div className="compatibility">
      <div className="compat-item">
        <span className="compat-icon personality">
          <Icon name="heart" size={15} filled />
        </span>
        <span>
          <small>PERSONALITY</small>
          <strong>{element.personalityMatch}%</strong>
        </span>
      </div>
      <div className="compat-divider" />
      <div className="compat-item">
        <span className="compat-icon chemical">
          <Icon name="flask" size={15} />
        </span>
        <span>
          <small>CHEMISTRY</small>
          <strong>{element.chemistryMatch}%</strong>
        </span>
      </div>
    </div>
  );
}

function ElementCard({
  element,
  style,
  onOpen,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  element: ElementData;
  style?: React.CSSProperties;
  onOpen: () => void;
  onPointerDown?: React.PointerEventHandler;
  onPointerMove?: React.PointerEventHandler;
  onPointerUp?: React.PointerEventHandler;
}) {
  return (
    <article
      className="element-card"
      style={
        {
          ...style,
          "--card-color": element.color,
          "--card-accent": element.accent,
        } as React.CSSProperties
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="card-topline">
        <span className="element-type">{element.type}</span>
        <button
          className="icon-plain"
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
          aria-label={`View ${element.name} profile`}
        >
          <Icon name="info" size={21} />
        </button>
      </div>
      <div className="element-tile">
        <small>{element.number}</small>
        <strong>{element.symbol}</strong>
        <span>{element.name}</span>
      </div>
      <div className="character-wrap">
        <span className="sparkle s1">
          <Icon name="spark" size={24} filled />
        </span>
        <span className="sparkle s2">
          <Icon name="spark" size={17} />
        </span>
        <Character element={element} />
      </div>
      <div className="card-copy">
        <div className="name-line">
          <div>
            <h2>{element.nickname}</h2>
            <p>
              {element.name} · #{element.number}
            </p>
          </div>
          <span className="online-pill">
            <i /> REACTIVE
          </span>
        </div>
        <p className="tagline">“{element.tagline}”</p>
        <Compatibility element={element} />
        <div className="chemistry-note">
          <Icon name="atom" size={16} /> {element.chemistryNote}
        </div>
      </div>
    </article>
  );
}

function MatchModal({
  element,
  onClose,
  onChat,
}: {
  element: ElementData;
  onClose: () => void;
  onChat: () => void;
}) {
  return (
    <div
      className="overlay celebration"
      role="dialog"
      aria-modal="true"
      aria-label={`You matched with ${element.name}`}
    >
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="match-orbit orbit-one" />
      <div className="match-orbit orbit-two" />
      <button className="overlay-close" onClick={onClose} aria-label="Close">
        <Icon name="close" />
      </button>
      <div className="match-content">
        <p className="eyebrow">
          <Icon name="spark" size={16} /> A NEW BOND FORMED
        </p>
        <h2>It’s a reaction!</h2>
        <p>You and {element.nickname} have serious chemistry.</p>
        <div className="match-portraits">
          <div className="mini-avatar user-avatar">
            <span>YOU</span>
          </div>
          <span className="match-heart">
            <Icon name="heart" size={32} filled />
          </span>
          <div className="mini-avatar element-avatar" style={{ background: element.accent }}>
            <Character element={element} compact />
          </div>
        </div>
        <div className="bond-readout">
          <div>
            <span>PERSONALITY</span>
            <strong>{element.personalityMatch}%</strong>
          </div>
          <div>
            <span>CHEMISTRY</span>
            <strong>{element.chemistryMatch}%</strong>
          </div>
        </div>
        <button className="primary-button" onClick={onChat}>
          <Icon name="chat" size={20} filled /> Send a message
        </button>
        <button className="text-button" onClick={onClose}>
          Keep discovering
        </button>
      </div>
    </div>
  );
}

function Profile({
  element,
  onBack,
  onChat,
}: {
  element: ElementData;
  onBack: () => void;
  onChat: () => void;
}) {
  const facts = [
    ["Atomic mass", element.mass],
    ["Electron config.", element.electron],
    ["Valence shell", element.valence],
    ["Bonding style", element.bonds],
  ];
  return (
    <div className="screen-page profile-page">
      <header className="sub-header">
        <button className="circle-small" onClick={onBack} aria-label="Back">
          <Icon name="back" />
        </button>
        <span>Element profile</span>
        <button className="circle-small">
          <Icon name="heart" size={19} />
        </button>
      </header>
      <section
        className="profile-hero"
        style={{ "--hero": element.color, "--hero-soft": element.accent } as React.CSSProperties}
      >
        <div className="profile-symbol">
          <small>{element.number}</small>
          <strong>{element.symbol}</strong>
        </div>
        <Character element={element} />
        <div className="profile-title">
          <span>{element.type}</span>
          <h1>{element.nickname}</h1>
          <p>
            {element.name} · Atomic no. {element.number}
          </p>
        </div>
      </section>
      <main className="profile-body">
        <Compatibility element={element} />
        <section className="profile-section">
          <p className="section-kicker">PERSONALITY</p>
          <h3>A little about me</h3>
          <p>{element.personality}</p>
        </section>
        <section className="profile-section">
          <p className="section-kicker">ELEMENTAL DETAILS</p>
          <h3>My chemistry</h3>
          <div className="facts-grid">
            {facts.map(([label, value], index) => (
              <div className={index === 3 ? "fact wide" : "fact"} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="fun-fact">
          <span>
            <Icon name="spark" size={20} />
          </span>
          <div>
            <small>FUN FACT</small>
            <p>{element.funFact}</p>
          </div>
        </section>
        <button className="primary-button profile-chat" onClick={onChat}>
          <Icon name="chat" size={20} filled /> Chat with {element.nickname}
        </button>
      </main>
    </div>
  );
}

function Matches({
  onProfile,
  onChat,
}: {
  onProfile: (e: ElementData) => void;
  onChat: (e: ElementData) => void;
}) {
  return (
    <div className="tab-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">YOUR COLLECTION</p>
          <h1>New bonds</h1>
        </div>
        <span className="count-badge">4 / 118</span>
      </header>
      <div className="collection-summary">
        <div className="summary-orbit">
          <Icon name="atom" size={30} />
        </div>
        <div>
          <strong>Bond streak: 4</strong>
          <span>Your collection is growing beautifully.</span>
        </div>
      </div>
      <section>
        <div className="section-row">
          <h2>Recent matches</h2>
          <span>See all</span>
        </div>
        <div className="match-grid">
          {elements.map((element, i) => (
            <button
              className="match-card"
              key={element.symbol}
              style={
                { "--match": element.color, "--match-soft": element.accent } as React.CSSProperties
              }
              onClick={() => onProfile(element)}
            >
              {i < 2 && <span className="new-dot">NEW</span>}
              <Character element={element} compact />
              <div>
                <strong>{element.nickname}</strong>
                <small>
                  {element.symbol} · {element.chemistryMatch}% chemistry
                </small>
              </div>
              <span
                className="chat-bubble"
                onClick={(event) => {
                  event.stopPropagation();
                  onChat(element);
                }}
              >
                <Icon name="chat" size={17} filled />
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="messages-section">
        <div className="section-row">
          <h2>Messages</h2>
          <span>3 active</span>
        </div>
        {elements.slice(0, 3).map((element, i) => (
          <button className="message-row" key={element.symbol} onClick={() => onChat(element)}>
            <div className="row-avatar" style={{ background: element.accent }}>
              <Character element={element} compact />
              <i />
            </div>
            <div className="row-copy">
              <strong>{element.nickname}</strong>
              <span>
                {i === 0
                  ? "Are you made of copper and tellurium?"
                  : i === 1
                    ? "My valence shell is full, but my schedule isn’t."
                    : "Want to form something stable?"}
              </span>
            </div>
            <div className="row-meta">
              <small>{i === 0 ? "Now" : `${i + 1}m`}</small>
              {i < 2 && <b>{i + 1}</b>}
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}

const starters = ["What’s your ideal bond?", "Tell me a chemistry fact.", "What makes you react?"];

function Chat({
  element,
  onBack,
  onProfile,
}: {
  element: ElementData;
  onBack: () => void;
  onProfile: () => void;
}) {
  const initial = useMemo(
    () => [
      {
        from: "them",
        text:
          element.symbol === "Ne"
            ? "My valence shell is full, but I made room in my schedule for you."
            : `Hey! I felt a real reaction when we matched.`,
      },
      {
        from: "them",
        text:
          element.symbol === "O"
            ? "Want to hear why I usually make two bonds?"
            : `Ask me anything about ${element.name}. I promise to keep the science accurate.`,
      },
    ],
    [element],
  );
  const [messages, setMessages] = useState(initial);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text = input) => {
    if (!text.trim() || typing) return;
    setMessages((current) => [...current, { from: "you", text: text.trim() }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const reply = text.toLowerCase().includes("bond")
        ? element.bonds
        : text.toLowerCase().includes("fact")
          ? element.funFact
          : element.symbol === "Ne"
            ? "Slow and steady. Noble gases rarely react, so I value a low-pressure connection."
            : `I’m happiest when the chemistry is balanced—and when no conservation laws are broken.`;
      setMessages((current) => [...current, { from: "them", text: reply }]);
      setTyping(false);
    }, 850);
  };

  return (
    <div className="screen-page chat-page">
      <header className="chat-header">
        <button className="circle-small" onClick={onBack} aria-label="Back">
          <Icon name="back" />
        </button>
        <button className="chat-person" onClick={onProfile}>
          <div className="header-avatar" style={{ background: element.accent }}>
            <Character element={element} compact />
            <i />
          </div>
          <span>
            <strong>{element.nickname}</strong>
            <small>active now · {element.symbol}</small>
          </span>
        </button>
        <button className="circle-small" onClick={onProfile}>
          <Icon name="info" size={20} />
        </button>
      </header>
      <div className="bond-banner">
        <Icon name="atom" size={16} /> You formed a {element.chemistryMatch}% chemistry match
      </div>
      <main className="chat-thread">
        <div className="date-separator">
          <span>TODAY</span>
        </div>
        {messages.map((message, i) => (
          <div className={`message ${message.from}`} key={`${message.text}-${i}`}>
            {message.from === "them" && (
              <div className="tiny-avatar" style={{ background: element.accent }}>
                <span>{element.symbol}</span>
              </div>
            )}
            <div>
              <p>{message.text}</p>
              <small>
                {message.from === "you" ? "Delivered" : i === 0 ? "10:42 AM" : "10:43 AM"}
              </small>
            </div>
          </div>
        ))}
        {typing && (
          <div className="message them">
            <div className="tiny-avatar" style={{ background: element.accent }}>
              <span>{element.symbol}</span>
            </div>
            <div className="typing">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}
      </main>
      <div className="chat-compose">
        <div className="starters">
          {starters.map((starter) => (
            <button key={starter} onClick={() => send(starter)}>
              {starter}
            </button>
          ))}
        </div>
        <div className="input-row">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") send();
            }}
            placeholder={`Message ${element.nickname}...`}
            aria-label="Message"
          />
          <button onClick={() => send()} disabled={!input.trim()} aria-label="Send">
            <Icon name="send" size={20} />
          </button>
        </div>
        <p>Character replies are simulated · Chemistry facts are educational</p>
      </div>
    </div>
  );
}

type MoleculeRecipe = {
  id: string;
  formula: string;
  name: string;
  bond: string;
  atoms: { symbol: string; x: number; y: number; color: string }[];
  bonds: { from: number; to: number; order: number }[];
  explanation: string;
  note: string;
};

const moleculeRecipes: MoleculeRecipe[] = [
  {
    id: "water",
    formula: "H₂O",
    name: "Water",
    bond: "Polar covalent",
    atoms: [
      { symbol: "O", x: 50, y: 48, color: "#ee7e9f" },
      { symbol: "H", x: 27, y: 70, color: "#b8a6e9" },
      { symbol: "H", x: 73, y: 70, color: "#b8a6e9" },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
    ],
    explanation:
      "Oxygen shares one electron pair with each hydrogen. Two lone pairs on oxygen give H₂O its bent shape and polar character.",
    note: "Bond angle: approximately 104.5°",
  },
  {
    id: "salt",
    formula: "NaCl",
    name: "Sodium chloride",
    bond: "Ionic",
    atoms: [
      { symbol: "Na⁺", x: 31, y: 54, color: "#f1aa72" },
      { symbol: "Cl⁻", x: 69, y: 54, color: "#73c6a5" },
    ],
    bonds: [],
    explanation:
      "Sodium transfers one valence electron to chlorine, producing Na⁺ and Cl⁻ ions. Their electrostatic attraction forms an ionic lattice—not a discrete NaCl molecule in solid salt.",
    note: "Electron transfer: Na → Cl",
  },
  {
    id: "carbon-dioxide",
    formula: "CO₂",
    name: "Carbon dioxide",
    bond: "Double covalent",
    atoms: [
      { symbol: "O", x: 22, y: 54, color: "#ee7e9f" },
      { symbol: "C", x: 50, y: 54, color: "#72c5b7" },
      { symbol: "O", x: 78, y: 54, color: "#ee7e9f" },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 1, to: 2, order: 2 },
    ],
    explanation:
      "Carbon shares two electron pairs with each oxygen, creating two double bonds. The molecule is linear and nonpolar overall.",
    note: "Bond angle: 180°",
  },
  {
    id: "ammonia",
    formula: "NH₃",
    name: "Ammonia",
    bond: "Polar covalent",
    atoms: [
      { symbol: "N", x: 50, y: 45, color: "#8d83db" },
      { symbol: "H", x: 25, y: 68, color: "#c7b9ef" },
      { symbol: "H", x: 50, y: 79, color: "#c7b9ef" },
      { symbol: "H", x: 75, y: 68, color: "#c7b9ef" },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
    ],
    explanation:
      "Nitrogen forms three N–H single bonds and retains one lone pair. Electron-pair repulsion creates a trigonal pyramidal shape.",
    note: "Bond angle: approximately 107°",
  },
  {
    id: "methane",
    formula: "CH₄",
    name: "Methane",
    bond: "Covalent",
    atoms: [
      { symbol: "C", x: 50, y: 51, color: "#72c5b7" },
      { symbol: "H", x: 50, y: 20, color: "#c7b9ef" },
      { symbol: "H", x: 22, y: 55, color: "#c7b9ef" },
      { symbol: "H", x: 50, y: 82, color: "#c7b9ef" },
      { symbol: "H", x: 78, y: 55, color: "#c7b9ef" },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    explanation:
      "Carbon shares four electron pairs with four hydrogens. In three dimensions, CH₄ is tetrahedral rather than flat.",
    note: "Bond angle: approximately 109.5°",
  },
];

function LabHeader({ title, subtitle, xp }: { title: string; subtitle: string; xp: number }) {
  return (
    <header className="feature-header">
      <div>
        <p className="eyebrow">{subtitle}</p>
        <h1>{title}</h1>
      </div>
      <div className="xp-pill">
        <Icon name="bolt" size={14} filled />
        <span>{xp.toLocaleString()} XP</span>
      </div>
    </header>
  );
}

function MoleculeCanvas({
  recipe,
  assembled,
  looseAtoms,
}: {
  recipe: MoleculeRecipe;
  assembled: boolean;
  looseAtoms: string[];
}) {
  const shownAtoms = assembled
    ? recipe.atoms
    : looseAtoms.map((symbol, index) => ({
        symbol,
        x: 18 + ((index * 29) % 70),
        y: 28 + ((index * 23) % 51),
        color:
          symbol === "O"
            ? "#ee7e9f"
            : symbol === "C"
              ? "#72c5b7"
              : symbol === "Na"
                ? "#f1aa72"
                : symbol === "Cl"
                  ? "#73c6a5"
                  : symbol === "N"
                    ? "#8d83db"
                    : "#b8a6e9",
      }));
  return (
    <div className={`molecule-canvas ${assembled ? "assembled" : ""}`}>
      <div className="lab-grid" />
      <svg viewBox="0 0 100 100" aria-label={`${recipe.name} molecular model`}>
        {assembled &&
          recipe.bonds.map((bond, index) => {
            const from = recipe.atoms[bond.from];
            const to = recipe.atoms[bond.to];
            return (
              <g key={`${bond.from}-${bond.to}`}>
                <line
                  className="molecular-bond"
                  x1={from.x}
                  y1={from.y + (bond.order === 2 ? -1.8 : 0)}
                  x2={to.x}
                  y2={to.y + (bond.order === 2 ? -1.8 : 0)}
                  style={{ animationDelay: `${index * 120}ms` }}
                />
                {bond.order === 2 && (
                  <line
                    className="molecular-bond"
                    x1={from.x}
                    y1={from.y + 1.8}
                    x2={to.x}
                    y2={to.y + 1.8}
                    style={{ animationDelay: `${index * 120 + 80}ms` }}
                  />
                )}
              </g>
            );
          })}
        {shownAtoms.map((atom, index) => (
          <g
            className="lab-atom"
            key={`${atom.symbol}-${index}`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <circle cx={atom.x} cy={atom.y} r={assembled ? 10.5 : 9} fill={atom.color} />
            <circle cx={atom.x - 2.5} cy={atom.y - 3} r="2.4" fill="white" opacity=".28" />
            <text
              x={atom.x}
              y={atom.y + 2.5}
              textAnchor="middle"
              fill="white"
              fontSize={atom.symbol.length > 2 ? "5.5" : "7"}
              fontFamily="Nunito"
              fontWeight="900"
            >
              {atom.symbol}
            </text>
          </g>
        ))}
        {assembled && recipe.id === "salt" && (
          <g className="electron-transfer">
            <path
              d="M39 39 C48 26, 57 27, 63 40"
              fill="none"
              stroke="#f9d56e"
              strokeWidth="1.4"
              strokeDasharray="2 2"
            />
            <circle cx="42" cy="35" r="2.2" fill="#f9d56e" />
            <text x="51" y="25" textAnchor="middle" fill="#78658a" fontSize="5" fontWeight="800">
              e⁻ transfer
            </text>
          </g>
        )}
      </svg>
      {!looseAtoms.length && !assembled && (
        <div className="empty-lab">
          <Icon name="atom" size={27} />
          <strong>Your bench is ready</strong>
          <span>Add atoms or load a recipe below.</span>
        </div>
      )}
    </div>
  );
}

function MoleculeBuilder({
  xp,
  onComplete,
}: {
  xp: number;
  onComplete: (recipeId: string) => boolean;
}) {
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [looseAtoms, setLooseAtoms] = useState<string[]>([]);
  const [assembled, setAssembled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const recipe = moleculeRecipes[recipeIndex];
  const availableAtoms = ["H", "O", "C", "N", "Na", "Cl"];

  const requiredCounts = (items: string[]) =>
    items.reduce<Record<string, number>>((counts, symbol) => {
      const clean = symbol.replace(/[⁺⁻]/g, "");
      counts[clean] = (counts[clean] || 0) + 1;
      return counts;
    }, {});

  const loadRecipe = (index: number) => {
    const nextRecipe = moleculeRecipes[index];
    setRecipeIndex(index);
    setLooseAtoms(nextRecipe.atoms.map((atom) => atom.symbol.replace(/[⁺⁻]/g, "")));
    setAssembled(false);
    setFeedback("");
  };

  const bondAtoms = () => {
    const expected = requiredCounts(recipe.atoms.map((atom) => atom.symbol));
    const actual = requiredCounts(looseAtoms);
    const valid = Object.keys({ ...expected, ...actual }).every(
      (symbol) => expected[symbol] === actual[symbol],
    );
    if (!valid) {
      setFeedback(`Try ${recipe.formula}: ${recipe.atoms.length} atoms in the correct ratio.`);
      return;
    }
    setAssembled(true);
    const earned = onComplete(recipe.id);
    setFeedback(
      earned
        ? "Stable model assembled. +25 XP"
        : "Stable model assembled. Experiment already logged.",
    );
  };

  return (
    <div className="feature-page lab-page">
      <LabHeader title="Molecule Lab" subtitle="BUILD · BOND · LEARN" xp={xp} />
      <section className="lab-intro">
        <div>
          <span className="lab-status">
            <i /> LAB ONLINE
          </span>
          <h2>{assembled ? recipe.formula : "Build a bond"}</h2>
          <p>{assembled ? recipe.name : "Choose atoms, then test their chemistry."}</p>
        </div>
        <button
          className="round-reset"
          aria-label="Clear laboratory"
          onClick={() => {
            setLooseAtoms([]);
            setAssembled(false);
            setFeedback("");
          }}
        >
          <Icon name="refresh" size={19} />
        </button>
      </section>
      <MoleculeCanvas recipe={recipe} assembled={assembled} looseAtoms={looseAtoms} />
      {assembled && (
        <section className="bond-result">
          <div className="result-icon">
            <Icon name="check" size={18} />
          </div>
          <div>
            <small>{recipe.bond.toUpperCase()} BOND</small>
            <strong>{recipe.note}</strong>
          </div>
        </section>
      )}
      <section className="atom-tray">
        <div className="section-row">
          <h2>Atom tray</h2>
          <span>Tap to add</span>
        </div>
        <div className="atom-buttons">
          {availableAtoms.map((symbol) => (
            <button
              key={symbol}
              onClick={() => {
                setLooseAtoms((current) => [...current, symbol]);
                setAssembled(false);
                setFeedback("");
              }}
              aria-label={`Add ${symbol}`}
            >
              <small>{elementNames.findIndex((item) => item.endsWith(`|${symbol}`)) + 1}</small>
              <strong>{symbol}</strong>
            </button>
          ))}
        </div>
      </section>
      <button className="bond-button" onClick={bondAtoms} disabled={!looseAtoms.length}>
        <Icon name="atom" size={20} /> Bond atoms
      </button>
      {feedback && (
        <p className={`lab-feedback ${assembled ? "success" : ""}`} role="status">
          {feedback}
        </p>
      )}
      <section className="recipe-section">
        <div className="section-row">
          <h2>Guided experiments</h2>
          <span>{moleculeRecipes.length} recipes</span>
        </div>
        <div className="recipe-strip">
          {moleculeRecipes.map((item, index) => (
            <button
              key={item.id}
              className={index === recipeIndex ? "active" : ""}
              onClick={() => loadRecipe(index)}
            >
              <strong>{item.formula}</strong>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="science-explainer">
        <span>
          <Icon name="flask" size={21} />
        </span>
        <div>
          <small>WHAT’S HAPPENING?</small>
          <p>{recipe.explanation}</p>
        </div>
      </section>
    </div>
  );
}

const familyLabels: Record<string, string> = {
  "noble gas": "Noble gas",
  halogen: "Halogen",
  "alkali metal": "Alkali",
  "alkaline earth": "Alkaline earth",
  "transition metal": "Transition",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  "post-transition": "Other metal",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
};

function PeriodicTile({
  element,
  unlocked,
  onClick,
}: {
  element: PeriodicElement;
  unlocked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`periodic-tile family-${element.family.replace(/ /g, "-")} ${unlocked ? "unlocked" : "locked"}`}
      style={{ gridColumn: element.group }}
      onClick={onClick}
      aria-label={`${element.name}, atomic number ${element.number}${unlocked ? "" : ", locked"}`}
    >
      <small>{element.number}</small>
      <strong>{element.symbol}</strong>
      {!unlocked && (
        <i>
          <Icon name="lock" size={7} />
        </i>
      )}
    </button>
  );
}

function Collection({ xp }: { xp: number }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<PeriodicElement | null>(null);
  const unlocked = (number: number) => number <= 24 || [26, 29, 47, 79].includes(number);
  const allElements = elementNames.map((item, index) => {
    const [name, symbol] = item.split("|");
    const number = index + 1;
    const found =
      periodicElements.find((element) => element.number === number) ||
      fBlockElements.find((element) => element.number === number)!;
    return { ...found, name, symbol };
  });
  const results = allElements.filter((element) => {
    const matchesSearch = `${element.name} ${element.symbol} ${element.number}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "unlocked" ? unlocked(element.number) : element.family === filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="feature-page collection-page">
      <LabHeader title="Element Vault" subtitle="YOUR PERIODIC COLLECTION" xp={xp} />
      <section className="vault-progress">
        <div className="progress-ring">
          <strong>28</strong>
          <span>/118</span>
        </div>
        <div>
          <small>COLLECTION PROGRESS</small>
          <h2>Rising Chemist</h2>
          <div className="progress-track">
            <i />
          </div>
          <p>Unlock 2 more for the Quartz badge</p>
        </div>
      </section>
      <div className="collection-tools">
        <label>
          <Icon name="search" size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search elements"
          />
        </label>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter elements"
        >
          <option value="all">All families</option>
          <option value="unlocked">Unlocked</option>
          <option value="nonmetal">Nonmetals</option>
          <option value="transition metal">Transition metals</option>
          <option value="noble gas">Noble gases</option>
          <option value="lanthanide">Lanthanides</option>
          <option value="actinide">Actinides</option>
        </select>
      </div>
      {!search && filter === "all" ? (
        <section className="periodic-board">
          <div className="table-scroll">
            <div className="periodic-grid">
              {periodicElements.map((element) => (
                <PeriodicTile
                  key={element.number}
                  element={element}
                  unlocked={unlocked(element.number)}
                  onClick={() => setSelected(element)}
                />
              ))}
            </div>
            <div className="f-block">
              <span>57–71</span>
              {fBlockElements.slice(0, 15).map((element) => (
                <PeriodicTile
                  key={`f-${element.number}`}
                  element={element}
                  unlocked={unlocked(element.number)}
                  onClick={() => setSelected(element)}
                />
              ))}
              <span>89–103</span>
              {fBlockElements.slice(15).map((element) => (
                <PeriodicTile
                  key={`f-${element.number}`}
                  element={element}
                  unlocked={unlocked(element.number)}
                  onClick={() => setSelected(element)}
                />
              ))}
            </div>
          </div>
          <p className="table-hint">Swipe sideways to explore all 18 groups</p>
        </section>
      ) : (
        <section className="element-results">
          {results.map((element) => (
            <button
              key={element.number}
              onClick={() => setSelected(element)}
              className={`result-card family-${element.family.replace(/ /g, "-")}`}
            >
              <span>
                <small>{element.number}</small>
                <strong>{element.symbol}</strong>
              </span>
              <div>
                <strong>{element.name}</strong>
                <small>
                  {familyLabels[element.family]} · Period {element.period}, Group {element.group}
                </small>
              </div>
              {!unlocked(element.number) && <Icon name="lock" size={15} />}
            </button>
          ))}
          {!results.length && (
            <div className="empty-collection">
              <Icon name="search" size={26} />
              <strong>No elements found</strong>
              <span>Try another name, symbol, or family.</span>
            </div>
          )}
        </section>
      )}
      <section className="rarity-legend">
        <h2>Collection families</h2>
        <div>
          {Object.entries(familyLabels)
            .slice(0, 6)
            .map(([family, label]) => (
              <span key={family} className={`family-${family.replace(/ /g, "-")}`}>
                <i />
                {label}
              </span>
            ))}
        </div>
      </section>
      <section className="achievement-card">
        <div className="achievement-gem">
          <Icon name="trophy" size={24} />
        </div>
        <div>
          <small>ACHIEVEMENT · 28/30</small>
          <strong>Quartz Collector</strong>
          <span>Collect 30 unique elements</span>
        </div>
        <div className="mini-progress">
          <i />
        </div>
      </section>
      {selected && (
        <div className="element-sheet" onClick={() => setSelected(null)}>
          <article
            onClick={(event) => event.stopPropagation()}
            className={`family-${selected.family.replace(/ /g, "-")}`}
          >
            <button className="sheet-close" onClick={() => setSelected(null)} aria-label="Close">
              <Icon name="close" size={20} />
            </button>
            <div className="sheet-element">
              <small>{selected.number}</small>
              <strong>{selected.symbol}</strong>
              <span>{selected.name}</span>
            </div>
            <p className="sheet-family">{familyLabels[selected.family]}</p>
            <h2>{unlocked(selected.number) ? "Element discovered" : "Keep exploring to unlock"}</h2>
            <div className="sheet-stats">
              <span>
                <small>PERIOD</small>
                <strong>{selected.period}</strong>
              </span>
              <span>
                <small>GROUP</small>
                <strong>{selected.group}</strong>
              </span>
              <span>
                <small>ATOMIC NO.</small>
                <strong>{selected.number}</strong>
              </span>
            </div>
            <p>
              Placement shown follows the standard 18-group periodic table. Romantic traits
              elsewhere in the app are fictional and not elemental properties.
            </p>
          </article>
        </div>
      )}
    </div>
  );
}

const quizQuestions = [
  {
    question: "Which element has the symbol Na?",
    answers: ["Nitrogen", "Sodium", "Neon", "Nickel"],
    correct: 1,
    fact: "Na comes from the Latin name natrium.",
  },
  {
    question: "How many valence electrons does oxygen have?",
    answers: ["2", "4", "6", "8"],
    correct: 2,
    fact: "Oxygen has six valence electrons and commonly forms two bonds.",
  },
  {
    question: "Which molecule is linear?",
    answers: ["H₂O", "NH₃", "CO₂", "CH₄"],
    correct: 2,
    fact: "CO₂ is linear with two C=O double bonds and a 180° bond angle.",
  },
];

const memorySymbols = ["H", "O", "Na", "Cl", "C", "Ne"];

function MemoryGame({ onEarn }: { onEarn: () => void }) {
  const cards = useMemo(
    () => memorySymbols.flatMap((symbol) => [`${symbol}-a`, `${symbol}-b`]),
    [],
  );
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);

  const flip = (card: string) => {
    if (locked || open.includes(card) || matched.includes(card.split("-")[0])) return;
    const next = [...open, card];
    setOpen(next);
    if (next.length === 2) {
      setLocked(true);
      const [first, second] = next.map((item) => item.split("-")[0]);
      window.setTimeout(() => {
        if (first === second) {
          setMatched((current) => {
            const updated = [...current, first];
            if (updated.length === memorySymbols.length) onEarn();
            return updated;
          });
        }
        setOpen([]);
        setLocked(false);
      }, 620);
    }
  };

  return (
    <section className="memory-card">
      <div className="game-heading">
        <div>
          <small>MEMORY LAB</small>
          <h2>Match the symbols</h2>
        </div>
        <span>
          {matched.length}/{memorySymbols.length}
        </span>
      </div>
      <div className="memory-grid">
        {cards.map((card) => {
          const symbol = card.split("-")[0];
          const revealed = open.includes(card) || matched.includes(symbol);
          return (
            <button
              key={card}
              className={revealed ? "revealed" : ""}
              onClick={() => flip(card)}
              aria-label={revealed ? symbol : "Hidden memory card"}
            >
              <span className="card-back">
                <Icon name="atom" size={18} />
              </span>
              <strong>{symbol}</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Learn({
  xp,
  setXp,
  waterComplete,
  dailyDone,
  setDailyDone,
  onGoLab,
}: {
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  waterComplete: boolean;
  dailyDone: boolean;
  setDailyDone: React.Dispatch<React.SetStateAction<boolean>>;
  onGoLab: () => void;
}) {
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const quiz = quizQuestions[question];

  const nextQuestion = () => {
    if (answer === quiz.correct) setXp((value) => value + 15);
    setQuestion((value) => (value + 1) % quizQuestions.length);
    setAnswer(null);
  };

  return (
    <div className="feature-page learn-page">
      <LabHeader title="Chem Academy" subtitle="LEARN · PLAY · MASTER" xp={xp} />
      <section className="level-card">
        <div className="level-orb">
          <strong>7</strong>
          <span>LEVEL</span>
        </div>
        <div>
          <small>CURIOUS CATALYST</small>
          <h2>{xp.toLocaleString()} XP</h2>
          <div className="level-progress">
            <i style={{ width: `${Math.min(100, ((xp - 1200) / 300) * 100)}%` }} />
          </div>
          <p>{1500 - xp} XP until level 8</p>
        </div>
        <div className="streak-stack">
          <Icon name="bolt" size={17} filled />
          <strong>4</strong>
          <span>days</span>
        </div>
      </section>
      <section className="daily-card">
        <div className="daily-top">
          <span>
            <Icon name="spark" size={20} />
          </span>
          <div>
            <small>DAILY REACTION</small>
            <h2>Complete today’s challenge</h2>
          </div>
          <b>+40 XP</b>
        </div>
        <p>Build H₂O in the Molecule Lab and identify its bond type.</p>
        <button
          className={dailyDone ? "complete" : ""}
          onClick={() => {
            if (!waterComplete) {
              onGoLab();
              return;
            }
            if (!dailyDone) setXp((value) => value + 40);
            setDailyDone(true);
          }}
        >
          {dailyDone ? (
            <>
              <Icon name="check" size={17} /> Challenge complete
            </>
          ) : waterComplete ? (
            "Claim challenge reward"
          ) : (
            "Go to Molecule Lab"
          )}
        </button>
      </section>
      <section className="quiz-card">
        <div className="quiz-top">
          <div>
            <small>QUICK QUIZ</small>
            <h2>{quiz.question}</h2>
          </div>
          <span>
            {question + 1}/{quizQuestions.length}
          </span>
        </div>
        <div className="answer-grid">
          {quiz.answers.map((option, index) => (
            <button
              key={option}
              disabled={answer !== null}
              className={
                answer === null
                  ? ""
                  : index === quiz.correct
                    ? "correct"
                    : index === answer
                      ? "wrong"
                      : ""
              }
              onClick={() => setAnswer(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
              {answer !== null && index === quiz.correct && <Icon name="check" size={16} />}
            </button>
          ))}
        </div>
        {answer !== null && (
          <div className={`quiz-feedback ${answer === quiz.correct ? "correct" : "wrong"}`}>
            <p>
              <strong>{answer === quiz.correct ? "Correct! +15 XP" : "Not quite."}</strong>{" "}
              {quiz.fact}
            </p>
            <button onClick={nextQuestion}>Next question</button>
          </div>
        )}
      </section>
      <MemoryGame onEarn={() => setXp((value) => value + 50)} />
      <section className="badge-section">
        <div className="section-row">
          <h2>Badge shelf</h2>
          <span>3 of 12</span>
        </div>
        <div className="badge-row">
          {[
            ["First Bond", "atom"],
            ["4-Day Spark", "bolt"],
            ["Symbol Scout", "search"],
            ["Quiz Whiz", "trophy"],
          ].map(([label, icon], index) => (
            <div className={index === 3 ? "locked" : ""} key={label}>
              <span>
                <Icon name={icon as IconName} size={22} />
              </span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState<"discover" | "lab" | "collection" | "learn" | "matches">(
    "discover",
  );
  const [xp, setXp] = useState(1240);
  const [completedRecipes, setCompletedRecipes] = useState<string[]>([]);
  const [dailyDone, setDailyDone] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [reaction, setReaction] = useState<"like" | "nope" | null>(null);
  const [matched, setMatched] = useState<ElementData | null>(null);
  const [profile, setProfile] = useState<ElementData | null>(null);
  const [chat, setChat] = useState<ElementData | null>(null);
  const pointerStart = useRef({ x: 0, y: 0 });
  const current = elements[deckIndex % elements.length];
  const next = elements[(deckIndex + 1) % elements.length];

  const swipe = (direction: "like" | "nope") => {
    if (reaction) return;
    setReaction(direction);
    setDrag({ x: direction === "like" ? 520 : -520, y: -20, active: false });
    window.setTimeout(() => {
      if (direction === "like") setMatched(current);
      setDeckIndex((value) => value + 1);
      setDrag({ x: 0, y: 0, active: false });
      setReaction(null);
    }, 360);
  };

  const pointerDown: React.PointerEventHandler = (event) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    setDrag({ x: 0, y: 0, active: true });
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove: React.PointerEventHandler = (event) => {
    if (!drag.active) return;
    setDrag({
      x: event.clientX - pointerStart.current.x,
      y: (event.clientY - pointerStart.current.y) * 0.25,
      active: true,
    });
  };
  const pointerUp: React.PointerEventHandler = () => {
    if (!drag.active) return;
    if (Math.abs(drag.x) > 90) swipe(drag.x > 0 ? "like" : "nope");
    else setDrag({ x: 0, y: 0, active: false });
  };

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (profile || chat || matched) return;
      if (event.key === "ArrowLeft") swipe("nope");
      if (event.key === "ArrowRight") swipe("like");
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  const openChat = (element: ElementData) => {
    setMatched(null);
    setProfile(null);
    setChat(element);
  };

  const completeRecipe = (recipeId: string) => {
    if (completedRecipes.includes(recipeId)) return false;
    setCompletedRecipes((current) => [...current, recipeId]);
    setXp((value) => value + 25);
    return true;
  };

  if (chat)
    return (
      <div className="app-shell">
        <Chat
          element={chat}
          onBack={() => setChat(null)}
          onProfile={() => {
            setProfile(chat);
            setChat(null);
          }}
        />
      </div>
    );
  if (profile)
    return (
      <div className="app-shell">
        <Profile
          element={profile}
          onBack={() => setProfile(null)}
          onChat={() => openChat(profile)}
        />
      </div>
    );

  return (
    <div className="app-background">
      <div className="ambient a1" />
      <div className="ambient a2" />
      <div className="ambient a3" />
      <div className="app-shell">
        {tab === "discover" ? (
          <div className="discover-screen">
            <header className="main-header">
              <div className="brand-mark">
                <Icon name="flask" size={20} />
                <span>
                  <i />
                </span>
              </div>
              <div className="brand-copy">
                <small>CHEMICAL</small>
                <strong>Romance</strong>
              </div>
              <button className="streak">
                <Icon name="bolt" size={16} filled />
                <span>4</span>
              </button>
            </header>
            <div className="discovery-label">
              <div>
                <span className="pulse-dot" />
                <p>Discovering near your orbit</p>
              </div>
              <small>{current.number} of 118</small>
            </div>
            <main className="deck">
              <div className="back-card second" />
              <div
                className="back-card first"
                style={{ "--peek": next.accent } as React.CSSProperties}
              />
              <div className={`swipe-stamp like ${drag.x > 45 ? "show" : ""}`}>BOND!</div>
              <div className={`swipe-stamp nope ${drag.x < -45 ? "show" : ""}`}>INERT</div>
              <ElementCard
                key={`${current.symbol}-${deckIndex}`}
                element={current}
                onOpen={() => setProfile(current)}
                onPointerDown={pointerDown}
                onPointerMove={pointerMove}
                onPointerUp={pointerUp}
                style={{
                  transform: `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${drag.x * 0.045}deg)`,
                  transition: drag.active ? "none" : "transform .38s cubic-bezier(.22,.8,.22,1)",
                }}
              />
            </main>
            <div className="swipe-actions">
              <button
                className="action-button reject"
                onClick={() => swipe("nope")}
                aria-label="Pass"
              >
                <Icon name="close" size={31} />
              </button>
              <div className="gesture-hint">
                <span>SWIPE</span>
                <i />
                <span>TO BOND</span>
              </div>
              <button
                className="action-button accept"
                onClick={() => swipe("like")}
                aria-label="Like"
              >
                <Icon name="heart" size={31} filled />
              </button>
            </div>
          </div>
        ) : tab === "lab" ? (
          <MoleculeBuilder xp={xp} onComplete={completeRecipe} />
        ) : tab === "collection" ? (
          <Collection xp={xp} />
        ) : tab === "learn" ? (
          <Learn
            xp={xp}
            setXp={setXp}
            waterComplete={completedRecipes.includes("water")}
            dailyDone={dailyDone}
            setDailyDone={setDailyDone}
            onGoLab={() => setTab("lab")}
          />
        ) : (
          <Matches onProfile={setProfile} onChat={openChat} />
        )}
        <nav className="bottom-nav" aria-label="Main navigation">
          <button className={tab === "discover" ? "active" : ""} onClick={() => setTab("discover")}>
            <span>
              <Icon name="cards" size={22} />
            </span>
            <small>Swipe</small>
          </button>
          <button className={tab === "lab" ? "active" : ""} onClick={() => setTab("lab")}>
            <span>
              <Icon name="flask" size={22} />
            </span>
            <small>Lab</small>
          </button>
          <button
            className={tab === "collection" ? "active" : ""}
            onClick={() => setTab("collection")}
          >
            <span>
              <Icon name="grid" size={22} />
            </span>
            <small>Vault</small>
          </button>
          <button className={tab === "matches" ? "active" : ""} onClick={() => setTab("matches")}>
            <span>
              <Icon name="users" size={22} />
            </span>
            <small>Bonds</small>
            <i className="nav-dot" />
          </button>
          <button className={tab === "learn" ? "active" : ""} onClick={() => setTab("learn")}>
            <span>
              <Icon name="trophy" size={22} />
            </span>
            <small>Learn</small>
          </button>
        </nav>
        {matched && (
          <MatchModal
            element={matched}
            onClose={() => setMatched(null)}
            onChat={() => openChat(matched)}
          />
        )}
      </div>
      <aside className="desktop-note">
        <span>
          <Icon name="atom" size={22} />
        </span>
        <p>
          <strong>Collect your chemistry.</strong> Swipe through the periodic table and discover
          which elements truly bond.
        </p>
      </aside>
    </div>
  );
}

export default App;
