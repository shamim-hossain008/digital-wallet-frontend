import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="text-gray-600">
        You do not have permission to access this page.
      </p>

      <Link to="/login" className="rounded bg-primary px-4 py-2 text-white">
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
