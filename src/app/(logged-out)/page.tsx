import { Button } from '@/components/ui/button';
import { PersonStandingIcon } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        {' '}
        <PersonStandingIcon
          size={50}
          className="text-pink-500"
        />{' '}
        Support Me
      </h1>

      <p>The best dashboard to manage customer support.</p>

      <div className="flex gap-2 items-center">
        {/* asChild prop will make all of the styles associated with the Button component
        to be applied to the Link tag. */}
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <small>or</small>
        <Button asChild variant="outline">
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </>
  );
}
