import {
  getAgenda,
  getAllAdmins,
  getAllAgendas,
  getAllCategories,
  getAllCategoriesTree,
} from '~/server/data'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { AgendaInputSchema } from '~/app/dashboard/_lib/types'

export const agendaRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => getAllAgendas()),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input: { id } }) => {
      const res = getAgenda(id)
      if (!res) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Agenda not found',
        })
      }
      return res
    }),
  getAllCategories: publicProcedure.query(() => getAllCategories()),
  getAllCategoriesTree: publicProcedure.query(() => getAllCategoriesTree()),
  getAllAdmins: publicProcedure.query(() => getAllAdmins()),
  create: publicProcedure.input(AgendaInputSchema).mutation(({ input }) => {
    console.log(`Creating agenda: ${input}`)
  }),
  update: publicProcedure
    .input(
      AgendaInputSchema.required({
        id: true,
      }),
    )
    .mutation(({ input }) => {
      console.log(`Updating agenda: ${input}`)
    }),
})
