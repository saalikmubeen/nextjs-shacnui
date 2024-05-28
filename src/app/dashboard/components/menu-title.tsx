import { PersonStandingIcon } from 'lucide-react';
import React from 'react';

const MenuTitle = () => {
  return (
    <div className="flex items-center">
      <PersonStandingIcon size={40} className="text-primary" />
      <span className="text-lg font-semibold">SupportMe</span>
    </div>
  );
};

export default MenuTitle;
