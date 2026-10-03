import { Bolt, Heart } from "./Doodles";

// poster-style frame shared by login and signup
const AuthCard = ({ title, note, onSubmit, children }) => (
  <div className="mx-auto w-full max-w-md">
    <div className="mb-6 text-center">
      <h1 className="title-bubble text-6xl">{title}</h1>
      <p className="scribble mt-2 text-3xl -rotate-2">{note}</p>
    </div>
    <form onSubmit={onSubmit} className="card-pop relative flex flex-col gap-4 p-7">
      <Bolt className="absolute -right-5 -top-8 w-12 rotate-12" />
      <Heart className="absolute -bottom-5 -left-5 w-12 -rotate-12" />
      {children}
    </form>
  </div>
);

export default AuthCard;
