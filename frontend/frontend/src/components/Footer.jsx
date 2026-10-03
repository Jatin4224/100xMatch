import { Heart } from "./Doodles";

const Footer = () => {
  return (
    <footer className="border-t-[3px] border-line bg-night text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p className="font-bubble text-lg">
        100<span className="text-hot">x</span>Match
      </p>
      <p className="font-hand text-2xl text-hot-soft flex items-center gap-2">
        Code on. Hearts out. <Heart className="w-5" />
      </p>
      <p className="text-sm text-white/60">
        © {new Date().getFullYear()} made with ♥ for devs
      </p>
    </footer>
  );
};

export default Footer;
