import { DashboardHeader } from '~/components/dashboard-header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader
        title='Historique'
        description="Accédez à l'historique des différentes modifications apportées à votre compte"
      />
      {children}
    </>
  );
}
