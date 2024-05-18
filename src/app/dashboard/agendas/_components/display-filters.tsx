import { Settings2 } from 'lucide-react';
import { buttonVariants } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall
} from '~/components/ui/typography';

export function DisplayFilters() {
  return (
    <Popover>
      <PopoverTrigger
        className={buttonVariants({
          variant: 'outline'
        })}>
        <Settings2 className='w-4 h-4 mr-2' />
        Options {"d'affichage"}
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
      </PopoverContent>
    </Popover>
  );
}
