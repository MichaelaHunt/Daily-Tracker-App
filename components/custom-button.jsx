import { Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function CustomButton(props) {
  return (
    <TouchableOpacity style={globalStyles.button} onPress={props.function}>
      <Text style={globalStyles.buttonText}>{props.label}</Text>
    </TouchableOpacity>
  );
}