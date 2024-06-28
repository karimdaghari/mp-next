'use client'

import { Rss } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { FileUploader } from '~/components/ui/file-uploader'
import { Form } from '~/components/ui/form'
import { api, type RouterInputs } from '~/trpc/react'
import { TextInput } from '~/components/input/text'
import { TextareaInput } from '~/components/input/textarea'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Input = RouterInputs['agenda']['create'] | RouterInputs['agenda']['update']

interface Props {
  input?: Input
  intent: 'update' | 'create'
  onCancel?: () => void
}

export function AgendaForm({ input, intent = 'update' }: Props) {
  const form = useForm<Input>({
    defaultValues: {
      isDraft: true,
      ...input,
    },
  })

  const [isDraft] = form.watch(['isDraft'])

  const router = useRouter()

  const create = api.agenda.create.useMutation({
    onSettled() {
      router.refresh()
    },
  })
  const update = api.agenda.update.useMutation({
    onSettled() {
      router.refresh()
    },
  })

  const pending = create.isPending || update.isPending

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(async (data) => {
          if (data.id) {
            toast.promise(update.mutateAsync({ ...data, id: data.id }), {
              loading: 'Enregistrement en cours...',
              success: 'Agenda actualisé',
              error: 'Erreur lors de l’enregistrement',
            })
          } else {
            toast.promise(create.mutateAsync(data), {
              loading: 'Enregistrement en cours...',
              success:
                'Votre demande a été envoyée. Nous reviendrons vers vous sous peu.',
              error: 'Erreur lors de l’envoi de la demande',
            })
          }
        })}
      >
        <FileUploader label="Uploader la couverture de l’agenda" />
        <div className="flex justify-center w-full">
          <FileUploader
            label="Uploader le logo de l’agenda"
            className="w-44 h-44 rounded-full"
            isAvatar
          />
        </div>
        <TextInput
          control={form.control}
          name="name"
          label="Nom"
          placeholder="Nom de l’agenda"
          rules={{
            required: 'Ce champ est requis',
          }}
          readOnly={pending}
        />
        <TextareaInput
          control={form.control}
          name="description"
          label="Description"
          placeholder="Description de l’agenda"
          rows={5}
          readOnly={pending}
          rules={{
            required: 'Ce champ est requis',
          }}
        />
        {intent === 'create' ? (
          <Button type="submit" className="w-full" loading={create.isPending}>
            Envoyer la demande
          </Button>
        ) : (
          <div className="flex items-center w-full gap-1 flex-wrap lg:flex-nowrap">
            <Button loading={update.isPending} type="submit" className="w-full">
              Sauvegarder
            </Button>
            {isDraft && (
              <Button type="submit" className="w-full" variant="secondary">
                <Rss className="mr-2 w-4 h-4" />
                Publier
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  )
}
