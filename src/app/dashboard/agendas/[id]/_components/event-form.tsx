'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { MultiSelect } from '~/components/multi-select';
import { Button, buttonVariants } from '~/components/ui/button';
import { DatePicker } from '~/components/ui/date-picker';
import { Form } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import { Textarea } from '~/components/ui/textarea';
import { TypographyLarge, TypographyMuted } from '~/components/ui/typography';
import { EventPreview } from './event-preview';

interface Input {
  name: string;
  description?: string;
  location?: string;
  url?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  tags: string[];
}

interface Props {
  title: string;
  description: string;
  input?: Input;
}

export function EventForm({ title, description, input }: Props) {
  const form = useForm<Input>({
    defaultValues: input
  });

  return (
    <div className='grid grid-cols-2 gap-1'>
      <Form {...form}>
        <form className='bg-white p-4 rounded-lg border shadow space-y-4'>
          <div>
            <TypographyLarge>{title}</TypographyLarge>
            <TypographyMuted>{description}</TypographyMuted>
          </div>
          <div>
            <Label htmlFor='name'>Nom</Label>
            <Input id='name' />
          </div>
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              rows={5}
            />
          </div>
          <div>
            <Label htmlFor='location'>Lieu</Label>
            <Input id='location' />
          </div>
          <div>
            <Label htmlFor='url'>URL</Label>
            <Input
              type='url'
              id='url'
            />
          </div>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='date'>Date</Label>
              <div className='flex items-center'>
                <Label
                  htmlFor='all-day'
                  className='mr-2'>
                  Toute la journée
                </Label>
                <Switch id='all-day' />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='flex flex-col space-y-2 w-full'>
                <Label>Début</Label>
                <DatePicker />
              </div>
              <div className='flex flex-col space-y-2 w-full'>
                <Label>Fin</Label>
                <DatePicker />
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-2'>
            <Label>Tags</Label>
            <MultiSelect
              placeholder='Sélectionnez un tag...'
              data={[
                { value: '1', label: 'Tag 1' },
                { value: '2', label: 'Tag 2' },
                { value: '3', label: 'Tag 3' }
              ]}
            />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Link
              href='/dashboard/agendas/1'
              className={buttonVariants({ variant: 'secondary' })}>
              Annuler
            </Link>
            <Button className='w-full'>Sauvegarder</Button>
          </div>
        </form>
      </Form>
      <div className='bg-white p-4 border rounded-lg space-y-4'>
        <div>
          <TypographyLarge>Prévisualisation</TypographyLarge>
          <TypographyMuted>
            Aperçu de {"l'événement"} tel {"qu'il"} sera affiché sur iPhone
          </TypographyMuted>
        </div>
        <div className='scale-90'>
          <EventPreview />
        </div>
      </div>
    </div>
  );
}
