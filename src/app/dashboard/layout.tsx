'use client';

import React, { useState } from 'react';
import MainMenu from './components/main-men';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  DrawerTrigger,
  DrawerContent,
  Drawer,
} from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import MenuTitle from './components/menu-title';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log(isDesktop);
  return (
    // Add the grid layout only for screens medium and above
    <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
      {/* Hide this menu on screens below medium */}
      {/* By default, keep it hidden (for screens below medium)
       but show it on screens medium and above */}
      <MainMenu className="hidden md:flex" />

      {!isDesktop && (
        // hide this menu on desktop (for screens medium and above)
        <div className="p-4 flex justify-between md:hidden sticky top-0 left-0 bg-background border-b border-border">
          <MenuTitle />
          <Drawer
            direction="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            onOpenChange={(open) => setMobileMenuOpen(open)}
          >
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <MainMenu />
            </DrawerContent>
          </Drawer>
        </div>
      )}

      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">Welcome back, Saalik</h1>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
