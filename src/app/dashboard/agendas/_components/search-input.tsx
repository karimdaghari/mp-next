import { SearchIcon } from 'lucide-react';
import { Input } from '~/components/ui/input';

interface Props {
  placeholder: string;
}

export function SearchInput({ placeholder }: Props) {
  return (
    <div className='relative'>
      <SearchIcon className='h-4 w-4 absolute left-3 top-3' />
      <Input
        className='pl-8'
        placeholder={placeholder}
      />
    </div>
  );
}
