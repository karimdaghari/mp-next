import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover';
import { SearchInput } from './search-input';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { buttonVariants } from '~/components/ui/button';
import { TypographyH4, TypographyMuted } from '~/components/ui/typography';
import { Settings2Icon } from 'lucide-react';
import { Checkbox } from '~/components/ui/checkbox';

export function AgendaFilters() {
  return (
    <section className='flex w-full justify-between'>
      <div className='flex items-center space-x-2'>
        <div className='w-[300px]'>
          <SearchInput placeholder='Rechercher vos agendas...' />
        </div>
        <div className='flex items-center space-x-2 border p-3 rounded-lg'>
          <Checkbox
            id='display'
            checked
          />
          <Label
            htmlFor='display'
            className='inline-block'>
            Afficher les brouillons
          </Label>
        </div>
      </div>

      <div className='flex items-center space-x-2'>
        <Select>
          <SelectTrigger
            id='sort'
            className='w-[200px]'>
            <SelectValue placeholder='Trier par popularité' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Plus populaire</SelectItem>
            <SelectItem value='dark'>Moins populaire</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger
            id='sort'
            className='w-[250px]'>
            <SelectValue placeholder='Trier par ordre alphabétique' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>De A à Z</SelectItem>
            <SelectItem value='dark'>De Z à A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
