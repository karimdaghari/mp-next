'use client';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '~/components/logo/logo';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { buttonVariants } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { TypographyMuted, TypographySmall } from '~/components/ui/typography';

export function Navbar() {
  return (
    <nav className='p-2 px-4 bg-white border-b flex items-center justify-between shadow-sm'>
      <div className='flex items-center space-x-2'>
        <Link href='/dashboard/agendas'>
          <Logo
            className={buttonVariants({
              variant: 'ghost',
              className: 'h-10 w-fit'
            })}
          />
        </Link>
      </div>
      <div className='pt-0.5'>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: 'ghost',
                className: 'flex items-center justify-start'
              })}>
              <div className='leading-snug text-right'>
                <TypographySmall>Dauphine</TypographySmall>
                <TypographyMuted className='text-xs hidden lg:block'>
                  Jean Michel Da Silva Da Costa
                </TypographyMuted>
              </div>
              <Avatar className='ml-2 h-8 w-8'>
                <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXia5ZUF0lUUa3JrMJzVQ2r-ojR8D6E9tZnd6D-6teRQ&s' />
                <AvatarFallback>
                  <TypographySmall>D</TypographySmall>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                Jean Michel Da Silva Da Costa
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem>
                <LogOutIcon className='h-4 w-4 mr-2' />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
