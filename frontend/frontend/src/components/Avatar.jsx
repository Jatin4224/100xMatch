import { useState } from "react";

// profile photo, falling back to initials when there is no (working) photo
const Avatar = ({ user, className = "w-10" }) => {
  const [broken, setBroken] = useState(false);
  const initials =
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  if (user?.photoUrl && !broken) {
    return (
      <div className="avatar">
        <div className={`${className} rounded-full`}>
          <img
            alt={`${user.firstName} ${user.lastName}`}
            src={user.photoUrl}
            onError={() => setBroken(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="avatar placeholder">
      <div
        className={`${className} rounded-full bg-neutral text-neutral-content`}
      >
        <span>{initials || "?"}</span>
      </div>
    </div>
  );
};

export default Avatar;
