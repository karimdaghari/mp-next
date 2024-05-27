'use client';

import { useForm } from 'react-hook-form';
import { Button, buttonVariants } from '~/components/ui/button';
import { FileUploader } from '~/components/ui/file-uploader';
import { Form } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import type { AgendaItem } from '../../_lib/types';
import { CopyIcon, LockIcon, Rss } from 'lucide-react';

interface Props {
  input?: Omit<AgendaItem, 'events' | 'categories'>;
}

export function AgendaForm({ input }: Props) {
  const form = useForm<AgendaItem>({
    defaultValues: {
      isDraft: true,
      ...input
    }
  });

  const [isDraft] = form.watch(['isDraft']);

  return (
    <Form {...form}>
      <form className='space-y-4'>
        <FileUploader label='Uploader la couverture de l’agenda' />
        <div className='flex justify-center w-full'>
          <FileUploader
            label='Uploader le logo de l’agenda'
            className='w-44 h-44 rounded-full'
            isAvatar
          />
        </div>
        <div>
          <Label>Nom</Label>
          <Input />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea rows={5} />
        </div>
        <div className='flex items-center w-full gap-1 flex-wrap lg:flex-nowrap'>
          <Button className='w-full'>Sauvegarder</Button>
          {isDraft ? (
            <Button
              className='w-full'
              variant='secondary'>
              <Rss className='mr-2 w-4 h-4' />
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
              <Button
                className={buttonVariants({
                  variant: 'secondary',
                  className: 'w-full'
                })}>
                <LockIcon className='w-4 h-4 mr-2' />
                Désactiver
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
