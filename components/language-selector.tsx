"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LanguageSelectorProps = {
  value: string;
  onChange: (language: string) => void;
  position: "source" | "target";
};

export function LanguageSelector({
  value,
  onChange,
  position,
}: LanguageSelectorProps) {
  // Common languages
  const languages = [
    "English",
    "German",
    "French",
    "Spanish",
    "Italian",
    "Portuguese",
    "Dutch",
    "Polish",
    "Russian",
    "Japanese",
    "Chinese",
    "Korean",
  ];

  // Source-specific languages
  const sourceLanguages = ["Auto-detect", ...languages];

  // Use appropriate language list based on position
  const languageList = position === "source" ? sourceLanguages : languages;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="font-medium flex items-center gap-1 text-white hover:text-primary hover:bg-darkest"
        >
          {value}
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto bg-dark border border-gray/30">
        <DropdownMenuGroup>
          {languageList.map((language) => (
            <DropdownMenuItem
              key={language}
              onClick={() => onChange(language)}
              className="flex items-center justify-between text-white hover:bg-secondary focus:bg-secondary"
            >
              {language}
              {language === value && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
