import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  {
    title: "Swipe",
    description:
      "Connect with like-minded developers by swiping through profiles.",
  },
  {
    title: "Match",
    description: "Find the best match based on skills, interests, and goals.",
  },
  {
    title: "Collaborate",
    description:
      "Start working on projects, hackathons, or mentorship programs.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <motion.section
        className="flex flex-col items-center text-center mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Connecting Developers,{" "}
          <span className="text-red-400">100x Faster!</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl">
          Find your perfect coding partner, mentor, or collaborator
          effortlessly. Swipe, match, and build amazing projects together.
        </p>
        <div className="flex gap-4 mt-6">
          {user ? (
            <motion.button
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/feed")}
            >
              Go to your feed
            </motion.button>
          ) : (
            <>
              <motion.button
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </motion.button>
              <motion.button
                className="border border-red-500 hover:bg-red-500/20 px-6 py-3 rounded-lg text-lg font-semibold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/login")}
              >
                Login
              </motion.button>
            </>
          )}
        </div>
      </motion.section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-center">
        {FEATURES.map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            <h3 className="text-2xl font-semibold text-red-400">
              {item.title}
            </h3>
            <p className="text-gray-300 mt-2">{item.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
