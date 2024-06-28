import type { Merge } from 'type-fest'
import { z } from 'zod'

export const AdminSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().nullish(),
})

export type Admin = z.infer<typeof AdminSchema>

const SharedSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  description: z.string().nullish(),
  cover: z.string().nullish(),
  isDraft: z.boolean().nullish(),
})

type Shared = z.infer<typeof SharedSchema>

export const EventSchema = SharedSchema.extend({
  agendaId: z.union([z.number(), z.string()]),
  location: z.string().nullish(),
  url: z.string().nullish(),
  startDate: z.string().nullish(),
  endDate: z.string().nullish(),
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
