/* eslint-disable react/no-unescaped-entities */
'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/passwordInput';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, PersonStandingIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// https://github.com/colinhacks/zod/issues/479#issuecomment-1843302409
const formSchema = z
  .object({
    email: z.string().email(),
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional(), // required if accountType is company
    // coerce is used to convert string to number
    // because all our input values are always strings by default
    numberOfEmployees: z.coerce.number().optional(), // required if accountType is company
    dateOfBirth: z.date().refine((date) => {
      // Refine is used to add custom validation rules
      // It's useful when we need to perform complex validation
      // and don't require access to other fields in the form
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );

      // return true if the validation fails
      return date <= eighteenYearsAgo;
    }, 'You must be atleast 18 years old to sign up'),
    password: z
      .string()
      .min(8)
      .refine((password) => {
        // Password must include one uppercase letter and one special character
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
      }, 'Password must include one uppercase letter and one special character'),
    passwordConfirm: z.string(),
    acceptTerms: z.boolean({
      required_error: 'You must accept the terms and conditions.',
    }),
  })
  .superRefine((data, ctx) => {
    // superFine is used to add custom validation rules
    // It's handy when we neeed access to other fields in the form
    // to perform validation
    if (data.accountType === 'company' && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['companyName'],
        message: 'Company Name is required',
      });
    }

    if (
      data.accountType === 'company' &&
      (!data.numberOfEmployees || data.numberOfEmployees < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['numberOfEmployees'],
        message: 'Number of Employees is required',
      });
    }

    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
      });
    }
  });

const SignupPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      // accountType: 'personal',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    router.push('/dashboard');
  }

  // Watch the accountType value for changes
  const accountType = form.watch('accountType');

  const dobFromDate = new Date();
  // person can't be more than 120 years old
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120); // 120 years ago
  return (
    <>
      <PersonStandingIcon size={50} />

      <Card className="w-full max-w-screen-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>

          <CardDescription>
            Sign up for a new SupportMe account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col gap-4"
            >
              {/* Email  */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account Type */}
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          {/* If an account type is selected, the SelectValue render
                          that value. If not, it will render the placeholder. */}
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">
                          Personal
                        </SelectItem>
                        <SelectItem value="company">
                          Company
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Name and Number of Employees  if  accountType is company */}
              {accountType === 'company' && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Company Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Employees</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Number of Employees"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      {/* PopOverTrigger by default renders an HTML button
                      and anything we pass inside it will be rendered
                      inside the button. In this case, we are rendering
                      a button inside the button(PopoverTrigger), which
                      is not valid HTML markup. So, we are using asChild prop,
                      when using asChild prop, the PopoverTrigger won't render
                      any wrapper HTML tag around any children passed to it
                      and will transfer the stytling to the children. */}
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'normal-case font-normal flex justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          defaultMonth={field.value}
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date > new Date() ||
                          //   date < new Date('1900-01-01')
                          // }
                          //OR
                          // fromDate={new Date('1900-01-01')}
                          toDate={new Date()}
                          fromDate={dobFromDate}
                          fixedWeeks
                          weekStartsOn={0} // default is 0
                          initialFocus
                          captionLayout="dropdown-buttons" // only works if fromDate and toDate are provided
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Accept Terms */}

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="items-center flex space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        I accept the terms and conditions
                      </FormLabel>
                    </div>

                    <div className="space-y-1 leading-none">
                      <FormDescription>
                        By signing up you agree to our{' '}
                        <Link
                          href="/terms-and-conditions"
                          className="text-primary hover:underline"
                        >
                          terms and conditions
                        </Link>{' '}
                        page.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Log In</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignupPage;
