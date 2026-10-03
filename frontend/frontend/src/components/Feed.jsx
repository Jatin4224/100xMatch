import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import api, { getErrorMessage } from "../utils/api";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [exhausted, setExhausted] = useState(false);

  const getFeed = useCallback(async () => {
    try {
      setError("");
      const res = await api.get("/feed");
      dispatch(addFeed(res.data.data));
      // nothing new came back, so stop refetching
      setExhausted(res.data.data.length === 0);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, [dispatch]);

  useEffect(() => {
    // first load, or the current page has been swiped through
    if (!feed || (feed.length === 0 && !exhausted)) {
      getFeed();
    }
  }, [feed, exhausted, getFeed]);

  const sendRequest = async (status, userId) => {
    setBusy(true);
    try {
      setError("");
      await api.post(`/request/send/${status}/${userId}`);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  if (error && !feed?.length) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!feed || (feed.length === 0 && !exhausted)) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <p className="text-center mt-10 text-lg">
        You&apos;ve seen everyone for now. Check back later!
      </p>
    );
  }

  const user = feed[0];
  return (
    <div className="flex flex-col items-center gap-4">
      <UserCard
        user={user}
        busy={busy}
        onInterested={() => sendRequest("interested", user._id)}
        onIgnore={() => sendRequest("ignored", user._id)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Feed;
