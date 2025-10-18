import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-[#0f0a1a] min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen">
        <img
          src="/avatar.png"
          alt="Profile"
          className="w-32 h-32 rounded-full mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-bold">
          I do code and make content{" "}
          <span className="text-purple-400">about it!</span>
        </h1>
        <p className="max-w-2xl mt-4 text-gray-400">
          I am a Full-Stack Software Engineer with over 4 years of experience
          building efficient, scalable web solutions and mentoring developers.
        </p>
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-2 bg-purple-600 rounded-lg font-medium hover:bg-purple-700 transition">
            Get In Touch
          </button>
          <button className="px-6 py-2 border border-purple-500 rounded-lg font-medium hover:bg-purple-700 hover:text-white transition">
            Download CV
          </button>
        </div>
      </section>
    </div>
  );
}
