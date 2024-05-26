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
    <section className='flex xl:flex-row flex-col items-center xl:justify-between w-full gap-2 xl:gap-0'>
      <div className='flex items-center gap-2 flex-col lg:flex-row w-full'>
        <div className='flex lg:flex-row flex-col items-center gap-2 w-full'>
          <div className='xl:w-[350px] w-full'>
            <SearchInput placeholder='Rechercher vos events par titre, tag, lieu, etc...' />
          </div>
          <div className='xl:w-fit w-full'>
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
        </div>
      </div>
      <div className='flex items-center sm:flex-row flex-col gap-2 w-full xl:w-min'>
        <DateRangePicker
          showCompare={false}
          align='center'
        />
        <Select>
          <SelectTrigger
            id='sort'
            className='xl:w-[300px] w-full'>
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
            <SelectItem value='alphabetical-desc'>
              Alphabétique (Z-A)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
