import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import moduleName, { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
