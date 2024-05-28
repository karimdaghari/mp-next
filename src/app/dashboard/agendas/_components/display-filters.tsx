import { Settings2 } from 'lucide-react';
import { Fragment } from 'react';
import { buttonVariants } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Separator } from '~/components/ui/separator';
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall
} from '~/components/ui/typography';

interface Props {
  label: string;
  data?: Array<
    {
      label: string;
      value: string;
    }[]
  >;
}

export function DisplayFilters({ data, label }: Props) {
  return (
    <Popover>
      <PopoverTrigger
        className={buttonVariants({
          variant: 'outline',
          className: 'w-full'
        })}>
        <Settings2 className='w-4 h-4 mr-2' />
        {label}
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='space-y-4'>
        <div>
          <TypographySmall>Gérer {"l'affichage"} des cartes</TypographySmall>
          <TypographyMuted>
            Choisissez les cartes que vous souhaitez afficher.
          </TypographyMuted>
        </div>
        <RadioGroup defaultValue='all'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='all'
              id='r1'
            />
            <Label htmlFor='r1'>Afficher tout</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='with-drafts'
              id='r2'
            />
            <Label htmlFor='r2'>Afficher que les brouillons</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='published-only'
              id='r3'
            />
            <Label htmlFor='r3'>Afficher que les publiés</Label>
          </div>
        </RadioGroup>
        {data?.map((d) => (
          <Fragment key={Math.random()}>
            <Separator />
            <RadioGroup value={d[0].value}>
              {d.map((item) => (
                <div
                  key={Math.random()}
                  className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value={item.value}
                    id={item.value}
                  />
                  <Label htmlFor={item.value}>{item.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </Fragment>
        ))}
      </PopoverContent>
    </Popover>
  );
}
