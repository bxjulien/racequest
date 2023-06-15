import InputText from '../../../shared/input/input-text';

export default function CreateTraceName({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <InputText
      placeholder='Nom de la course'
      onChange={(text) => {
        setValue(text);
      }}
      value={value}
    />
  );
}
