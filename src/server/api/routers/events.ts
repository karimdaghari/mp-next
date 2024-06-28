import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { EventInputSchema } from '~/app/dashboard/_lib/types'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { getEvent } from '~/server/data'

export const eventsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input: { id } }) => {
      const res = getEvent(id)
      if (!res) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Event not found',
        })
      }
      return res
    }),
  create: publicProcedure.input(EventInputSchema).mutation(({ input }) => {
    console.log('Creating event: ', input)
  }),
  update: publicProcedure
    .input(
      EventInputSchema.required({
        id: true,
        agendaId: true,
      }),
    )
    .mutation(({ input }) => {
      console.log('Updating event: ', input)
    }),
})
