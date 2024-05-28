'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DayPicker,
  useNavigation,
  useDayPicker,
} from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from './select';
import { format } from 'date-fns';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium', // 'hidden'
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        caption_dropdowns: 'flex gap-1',
        ...classNames,
      }}
      components={{
        CaptionLabel: () => null,
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4" />
        ),
        Dropdown: (dropdownProps) => {
          let selectItems: { value: string; label: string }[] = [];
          let label = '';

          let dayPickerProps = useDayPicker(); // returns the props passed to DayPicker

          if (dropdownProps.name === 'months') {
            label = 'Month';
            selectItems = Array.from({ length: 12 }).map((_, idx) => {
              return {
                value: idx.toString(),
                label: format(
                  new Date(new Date().getFullYear(), idx, 1),
                  'MMM'
                ),
              };
            });
          } else if (dropdownProps.name === 'years') {
            label = 'Year';
            let fromYear =
              dayPickerProps.fromYear ||
              dayPickerProps.fromMonth?.getFullYear() ||
              dayPickerProps.fromDate?.getFullYear();
            let toYear =
              dayPickerProps.toYear ||
              dayPickerProps.toMonth?.getFullYear() ||
              dayPickerProps.toDate?.getFullYear();

            if (fromYear && toYear) {
              selectItems = Array.from(
                { length: toYear - fromYear + 1 },
                (_, idx) => {
                  return {
                    value: (fromYear + idx).toString(),
                    label: (fromYear + idx).toString(),
                  };
                }
              );
            }
          }

          let navigate = useNavigation(); // to navigate between months or years in DayPicker.

          // currentMonth is the currently visible month in the calander and not the
          // month or date the user has selected.
          const { currentMonth } = navigate;

          const caption = format(
            currentMonth,
            dropdownProps.name === 'years' ? 'yyyy' : 'MMM'
          );
          return (
            <Select
              onValueChange={(newValue) => {
                if (dropdownProps.name === 'months') {
                  // currentMonth represents the currently visible month in the calendar
                  // and not the current selection or the date that user has selected in the calander.
                  const date = new Date(currentMonth);
                  date.setMonth(parseInt(newValue)); // only update the month part of the currently visible date in the calendar.
                  navigate.goToMonth(date);
                } else if (dropdownProps.name === 'years') {
                  const date = new Date(currentMonth);
                  date.setFullYear(parseInt(newValue)); // only update the year part of the currently visible date in the calendar.
                  navigate.goToMonth(date);
                }
              }}
              value={dropdownProps.value?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder={caption} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>{label}</SelectLabel> */}

                  {selectItems.map((item) => {
                    return (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
