import type { Merge } from 'type-fest'
import { z } from 'zod'

const AdminSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().nullish(),
})

export type Admin = z.infer<typeof AdminSchema>

const SharedSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  description: z.string(),
  cover: z.string().nullish(),
  isDraft: z.boolean().nullish(),
})

export const EventSchema = SharedSchema.extend({
  agendaId: z.union([z.number(), z.string()]),
  location: z.string().nullish(),
  url: z.string().nullish(),
  startDate: z.string().datetime({ offset: true }).nullish(),
  endDate: z.string().datetime({ offset: true }).nullish(),
  categories: z.array(z.string()),
  likes: z.number().nullish(),
  subscribers: z.number().nullish(),
})

export type EventItem = z.infer<typeof EventSchema>

export const AgendaItemSchema = SharedSchema.extend({
  logo: z.string().nullish(),
  eventsNumber: z.number().nullable(),
  attendanceRate: z.number().nullable(),
  events: z.array(EventSchema),
  admins: z.array(AdminSchema).nullish(),
  categories: z.array(z.any()),
})

const CategoryItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  agendas: AgendaItemSchema.array(),
  rootId: z.number().nullish(),
  root: z.any().optional(),
})

export const AgendaSchema = AgendaItemSchema.extend({
  categories: z.array(CategoryItemSchema),
})

export type CategoryItem = Merge<
  z.infer<typeof CategoryItemSchema>,
  {
    root?: CategoryItem
  }
>

export interface CategoryTree extends CategoryItem {
  children?: CategoryItem[]
}

export type AgendaItem = z.infer<typeof AgendaSchema>

export const AgendaInputSchema = AgendaItemSchema.omit({
  admins: true,
  attendanceRate: true,
  eventsNumber: true,
  events: true,
  categories: true,
})
  .extend({
    categoriesIds: z.array(z.string().or(z.number())),
  })
  .partial({
    id: true,
  })

export type AgendaInput = z.infer<typeof AgendaInputSchema>

export const EventInputSchema = EventSchema.omit({
  subscribers: true,
  likes: true,
})

export type EventInput = z.infer<typeof EventInputSchema>
