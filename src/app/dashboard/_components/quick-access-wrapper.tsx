import { api } from '~/trpc/server'
import { QuickAccess } from './quick-access'

export async function QuickAccessWrapper() {
  const data = await api.agenda.getAll()
  return <QuickAccess data={data} />
}
