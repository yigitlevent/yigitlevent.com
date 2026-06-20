"use client";

import { useEffect, useState } from "react";


export function useFontLoading(font: string): { isFontLoaded: boolean; } {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    if (!isFontLoaded) {
      const fontFace = new FontFace("Code", `url(${font})`);
      fontFace
        .load()
        .then(font => {
          document.fonts.add(font);
          setIsFontLoaded(true);
        })
        .catch(console.error);
    }
  }, [font, isFontLoaded]);

  return { isFontLoaded };
}
