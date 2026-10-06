/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#f7f7f0",
      "foreground": "#1b2b21",
      "border": "#dce5dc",
      "card": "#fffefa",
      "cardForeground": "#1b2b21",
      "popover": "#fffefa",
      "popoverForeground": "#1b2b21",
      "primary": "#145c3e",
      "primaryForeground": "#ffffff",
      "secondary": "#e6efe7",
      "secondaryForeground": "#174630",
      "muted": "#eef2ec",
      "mutedForeground": "#53665a",
      "accent": "#f3ead2",
      "accentForeground": "#594317",
      "destructive": "#a83e36",
      "destructiveForeground": "#ffffff",
      "input": "#d4dfd5",
      "ring": "#2f8c5e",
      "chart1": "#187a50",
      "chart2": "#be8d37",
      "chart3": "#c96448",
      "chart4": "#557f8e",
      "chart5": "#89994b",
      "sidebar": "#153f30",
      "sidebarForeground": "#f0f4eb",
      "sidebarBorder": "#2a5742",
      "sidebarPrimary": "#b9dca6",
      "sidebarPrimaryForeground": "#153f30",
      "sidebarAccent": "#245441",
      "sidebarAccentForeground": "#f0f4eb",
      "sidebarRing": "#c4db9e"
    },
    "dark": {
      "background": "#121b15",
      "foreground": "#ecf1e8",
      "border": "#324138",
      "card": "#19251d",
      "cardForeground": "#ecf1e8",
      "popover": "#202d24",
      "popoverForeground": "#f1f4ed",
      "primary": "#57c384",
      "primaryForeground": "#082e1d",
      "secondary": "#28392e",
      "secondaryForeground": "#dfebe0",
      "muted": "#1e2a22",
      "mutedForeground": "#aab9ac",
      "accent": "#40371f",
      "accentForeground": "#f0d993",
      "destructive": "#702e2c",
      "destructiveForeground": "#ffece9",
      "input": "#37463b",
      "ring": "#72d3a0",
      "chart1": "#53c28a",
      "chart2": "#e0b755",
      "chart3": "#e18463",
      "chart4": "#83b4c2",
      "chart5": "#b7c66a",
      "sidebar": "#101a14",
      "sidebarForeground": "#eaf0e7",
      "sidebarBorder": "#2c3b30",
      "sidebarPrimary": "#347b55",
      "sidebarPrimaryForeground": "#ffffff",
      "sidebarAccent": "#203127",
      "sidebarAccentForeground": "#eaf0e7",
      "sidebarRing": "#72d3a0"
    }
  },
  "fontFamily": {
    "sans": [
      "Manrope",
      "sans-serif"
    ],
    "serif": [
      "Georgia",
      "serif"
    ],
    "mono": [
      "Menlo",
      "monospace"
    ]
  },
  "radius": "1rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
