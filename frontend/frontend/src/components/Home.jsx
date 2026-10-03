import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Bolt, Heart, Sparkle } from "./Doodles";

const FEATURES = [
  {
    emoji: "💘",
    title: "Swipe",
    description: "Flip through dev profiles. Like the vibe? Smash interested.",
    color: "bg-rose",
  },
  {
    emoji: "⚡",
    title: "Match",
    description: "When the feeling is mutual, it's a match. No ghosting the PR.",
    color: "bg-baby",
  },
  {
    emoji: "🚀",
    title: "Build",
    description: "Hackathons, side projects, mentorship. Ship something cute.",
    color: "bg-hot-deep",
  },
];

const Home = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative grid items-center gap-10 py-6 md:grid-cols-2">
        <motion.div
          className="relative text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "backOut" }}
        >
          <Bolt className="absolute -left-2 -top-10 w-14 animate-wiggle md:-left-10" />
          <h1 className="title-bubble text-[clamp(3.5rem,11vw,7.5rem)]">
            100x
            <br />
            Match
          </h1>
          <span className="sticker mt-4 -rotate-6 text-xl">for devs ♥</span>
          <p className="scribble mt-6 text-4xl -rotate-2">
            Commit to someone special.
          </p>
          <p className="mt-4 max-w-md text-lg mx-auto md:mx-0">
            <b>Swipe. Match. Build.</b> Find your coding partner, mentor or
            hackathon soulmate. Merge conflicts not included.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            {user ? (
              <Link to="/feed" className="btn-hot text-lg">
                Go to your feed 💘
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-hot text-lg">
                  Find your match 💘
                </Link>
                <Link to="/login" className="btn-baby text-lg">
                  I have an account
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* stacked "profile cards" collage */}
        <motion.div
          className="relative mx-auto h-[360px] w-[290px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
        >
          <div className="card-pop absolute inset-0 rotate-[-8deg] bg-baby" />
          <div className="card-pop absolute inset-0 rotate-[5deg] bg-rose" />
          <div className="card-pop absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-line bg-hot-deep text-6xl">
              👩‍💻
            </div>
            <p className="font-bubble text-2xl">Byte, 24</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="chip">React</span>
              <span className="chip !bg-white">Rust</span>
              <span className="chip !bg-rose">cats</span>
            </div>
            <p className="font-hand text-2xl leading-none">
              &quot;looking for my pair-programming partner&quot;
            </p>
          </div>
          <Heart className="absolute -right-6 -top-6 w-14 animate-float" />
          <Sparkle className="absolute -bottom-4 -left-6 w-10 animate-float" />
        </motion.div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-3">
        {FEATURES.map((item, index) => (
          <motion.div
            key={item.title}
            className={`card-pop p-6 text-center ${
              index % 2 ? "md:rotate-2" : "md:-rotate-2"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ rotate: 0, y: -6 }}
            transition={{ delay: 0.3 + index * 0.15 }}
          >
            <div
              className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-line text-3xl ${item.color}`}
            >
              {item.emoji}
            </div>
            <h3 className="title-bubble text-4xl">{item.title}</h3>
            <p className="mt-3">{item.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
