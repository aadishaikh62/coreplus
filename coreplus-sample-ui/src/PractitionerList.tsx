import { Practitioner } from './types';

type Props = {
  supervisorPractitioners: Practitioner[];
  otherPractitioners: Practitioner[];
  onPractitionerClick: (practitioner: Practitioner) => void;
};

function PractitionerList({ supervisorPractitioners, otherPractitioners, onPractitionerClick }: Props) {
  return (
    <div>
      <h2>Supervisor Practitioners</h2>
      <ul>
        {supervisorPractitioners.map((practitioner) => (
          <li key={practitioner.id} onClick={() => onPractitionerClick(practitioner)}>
            {practitioner.name}
          </li>
        ))}
      </ul>
      <h2>Other Practitioners</h2>
      <ul>
        {otherPractitioners.map((practitioner) => (
          <li key={practitioner.id} onClick={() => onPractitionerClick(practitioner)}>
            {practitioner.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PractitionerList;
