import InputText from '../../../shared/input/input-text';
import { View } from 'react-native';

export default function CreateTraceName({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <View>
      <InputText
        placeholder='Nom de la course'
        onChange={(text) => {
          setValue(text);
        }}
        value={value}
      />
    </View>
  );
}
