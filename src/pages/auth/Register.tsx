import Logo from "@/assets/icons/Logo";
import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <Link to="/" className="flex items-center gap-2 font-medium">
        <Logo />
      </Link>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
