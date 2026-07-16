"use client";

import { useCallback, useRef, useEffect } from "react";

export function useAutoResize(minHeight: number = 60, maxHeight: number = 300) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = `${minHeight}px`;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [minHeight, maxHeight]);

  useEffect(() => {
    resize();
  }, [resize]);

  return { ref, resize };
}
