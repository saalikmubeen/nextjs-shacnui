'use client';
import MenuTitle from './menu-title';
import MenuItem from './menu-item';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar';
import Link from 'next/link';
import ThemeToggleBtn from '@/components/ui/themeToggleBtn';
import { cn } from '@/lib/utils';

interface MainMenuProps {
  className?: string;
}

const MainMenu = (props: MainMenuProps) => {
  return (
    <nav
      // className={cn(
      //   'bg-muted overflow-auto p-4 flex flex-col',
      //   props.className
      // )}
      className={cn(
        `md:bg-muted overflow-auto p-4 flex flex-col`,
        props.className
      )}
    >
      {/* Hide the menu title on screens below medium */}
      <header className="hidden md:block border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>

      <ul className="flex flex-col gap-2  py-4 grow">
        <MenuItem href="/dashboard">My Dashboard</MenuItem>

        <MenuItem href="/dashboard/employees">Employees</MenuItem>

        <MenuItem href="/dashboard/teams">Teams</MenuItem>

        <MenuItem href="/dashboard/account">Account</MenuItem>

        <MenuItem href="/dashboard/settings">Settings</MenuItem>
      </ul>

      <footer className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/63722568?v=4" />
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
            SM
          </AvatarFallback>
        </Avatar>

        <Link href="/" className="hover:underline hover:text-primary">
          Logout
        </Link>

        <ThemeToggleBtn className="ml-auto" />
      </footer>
    </nav>
  );
};

export default MainMenu;
