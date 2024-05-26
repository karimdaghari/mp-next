import { SearchInput } from './search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { DisplayFilters } from './display-filters';

export function AgendaFilters() {
  return (
    <section className='flex w-full flex-col lg:flex-row lg:justify-between gap-2 lg:gap-0'>
      <div className='flex items-center lg:flex-row flex-col gap-2'>
        <div className='w-full lg:w-[300px]'>
          <SearchInput placeholder='Rechercher vos agendas...' />
        </div>
        <div className='lg:w-fit w-full'>
          <DisplayFilters />
        </div>
      </div>

      <Select>
        <SelectTrigger
          id='sort'
          className='w-full lg:w-[260px]'>
          <SelectValue placeholder='Trier par' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='popular-first'>
            Popularité (plus populaire en 1er)
          </SelectItem>
          <SelectItem value='unpopular-first'>
            Popularité (moins populaire 1er)
          </SelectItem>
          <SelectItem value='alphabetical-asc'>Alphabétique (A-Z)</SelectItem>
          <SelectItem value='alphabetical-desc'>Alphabétique (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
}
