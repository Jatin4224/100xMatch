import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../utils/api";
import { addConnections } from "../utils/connectionSlice";
import Avatar from "./Avatar";
import { EmptyState, Spinner } from "./Doodles";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await api.get("/user/connections");
        dispatch(addConnections(res.data.data));
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };
    fetchConnections();
  }, [dispatch]);

  if (error) return <EmptyState title="Oops!" note={error} />;

  if (!connections) return <Spinner />;

  if (connections.length === 0) {
    return (
      <EmptyState title="No matches yet" note="your person is out there ⚡">
        <Link to="/feed" className="btn-hot mt-4">
          Start swiping
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="title-bubble text-5xl md:text-6xl">Your matches</h1>
        <p className="scribble mt-1 text-3xl">
          {connections.length} perfect pair
          {connections.length === 1 ? "" : "s"} 💞
        </p>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2">
        {connections.map((connection, index) => (
          <li
            key={connection._id}
            className={`card-pop flex items-center gap-4 p-5 ${
              index % 2 ? "sm:rotate-1" : "sm:-rotate-1"
            }`}
          >
            <Avatar user={connection} className="w-20" textClass="text-2xl" />
            <div className="min-w-0">
              <h2 className="font-bubble text-2xl break-words">
                {connection.firstName} {connection.lastName}
              </h2>
              {(connection.age || connection.gender) && (
                <p className="text-sm font-semibold text-white/60">
                  {[connection.age, connection.gender]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              {connection.about && (
                <p className="font-hand text-xl leading-tight">
                  {connection.about}
                </p>
              )}
              {connection.skills?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {connection.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="chip !text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
