'use client';
import { SearchInput } from '../../_components/search-input';
import { DateRangePicker } from '~/components/date-range-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { DisplayFilters } from '../../_components/display-filters';

export function EventsFilters() {
  return (
    <section className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <div className='flex items-center space-x-2'>
          <div className='w-[350px]'>
            <SearchInput placeholder='Rechercher vos events par titre, tag, lieu, etc...' />
          </div>
          <DisplayFilters
            data={[
              [
                {
                  label: 'Afficher que les events en cours',
                  value: 'current'
                },
                {
                  label: 'Afficher que les events passés',
                  value: 'past'
                },
                {
                  label: 'Afficher tous les events',
                  value: 'all'
                }
              ]
            ]}
          />
        </div>
        <div>
          <DateRangePicker
            showCompare={false}
            align='center'
          />
        </div>
      </div>

      <Select>
        <SelectTrigger
          id='sort'
          className='w-[300px]'>
          <SelectValue placeholder='Trier par' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='popular-first'>
            Popularité (plus populaire en 1er)
          </SelectItem>
          <SelectItem value='unpopular-first'>
            Popularité (moins populaire en 1er)
          </SelectItem>
          <SelectItem value='alphabetical-asc'>Alphabétique (A-Z)</SelectItem>
          <SelectItem value='alphabetical-desc'>Alphabétique (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
}
