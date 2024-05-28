'use client';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { MoonIcon, SunIcon } from 'lucide-react';

interface ThemeToggleBtnProps {
  className?: string;
}

const ThemeToggleBtn = ({ className }: ThemeToggleBtnProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={className}
          onClick={() => {
            setIsDarkMode((prevState) => !prevState);
            // document.body.classList.toggle('dark');
            document.documentElement.classList.toggle('dark');
          }}
        >
          {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </TooltipTrigger>

        <TooltipContent>
          {isDarkMode
            ? 'Switch to light mode'
            : 'Switch to dark mode'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggleBtn;
