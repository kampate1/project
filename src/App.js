import './App.css';
import { LoginForm } from './LoginForm/LoginForm';
import { UserList } from './user/user';
import { RegisterForm } from './LoginForm/LoginForm';


function App() {
  console.log("App rendered");

  return (
    <div className="App">
      <LoginForm/>
      <RegisterForm/>
      <UserList/>
    </div>
  );
}

export default App;
