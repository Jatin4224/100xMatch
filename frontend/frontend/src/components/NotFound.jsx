import { Link } from "react-router-dom";
import { EmptyState } from "./Doodles";

const NotFound = () => {
  return (
    <EmptyState title="404" note="this page ghosted you">
      <Link to="/" className="btn-grape mt-4">
        Take me home
      </Link>
    </EmptyState>
  );
};

export default NotFound;
