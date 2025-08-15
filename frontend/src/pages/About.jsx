import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <main className="text-gray-800">
      <section
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-center"
        style={{
          backgroundImage: `url(${assets.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            About Us, <span className="text-primary">RIO GOLF ACADEMY</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Learn, Practice and Play at the Rio Golf Academy located at Rio
            Pinar Golf, Orlando, Florida!
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">OUR MISSION</h2>
            <p className="mt-4 leading-relaxed text-justify">
              The Rio Golf Academy, located at Rio Pinar Golf in Orlando,
              Florida, is a comprehensive golf training facility catering to
              players of all skill levels from adult and junior beginners to
              competitive adult and juniors; to college players and competitive
              amateurs and PGA/LPGA professionals…and everyone in between.
            </p>
            <p className="mt-4 leading-relaxed text-justify">
              With Rio Golf Academy’s three-dimensional academy approach, we
              have the training facilities built, learning programs designed and
              coaches trained for every golfer’s needs. To determine which one
              of our three academies may best describe and fit your desire to
              learn and improve, please explore all that Rio Golf Academy has to
              offer you!
            </p>
          </div>
          <div className="w-full">
            <img
              src={assets.about7}
              alt="Our mission at Rio Golf Academy"
              className="w-full rounded-lg shadow"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <img
                src={assets.about1}
                alt="Training and coaching environment"
                className="w-full rounded-lg shadow"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold">
                WE HELP YOU TO EXCEED YOUR EXPECTATIONS
              </h2>
              <h3 className="mt-2 text-lg md:text-xl font-semibold">
                What We’re About
              </h3>
              <p className="mt-4 leading-relaxed text-justify">
                At Rio Golf Academy, we empower golf enthusiasts of all skill
                levels to thrive—both on the course and in life. Our unique
                multi-academy approach is designed to ignite a passion for the
                game while instilling core values of discipline, integrity, and
                sportsmanship in every player.
              </p>
              <p className="mt-4 leading-relaxed text-justify">
                With expert coaching, state-of-the-art facilities, cutting-edge
                technology, and a supportive community, we create an environment
                where your desire to learn and grow is met with the tools and
                mentorship to make it happen. Whether you’re just starting out
                or striving for the professional ranks, we’re here to help you
                unlock your potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Our Athletic Commitment to all levels of golfer
            </h2>
            <p className="mt-4 leading-relaxed text-justify">
              At Rio, you’ll be surrounded by world-class coaches and talented
              players from around the globe. Together, they’ll help you stay
              focused on what truly matters — your success on the golf course.
              With the right guidance and environment, you’ll elevate your game
              beyond what you ever thought possible.
            </p>
            <p className="mt-4 leading-relaxed text-justify">
              Rio isn’t just about improving your swing; it’s about transforming
              your future.
            </p>
          </div>
          <div>
            <img
              src={assets.about2}
              alt="Athletic commitment"
              className="w-full rounded-lg shadow"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <img
                src={assets.about3}
                alt="College Golf Connect"
                className="w-full rounded-lg shadow"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold">
                The impact on your junior golf career
              </h2>
              <p className="mt-4 leading-relaxed text-justify">
                College Golf Connect is here to help you secure the golf
                scholarship that best fits you — the student-athlete. In
                partnership with the experienced coaches at Rio Junior Golf
                Academy, we’ve had great success guiding students through the
                often complex world of junior golf and college recruitment.
              </p>
              <p className="mt-4 leading-relaxed text-justify">
                Our team is fully committed to supporting you every step of the
                way on your college golf journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              At Rio Golf Academy, you’ll receive the level of instruction that
              matches your goals.
            </h2>
            <p className="mt-4 leading-relaxed text-justify">
              Our coaches — who also work with PGA and LPGA Tour professionals —
              provide expert guidance in every area of the game, including swing
              mechanics, fitness and nutrition, mental performance, tournament
              play, strategy, and more. You’ll train with purpose, using proven
              methods designed to help you create real impact on the course.
            </p>
            <p className="mt-4 leading-relaxed text-justify">
              With supervised practice and play at any of the Rio Golf Academies
              at Rio Pinar Golf, you’ll enjoy every step of the journey as you
              work toward maximizing your full potential.
            </p>
          </div>
          <div>
            <img
              src={assets.about4}
              alt="Instruction and coaching"
              className="w-full rounded-lg shadow"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <img
                src={assets.about5}
                alt="Junior tours competition"
                className="w-full rounded-lg shadow"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold">
                Compete on Florida’s premier junior tours — and get noticed
              </h2>
              <p className="mt-4 leading-relaxed text-justify">
                At Rio Junior Golf Academy you will compete on two of Florida’s
                premier junior tours — and get noticed by top NCAA college
                coaches. You will also gain the tournament experience you need
                to elevate your game.
              </p>
              <p className="mt-4 leading-relaxed text-justify">
                It’s not just about winning — it’s about growing as both a
                golfer and a person, preparing you for the next level and
                beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Rio High-Performance Academy
            </h2>
            <p className="mt-4 leading-relaxed text-justify">
              We embrace the golfer you’re destined to become, while honoring
              where you are today. We recognize your dedication and passion for
              the game of golf, and we’re committed to giving you the tools you
              need to reach your fullest potential.
            </p>
            <p className="mt-4 leading-relaxed text-justify">
              Our goal is to challenge you — to push you further than you ever
              thought possible. We’ll inspire you to demand more from yourself,
              holding you to the highest standards of performance every step of
              the way.
            </p>
          </div>
          <div>
            <img
              src={assets.about6}
              alt="High performance training"
              className="w-full rounded-lg shadow"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
