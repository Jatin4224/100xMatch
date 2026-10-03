import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center mt-20 gap-4 text-center">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="text-gray-300">This page doesn&apos;t exist.</p>
      <Link to="/" className="btn btn-outline btn-error">
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
