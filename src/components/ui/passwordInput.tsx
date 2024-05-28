import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from './input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          {...props}
          className={cn('pr-10', className)}
        />
        {showPassword ? (
          <span className="absolute right-3 top-[7px] cursor-pointer select-none">
            <EyeIcon onClick={() => setShowPassword(false)} />
          </span>
        ) : (
          <span className="absolute right-3 top-[7px] cursor-pointer select-none">
            <EyeOffIcon onClick={() => setShowPassword(true)} />
          </span>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = 'Input';

export { PasswordInput };
