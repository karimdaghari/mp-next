'use client'
import { isPast, isSameDay } from 'date-fns'
import { Rss } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Badge } from '~/components/ui/badge'
import { Button, buttonVariants } from '~/components/ui/button'
import { FileUploader } from '~/components/ui/file-uploader'
import { Form } from '~/components/ui/form'
import { Label } from '~/components/ui/label'
import { TypographyLarge, TypographyMuted } from '~/components/ui/typography'
import { EventPreview } from './event-preview'
import { TextInput } from '~/components/input/text'
import { api, type RouterInputs } from '~/trpc/react'
import { useEffect } from 'react'
import { SwitchInput } from '~/components/input/switch'
import { DateInput } from '~/components/input/date-picker'
import { toast } from 'sonner'
import { ComboboxInput } from '~/components/input/combobox'
import { TextareaInput } from '~/components/input/textarea'
import { useRouter } from 'next/navigation'

type Input = RouterInputs['events']['create'] | RouterInputs['events']['update']

interface Props {
  title: string
  subtitle: string
  input?: Input
  meta: {
    agendaName: string
    agendaLogo: string | null | undefined
  }
}

export function EventForm({ title, subtitle, input, meta }: Props) {
  const form = useForm<
    Input & {
      allDay?: boolean
    }
  >({
    defaultValues: input,
  })

  const [
    name,
    description,
    startDate,
    isDraft,
    agendaId,
    endDate,
    allDay,
    location,
    cover,
  ] = form.watch([
    'name',
    'description',
    'startDate',
    'isDraft',
    'agendaId',
    'endDate',
    'allDay',
    'location',
    'cover',
  ])

  const isPastEvent = startDate && isPast(new Date(startDate))

  // biome-ignore lint/correctness/useExhaustiveDependencies: no need to add `form` to the dependencies array
  useEffect(() => {
    if (startDate && endDate && isSameDay(startDate, endDate) && !allDay) {
      form.setValue('allDay', true)
    }
  }, [startDate, endDate, allDay])

  const router = useRouter()

  const create = api.events.create.useMutation({
    onSettled() {
      router.refresh()
    },
  })
  const update = api.events.update.useMutation({
    onSettled() {
      router.refresh()
    },
  })

  const pending = create.isPending || update.isPending

  return (
    <div className="grid lg:grid-cols-2 gap-1">
      <Form {...form}>
        <form
          className="bg-white p-4 rounded-lg border shadow space-y-4"
          onSubmit={form.handleSubmit((data) => {
            if (data.id) {
              toast.promise(update.mutateAsync({ ...data, id: data.id }), {
                loading: 'Mise à jour en cours...',
                success: 'Événement mis à jour',
                error: 'Erreur lors de la mise à jour',
              })
            } else {
              toast.promise(create.mutateAsync(data), {
                loading: 'Création en cours...',
                success: 'Événement créé',
                error: 'Erreur lors de la création',
              })
            }
          })}
        >
          <div>
            <div className="flex items-center">
              <TypographyLarge>{title}</TypographyLarge>
              {isDraft && <Badge className="ml-2">Brouillon</Badge>}
            </div>
            <TypographyMuted>{subtitle}</TypographyMuted>
          </div>
          <FileUploader label="Uploader la couverture de l’événement" />
          <TextInput
            control={form.control}
            name="name"
            label="Nom"
            placeholder="Nom"
            rules={{
              required: 'Ce champs est requis',
            }}
            readOnly={pending}
          />
          <TextareaInput
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            readOnly={pending}
            rules={{
              required: 'Ce champs est requis',
            }}
          />
          <TextInput
            control={form.control}
            name="location"
            label="Lieu"
            placeholder="Lieu"
            readOnly={pending}
          />
          <TextInput
            control={form.control}
            name="url"
            label="URL"
            type="url"
            readOnly={pending}
            placeholder="https://example.com"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="date">Date</Label>
              <div className="flex items-center">
                <SwitchInput
                  control={form.control}
                  name="allDay"
                  label="Journée entière"
                  readOnly={pending}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-2">
              <DateInput
                control={form.control}
                name="startDate"
                label="Début"
                placeholder="Sélectionnez une date et heure de début..."
                withTime
                readOnly={pending}
              />
              <DateInput
                control={form.control}
                minDate={startDate ? new Date(startDate) : undefined}
                name="endDate"
                label="Fin"
                placeholder="Sélectionnez une date et heure de fin..."
                withTime
                readOnly={pending}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <ComboboxInput
              control={form.control}
              name="categories"
              label="Catégories"
              placeholder="Sélectionnez une catégorie..."
              multiple
              data={[
                {
                  label: 'Cat. 1',
                  value: '1',
                },
                {
                  label: 'Cat. 2',
                  value: '2',
                },
                {
                  label: 'Cat. 3',
                  value: '3',
                },
              ]}
              readOnly={pending}
            />
          </div>
          <div className="flex items-center lg:flex-row flex-col gap-2">
            <Button
              type="submit"
              loading={update.isPending}
              variant={isDraft ? 'secondary' : 'default'}
              className="w-full"
            >
              Sauvegarder
            </Button>
            {isDraft ||
              (!agendaId && (
                <Button
                  type="submit"
                  loading={create.isPending}
                  className={buttonVariants({
                    variant: isDraft ? 'default' : 'secondary',
                    className: 'w-full',
                  })}
                >
                  <Rss className="w-4 h-4 mr-2" />
                  Publier
                </Button>
              ))}
          </div>
        </form>
      </Form>
      <div className="bg-white p-4 border rounded-lg">
        <div>
          <TypographyLarge>Prévisualisation</TypographyLarge>
          <TypographyMuted>
            Aperçu de {"l'événement"} tel {"qu'il"} sera affiché sur iPhone
          </TypographyMuted>
        </div>
        <div className="lg:scale-95 hidden lg:block">
          <EventPreview
            coverImage={cover}
            name={name}
            description={description}
            location={location}
            agendaName={meta.agendaName}
            agendaLogo={meta.agendaLogo}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="lg:hidden mt-4">
          <TypographyMuted>
            Vous êtes sur une version mobile, pour afficher la prévisualisation
            de {"l'événement"}, veuillez utilisez un écran plus large.
          </TypographyMuted>
        </div>
      </div>
    </div>
  )
}
