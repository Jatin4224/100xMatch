import Avatar from "./Avatar";
import { Bolt } from "./Doodles";

const CHIP_COLORS = ["", "!bg-rose", "!bg-white"];

// a developer's profile card; pass onInterested/onIgnore to show the feed buttons
const UserCard = ({ user, onInterested, onIgnore, busy = false }) => {
  const { firstName, lastName, age, gender, about, skills = [] } = user;
  const details = [age, gender].filter(Boolean).join(" · ");

  return (
    <div className="card-pop relative w-full max-w-sm overflow-visible">
      <Bolt className="absolute -right-4 -top-6 z-10 w-11 rotate-12" />
      <div className="flex justify-center rounded-t-[1.5rem] border-b-[3px] border-line bg-hot py-8">
        <Avatar user={user} className="w-40" textClass="text-5xl" />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div>
          <h2 className="title-bubble text-4xl break-words">
            {firstName} {lastName}
          </h2>
          {details && (
            <p className="mt-1 font-semibold text-white/60">{details}</p>
          )}
        </div>
        <p className="font-hand text-2xl leading-tight">
          {about || "still writing my bio..."}
        </p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={skill}
                className={`chip ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        {(onInterested || onIgnore) && (
          <div className="mt-3 flex justify-center gap-4">
            <button
              className="btn-plain"
              onClick={onIgnore}
              disabled={busy}
              aria-label="Ignore"
            >
              ✕ Nope
            </button>
            <button
              className="btn-hot"
              onClick={onInterested}
              disabled={busy}
              aria-label="Interested"
            >
              ♥ Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
