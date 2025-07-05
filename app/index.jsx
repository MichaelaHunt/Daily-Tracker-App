import Home from './home';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} hidden={false}></StatusBar>
      <Home></Home>
    </>
  );
}