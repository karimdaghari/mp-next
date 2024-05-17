'use client';
import { MultiSelect } from '~/components/multi-select';
import { SearchInput } from '../../_components/search-input';
import { DateRangePicker } from '~/components/date-range-picker';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';

export function EventsFilters() {
  return (
    <section className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <div className='flex items-center space-x-2'>
          <div className='w-[350px]'>
            <SearchInput placeholder='Rechercher vos events par titre, tag, lieu, etc...' />
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
        <div>
          <DateRangePicker
            showCompare={false}
            align='center'
          />
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
