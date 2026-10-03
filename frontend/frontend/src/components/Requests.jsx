import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../utils/api";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { removeConnections } from "../utils/connectionSlice";
import Avatar from "./Avatar";
import { EmptyState, Spinner } from "./Doodles";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/user/requests/received");
        dispatch(addRequests(res.data.data));
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };
    fetchRequests();
  }, [dispatch]);

  const reviewRequest = async (status, requestId) => {
    setBusyId(requestId);
    try {
      setError("");
      await api.post(`/request/review/${status}/${requestId}`);
      dispatch(removeRequest(requestId));
      // connections list is now stale
      if (status === "accepted") dispatch(removeConnections());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  if (!requests) {
    return error ? <EmptyState title="Oops!" note={error} /> : <Spinner />;
  }

  if (requests.length === 0) {
    return (
      <EmptyState title="No love letters" note="...yet! keep swiping 💌">
        <Link to="/feed" className="btn-hot mt-4">
          Go to feed
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="title-bubble text-5xl md:text-6xl">Love letters</h1>
        <p className="scribble mt-1 text-3xl">
          {requests.length} dev{requests.length === 1 ? "" : "s"} think
          {requests.length === 1 ? "s" : ""} you&apos;re cute
        </p>
      </div>
      {error && (
        <p className="mb-4 text-center font-semibold text-error">{error}</p>
      )}
      <ul className="flex flex-col gap-5">
        {requests.map((request, index) => {
          const sender = request.fromUserId;
          return (
            <li
              key={request._id}
              className={`card-pop flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:text-left ${
                index % 2 ? "sm:rotate-1" : "sm:-rotate-1"
              }`}
            >
              <Avatar user={sender} className="w-20" textClass="text-2xl" />
              <div className="flex-1">
                <h2 className="font-bubble text-2xl">
                  {sender.firstName} {sender.lastName}
                </h2>
                <p className="font-hand text-xl leading-tight">
                  {sender.about || "wants to connect!"}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="btn-plain !px-4"
                  disabled={busyId === request._id}
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  ✕ Pass
                </button>
                <button
                  className="btn-hot !px-4"
                  disabled={busyId === request._id}
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  ♥ Accept
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
