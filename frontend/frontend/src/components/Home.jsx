import { motion } from "framer-motion";
import { useNavigate, Router } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <motion.h1
          className="text-3xl font-bold text-red-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          100xMatch
        </motion.h1>
        <motion.button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/login")}
        >
          Login
        </motion.button>
      </header>

      <motion.main
        className="flex flex-col items-center text-center mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-extrabold leading-tight mb-4">
          Connecting Developers,{" "}
          <span className="text-red-400">100x Faster!</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl">
          Find your perfect coding partner, mentor, or collaborator
          effortlessly. Swipe, match, and build amazing projects together.
        </p>
        <motion.button
          className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </motion.button>
      </motion.main>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-center">
        {[
          {
            title: "Swipe",
            description:
              "Connect with like-minded developers by swiping through profiles.",
          },
          {
            title: "Match",
            description:
              "Find the best match based on skills, interests, and goals.",
          },
          {
            title: "Collaborate",
            description:
              "Start working on projects, hackathons, or mentorship programs.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, y: [0, -10, 0] }}
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
