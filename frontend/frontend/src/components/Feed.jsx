import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import api, { getErrorMessage } from "../utils/api";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { EmptyState, Spinner } from "./Doodles";

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
    return <EmptyState title="Oops!" note={error} />;
  }

  if (!feed || (feed.length === 0 && !exhausted)) {
    return <Spinner />;
  }

  if (feed.length === 0) {
    return (
      <EmptyState
        title="That's everyone!"
        note="new devs drop in all the time, check back soon"
      />
    );
  }

  const user = feed[0];
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="title-bubble text-5xl">Who&apos;s your type?</h1>
        <p className="scribble mt-1 text-2xl">
          {feed.length} cutie{feed.length === 1 ? "" : "s"} in the queue
        </p>
      </div>
      <motion.div
        key={user._id}
        className="flex w-full justify-center"
        initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <UserCard
          user={user}
          busy={busy}
          onInterested={() => sendRequest("interested", user._id)}
          onIgnore={() => sendRequest("ignored", user._id)}
        />
      </motion.div>
      {error && <p className="font-semibold text-error">{error}</p>}
    </div>
  );
};

export default Feed;
