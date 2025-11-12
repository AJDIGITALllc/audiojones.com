"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

export type UserPersona = "artist" | "business" | "consultant" | "visitor";

export interface PersonaDetection {
  persona: UserPersona;
  confidence: number;
  indicators: string[];
}

/**
 * Hook to detect user persona based on authentication state, behavior, and preferences
 */
export function usePersona(): PersonaDetection {
  const { user } = useAuth();
  const [persona, setPersona] = useState<PersonaDetection>({
    persona: "visitor",
    confidence: 1.0,
    indicators: ["Not authenticated"]
  });

  useEffect(() => {
    if (!user) {
      setPersona({
        persona: "visitor",
        confidence: 1.0,
        indicators: ["Not authenticated"]
      });
      return;
    }

    // Check for admin/consultant indicators
    if (user.customClaims?.admin === true) {
      setPersona({
        persona: "consultant",
        confidence: 1.0,
        indicators: ["Admin custom claim"]
      });
      return;
    }

    // Detect persona based on various signals
    const indicators: string[] = [];
    let artistScore = 0;
    let businessScore = 0;
    let consultantScore = 0;

    // Email-based detection
    const email = user.email?.toLowerCase() || "";
    if (email.includes("music") || email.includes("artist") || email.includes("band")) {
      artistScore += 0.3;
      indicators.push("Music-related email");
    }
    
    if (email.includes("business") || email.includes("marketing") || email.includes("agency")) {
      businessScore += 0.3;
      indicators.push("Business-related email");
    }

    if (email.includes("consult") || email.includes("advisor") || email.includes("coach")) {
      consultantScore += 0.3;
      indicators.push("Consultant-related email");
    }

    // Display name based detection
    const displayName = user.displayName?.toLowerCase() || "";
    if (displayName.includes("dj") || displayName.includes("producer") || displayName.includes("mc")) {
      artistScore += 0.2;
      indicators.push("Artist-related display name");
    }

    // URL referrer based detection (if available)
    if (typeof window !== "undefined") {
      const referrer = document.referrer.toLowerCase();
      if (referrer.includes("spotify") || referrer.includes("soundcloud") || referrer.includes("bandcamp")) {
        artistScore += 0.4;
        indicators.push("Referred from music platform");
      }
      
      if (referrer.includes("linkedin") || referrer.includes("facebook.com/business")) {
        businessScore += 0.3;
        indicators.push("Referred from business platform");
      }
    }

    // Check localStorage for persona preferences
    if (typeof window !== "undefined") {
      const storedPersona = localStorage.getItem("audiojones_persona");
      if (storedPersona === "artist") {
        artistScore += 0.5;
        indicators.push("Previously identified as artist");
      } else if (storedPersona === "business") {
        businessScore += 0.5;
        indicators.push("Previously identified as business");
      }
    }

    // Default scores for authenticated users
    businessScore += 0.1; // Slight bias toward business since most clients are businesses

    // Determine primary persona
    const maxScore = Math.max(artistScore, businessScore, consultantScore);
    let primaryPersona: UserPersona = "business"; // Default for authenticated users
    
    if (maxScore === artistScore && artistScore > 0.2) {
      primaryPersona = "artist";
    } else if (maxScore === consultantScore && consultantScore > 0.2) {
      primaryPersona = "consultant";
    } else if (maxScore === businessScore && businessScore > 0.1) {
      primaryPersona = "business";
    }

    setPersona({
      persona: primaryPersona,
      confidence: Math.min(maxScore, 1.0),
      indicators
    });

  }, [user]);

  return persona;
}

/**
 * Hook to manually set user persona (with localStorage persistence)
 */
export function useSetPersona() {
  return (persona: UserPersona) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("audiojones_persona", persona);
      // Trigger a custom event to update all usePersona hooks
      window.dispatchEvent(new CustomEvent("persona-changed", { detail: persona }));
    }
  };
}