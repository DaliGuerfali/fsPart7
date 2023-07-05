import Notification from "../components/Notification";
import LoginForm from "../components/LoginForm";

const LoginView = () => {
    return (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </>
    );
}

export default LoginView;