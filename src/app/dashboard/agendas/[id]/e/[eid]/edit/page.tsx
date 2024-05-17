import { EventForm } from '../../../_components/event-form';

export default function Page() {
  return (
    <div>
      <EventForm
        title='Modifier un événement'
        description='Modifiez les informations de cet événement en remplissant les champs ci-dessous.'
      />
    </div>
  );
}
