import Logo from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <Logo />
        </Link>
      </div>
      <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
