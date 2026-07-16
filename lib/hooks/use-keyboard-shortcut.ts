"use client";

import { useEffect } from "react";

type Modifier = "ctrl" | "meta" | "shift" | "alt";

interface Shortcut {
  key: string;
  modifiers?: Modifier[];
  handler: (e: KeyboardEvent) => void;
  enabled?: boolean;
}

export function useKeyboardShortcut(shortcut: Shortcut) {
  useEffect(() => {
    if (shortcut.enabled === false) return;

    const listener = (e: KeyboardEvent) => {
      const hasCtrl = shortcut.modifiers?.includes("ctrl");
      const hasMeta = shortcut.modifiers?.includes("meta");
      const hasShift = shortcut.modifiers?.includes("shift");
      const hasAlt = shortcut.modifiers?.includes("alt");

      const ctrlOrMeta = hasCtrl ? e.ctrlKey : hasMeta ? e.metaKey : !e.ctrlKey && !e.metaKey;
      const shiftMatch = hasShift ? e.shiftKey : true;
      const altMatch = hasAlt ? e.altKey : true;

      if (
        e.key.toLowerCase() === shortcut.key.toLowerCase() &&
        ctrlOrMeta &&
        shiftMatch &&
        altMatch
      ) {
        e.preventDefault();
        shortcut.handler(e);
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [shortcut]);
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        if (shortcut.enabled === false) continue;

        const hasCtrl = shortcut.modifiers?.includes("ctrl");
        const hasMeta = shortcut.modifiers?.includes("meta");
        const hasShift = shortcut.modifiers?.includes("shift");
        const hasAlt = shortcut.modifiers?.includes("alt");

        const ctrlOrMeta = hasCtrl ? e.ctrlKey : hasMeta ? e.metaKey : !e.ctrlKey && !e.metaKey;
        const shiftMatch = hasShift ? e.shiftKey : true;
        const altMatch = hasAlt ? e.altKey : true;

        if (
          e.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ctrlOrMeta &&
          shiftMatch &&
          altMatch
        ) {
          e.preventDefault();
          shortcut.handler(e);
        }
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [shortcuts]);
}
