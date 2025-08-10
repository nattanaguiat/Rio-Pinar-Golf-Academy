import React from "react";

const Welcome = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-8 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary">
        Welcome to Rio Golf Academy – Orlando, Florida
      </h1>

      <p className="text-base md:text-lg leading-relaxed">
        At Rio Golf Academy, we offer a multi-dimensional approach to golf instruction, combining cutting-edge technology, elite coaching, and a supportive environment tailored to each golfer’s individual journey. With three specialized academies under one roof, we’re committed to guiding players of all levels—from beginners to aspiring professionals—toward their goals, both on and off the course.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Rio Junior Golf Academy</h2>
        <h3 className="text-lg font-medium italic mb-2">Director of Instruction: Peter Bakker</h3>
        <p className="leading-relaxed text-base md:text-lg">
          Led by Peter Bakker, our high-performance junior program is designed for Junior and Post-Graduate students from around the world. As a residential, part-time, and full-time golf development program, students receive elite training in every facet of the game, paired with academic support and a pathway to college scholarships or professional golf careers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Rio Golf Academy “Learn, Practice, Play”</h2>
        <h3 className="text-lg font-medium italic mb-2">Director of Instruction: Mike Byrnes</h3>
        <p className="leading-relaxed text-base md:text-lg">
          Led by Mike Byrnes, this academy and programming is perfect for beginner and intermediate juniors and adults, as we focus on a our “Learn, Practice, Play” philosophy. Through personalized private instruction or group lessons, clinics, and camps, every student can progress at their own pace in a safe, welcoming and motivating environment. Whether you’re picking up a club for the first time or returning to the game, this is your gateway to growth.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Rio High-Performance Golf Academy</h2>
        <h3 className="text-lg font-medium italic mb-2">Director of Instruction: Gregor Tilch</h3>
        <p className="leading-relaxed text-base md:text-lg">
          Led by Gregor Tilch, owner of Rio Pinar Golf and a coach with experience mentoring PGA and LPGA Tour players, national teams, and elite collegiate athletes. This academy is built for advanced players striving for excellence and ready to train at the highest level. If your goal is to compete at the top of the game, this is where it starts.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Our Team</h2>
        <p className="leading-relaxed text-base md:text-lg">
          Our world-class instructional staff is anchored by Gregor Tilch and features PGA-certified instructors Tom Jackson, Peter Bakker, and Mike Byrnes. Together, they bring a wealth of experience and a shared passion for developing golfers of all levels into confident, successful athletes—on the course and in life.
        </p>
      </section>
    </div>
  );
};

export default Welcome;
