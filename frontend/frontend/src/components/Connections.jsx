import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api, { getErrorMessage } from "../utils/api";
import { addConnections } from "../utils/connectionSlice";
import Avatar from "./Avatar";

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

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  if (!connections) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Connections</h1>
      {connections.length === 0 ? (
        <p className="text-center opacity-70">
          No connections yet. Head to the feed and show some interest!
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {connections.map((connection) => (
            <li
              key={connection._id}
              className="flex items-center gap-4 bg-base-200 rounded-box p-4"
            >
              <Avatar user={connection} className="w-16" />
              <div>
                <h2 className="font-bold text-lg">
                  {connection.firstName} {connection.lastName}
                </h2>
                {(connection.age || connection.gender) && (
                  <p className="text-sm opacity-70">
                    {[connection.age, connection.gender]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
                <p>{connection.about}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Connections;
