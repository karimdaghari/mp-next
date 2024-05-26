import { getAllAgendas } from '../_lib/data';
import { QuickAccess } from './quick-access';

export async function QuickAccessWrapper() {
  const data = await getAllAgendas();
  return <QuickAccess data={data} />;
}
