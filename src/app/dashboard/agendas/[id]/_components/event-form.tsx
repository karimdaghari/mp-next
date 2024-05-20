'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { MultiSelect } from '~/components/multi-select';
import { Button, buttonVariants } from '~/components/ui/button';
import { DatePicker } from '~/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import { Textarea } from '~/components/ui/textarea';
import { TypographyLarge, TypographyMuted } from '~/components/ui/typography';
import { EventPreview } from './event-preview';
import type { EventItem } from '~/app/dashboard/_lib/types';
import { CopyIcon, Lock, Rss } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { isPast } from 'date-fns';
import { FileUploader } from '~/components/ui/file-uploader';

interface Props {
  title: string;
  description: string;
  input?: EventItem;
}

export function EventForm({ title, description, input }: Props) {
  const form = useForm<EventItem>({
    defaultValues: {
      isDraft: true,
      ...input
    }
  });

  const [startDate, isDraft, agendaId] = form.watch([
    'startDate',
    'isDraft',
    'agendaId'
  ]);

  const isPastEvent = startDate && isPast(new Date(startDate));

  return (
    <div className='grid grid-cols-2 gap-1'>
      <Form {...form}>
        <form className='bg-white p-4 rounded-lg border shadow space-y-4'>
          <div>
            <div className='flex items-center'>
              <TypographyLarge>{title}</TypographyLarge>
              {isDraft && <Badge className='ml-2'>Brouillon</Badge>}
            </div>
            <TypographyMuted>{description}</TypographyMuted>
          </div>
          <FileUploader label='Uploader la couverture de l’événement' />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nom'
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Description'
                    rows={5}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Lieu'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder='URL'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
            <Label>Catégories</Label>
            <MultiSelect
              placeholder='Sélectionnez une catégorie...'
              data={[
                { value: '1', label: 'Cat. 1' },
                { value: '2', label: 'Cat. 2' },
                { value: '3', label: 'Cat. 3' }
              ]}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant={isDraft ? 'secondary' : 'default'}
              className='w-full'>
              Sauvegarder
            </Button>
            {isDraft || !agendaId ? (
              <Button
                className={buttonVariants({
                  variant: isDraft ? 'default' : 'secondary',
                  className: 'w-full'
                })}>
                <Rss className='w-4 h-4 mr-2' />
                Publier
              </Button>
            ) : (
              <>
                <Button
                  className={buttonVariants({
                    variant: 'secondary',
                    className: 'w-full'
                  })}>
                  <CopyIcon className='w-4 h-4 mr-2' />
                  Dupliquer
                </Button>
                {!isPastEvent && (
                  <Button
                    className={buttonVariants({
                      variant: 'secondary',
                      className: 'w-full'
                    })}>
                    <Lock className='w-4 h-4 mr-2' />
                    Désactiver
                  </Button>
                )}
              </>
            )}
          </div>
        </form>
      </Form>
      <div className='bg-white p-4 border rounded-lg'>
        <div>
          <TypographyLarge>Prévisualisation</TypographyLarge>
          <TypographyMuted>
            Aperçu de {"l'événement"} tel {"qu'il"} sera affiché sur iPhone
          </TypographyMuted>
        </div>
        <div className='scale-95'>
          <EventPreview />
        </div>
      </div>
    </div>
  );
}
