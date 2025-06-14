import { useState } from  'react';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';

export function Calendar() {
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState(new Date());

  return (
    <DateTimePicker
      mode="single"
      date={selected}
      onChange={({ date }) =>  setSelected(date)}
      styles={defaultStyles}
    />
  );
}