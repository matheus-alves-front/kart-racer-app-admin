import { Michroma } from "next/font/google";

export const michroma = Michroma({ 
  style: 'normal',
  weight: '400',
  adjustFontFallback: true,
  display: 'block',
  subsets: ["latin"]
});

export const michromaClassName = michroma.className