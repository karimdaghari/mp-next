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
})
