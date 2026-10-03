import { useState } from "react";

// profile photo, falling back to initials when there is no (working) photo
const Avatar = ({ user, className = "w-10", textClass = "text-sm" }) => {
  // remember which URL failed so a new URL gets a fresh try
  const [brokenUrl, setBrokenUrl] = useState(null);
  const initials =
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  if (user?.photoUrl && user.photoUrl !== brokenUrl) {
    return (
      <div
        className={`${className} aspect-square shrink-0 rounded-full border-[3px] border-ink overflow-hidden bg-hot-deep`}
      >
        <img
          alt={`${user.firstName} ${user.lastName}`}
          src={user.photoUrl}
          className="h-full w-full object-cover"
          onError={() => setBrokenUrl(user.photoUrl)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${className} ${textClass} aspect-square shrink-0 rounded-full border-[3px] border-ink bg-baby flex items-center justify-center font-bubble text-ink`}
    >
      {initials || "?"}
    </div>
  );
};

export default Avatar;
