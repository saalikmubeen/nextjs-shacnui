'use-client';

import { useContext } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DrawerContext } from '@/components/ui/drawer';

type MenuItemProps = {
  href: string;
  children: React.ReactNode;
};

const MenuItem = (props: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  const { onClose } = useContext(DrawerContext);

  return (
    <li>
      <Link
        className={cn(
          'block p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground hover:text-foreground',
          isActive &&
            // making sure the active menu item is always visible and doesn't change the background color or text color
            // when the active link is hovered in light or dark mode
            'bg-primary hover:bg-primary dark:bg-primary dark:hover:bg-primary text-primary-foreground hover:text-primary-foreground'
        )}
        href={props.href}
        onClick={onClose}
      >
        {props.children}
      </Link>
    </li>
  );
};

export default MenuItem;
