import Avatar from "./Avatar";

// a developer's profile card; pass onInterested/onIgnore to show the feed buttons
const UserCard = ({ user, onInterested, onIgnore, busy = false }) => {
  const { firstName, lastName, age, gender, about, skills = [] } = user;
  const details = [age, gender].filter(Boolean).join(", ");

  return (
    <div className="card bg-base-200 w-full max-w-sm shadow-xl">
      <figure className="pt-8">
        <Avatar user={user} className="w-40" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {details && <p className="text-sm opacity-70 grow-0">{details}</p>}
        <p>{about || "No bio yet."}</p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        )}
        {(onInterested || onIgnore) && (
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-outline"
              onClick={onIgnore}
              disabled={busy}
            >
              Ignore
            </button>
            <button
              className="btn btn-error"
              onClick={onInterested}
              disabled={busy}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
