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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '~/components/ui/navigation-menu';
import { TypographyMuted, TypographySmall } from '~/components/ui/typography';

export function Navbar() {
  const menu = [
    {
      label: 'Mes agenda',
      link: '/dashboard/agendas'
    }
  ];

  return (
    <nav className='p-2 px-4 bg-white border-b flex items-center justify-between shadow-sm'>
      <div className='flex items-center space-x-2'>
        <Logo className='h-7 w-fit' />
        <NavigationMenu>
          <NavigationMenuList className='pt-0.5'>
            {menu.map((item) => (
              <NavigationMenuItem
                className={buttonVariants({
                  variant: 'ghost',
                  className: 'font-normal'
                })}
                key={item.link}>
                <NavigationMenuLink asChild>
                  <Link href={item.link}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='pt-0.5'>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: 'ghost',
                className: 'flex items-center justify-start'
              })}>
              <Avatar className='mr-2 h-8 w-8'>
                <AvatarImage />
                <AvatarFallback>
                  <TypographySmall>JD</TypographySmall>
                </AvatarFallback>
              </Avatar>
              <div className='leading-snug text-left'>
                <TypographyMuted className='text-xs'>Dauphine</TypographyMuted>
                <TypographySmall>Jean Dupont</TypographySmall>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Jean Dupont</DropdownMenuLabel>
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
