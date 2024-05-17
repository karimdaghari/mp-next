'use client';

import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

export function AgendaForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className='space-y-4'>
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
