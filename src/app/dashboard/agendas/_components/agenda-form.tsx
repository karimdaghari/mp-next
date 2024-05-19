'use client';

import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { FileUploader } from '~/components/ui/file-uploader';
import { Form } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

export function AgendaForm() {
  const form = useForm();
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
        <Button className='w-full'>Sauvegarder</Button>
      </form>
    </Form>
  );
}
