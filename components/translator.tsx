"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Copy, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSelector } from "./language-selector";

export function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("German");

  // This would normally use an actual translation API
  const handleTranslate = () => {
    if (sourceText.trim() === "") return;

    // Simulate translation (in a real app, this would call a translation API)
    setTranslatedText(`[${targetLanguage} translation of: "${sourceText}"]`);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setSourceText("");
    setTranslatedText("");
  };

  const swapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);

    // Also swap text if there's translated content
    if (translatedText) {
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  return (
    <main className="min-h-screen bg-dark text-white flex flex-col">
      <header className="border-b border-gray/30 bg-dark">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Echo Translator</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray hover:text-white hover:bg-secondary/80"
            >
              Documents
            </Button>
            <Button
              variant="ghost"
              className="text-gray hover:text-white hover:bg-secondary/80"
            >
              Pro
            </Button>
            <Button
              variant="ghost"
              className="text-gray hover:text-white hover:bg-secondary/80"
            >
              API
            </Button>
          </div>
        </div>
      </header>
     {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-6xl bg-dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Source language panel */}
          <div className="flex flex-col border border-gray/30 rounded-lg overflow-hidden bg-dark shadow-sm h-full">
            <div className="p-3 border-b border-gray/30 bg-darkest flex items-center justify-between">
              <LanguageSelector
                value={sourceLanguage}
                onChange={setSourceLanguage}
                position="source"
              />
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  title="Clear text"
                  className="text-gray hover:text-primary"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <Textarea
                className="flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[300px] bg-dark text-white placeholder:text-gray/70"
                placeholder="Enter text"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
              />
              <div className="p-3 border-t border-gray/30 flex justify-between items-center">
                <div className="text-sm text-gray">
                  {sourceText.length} characters
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!sourceText}
                    onClick={() => handleCopy(sourceText)}
                    title="Copy to clipboard"
                    className="text-gray hover:text-primary disabled:text-gray/50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!sourceText}
                    title="Listen"
                    className="text-gray hover:text-primary disabled:text-gray/50"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Language swap button (mobile) */}
          <div className="flex justify-center items-center lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-secondary text-white hover:bg-primary border-none"
              onClick={swapLanguages}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Target language panel */}
          <div className="flex flex-col border border-gray/30 rounded-lg overflow-hidden bg-dark shadow-sm h-full relative">
            {/* Language swap button (desktop) */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full absolute top-1/2 -left-5 transform -translate-y-1/2 bg-secondary text-white z-10 hidden lg:flex hover:bg-primary border-none"
              onClick={swapLanguages}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="p-3 border-b border-gray/30 bg-darkest flex items-center justify-between">
              <LanguageSelector
                value={targetLanguage}
                onChange={setTargetLanguage}
                position="target"
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-white hover:bg-primary"
                onClick={handleTranslate}
                disabled={!sourceText}
              >
                Translate
              </Button>
            </div>
            <div className="flex-1 flex flex-col">
              <Textarea
                className="flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[300px] bg-dark text-white placeholder:text-gray/70"
                placeholder="Translation"
                value={translatedText}
                readOnly
              />
              <div className="p-3 border-t border-gray/30 flex justify-between items-center">
                <div className="text-sm text-gray">
                  {translatedText.length} characters
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!translatedText}
                    onClick={() => handleCopy(translatedText)}
                    title="Copy to clipboard"
                    className="text-gray hover:text-primary disabled:text-gray/50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!translatedText}
                    title="Listen"
                    className="text-gray hover:text-primary disabled:text-gray/50"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray/30 py-4 mt-auto bg-darkest">
        <div className="container mx-auto px-4 text-center text-sm text-gray">
         Echo Translator 2025 ©
        </div>
      </footer>
    </main>
  );
}
