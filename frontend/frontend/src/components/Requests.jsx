import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api, { getErrorMessage } from "../utils/api";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { removeConnections } from "../utils/connectionSlice";
import Avatar from "./Avatar";

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
    return error ? (
      <p className="text-center text-red-500 mt-10">{error}</p>
    ) : (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Requests</h1>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {requests.length === 0 ? (
        <p className="text-center opacity-70">No pending requests.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {requests.map((request) => {
            const sender = request.fromUserId;
            return (
              <li
                key={request._id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-base-200 rounded-box p-4"
              >
                <Avatar user={sender} className="w-16" />
                <div className="flex-1">
                  <h2 className="font-bold text-lg">
                    {sender.firstName} {sender.lastName}
                  </h2>
                  <p>{sender.about}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={busyId === request._id}
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    disabled={busyId === request._id}
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Requests;
