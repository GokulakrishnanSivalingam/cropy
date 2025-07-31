import React from "react";
import './About.css';
import Header from "./Header";

const About = () => {
  const username = localStorage.getItem('username');
  return (
    <>
      <div>
        <Header username={username} />
        <div className="about-containers">

          <div className="about-page"><h1>About Us</h1></div>
          <p>
            Welcome to <strong>ConnectSphere</strong> — your digital space to express, engage, and connect. We're a dynamic social media platform designed to empower users to share their stories, discover new perspectives, and build meaningful communities without limitations.
          </p>

          <div className="about-page"><h1>Our Role</h1></div>
          <p>
            At ConnectSphere, we don't just provide a platform — we create possibilities. Whether you're a content creator, an entrepreneur, or someone who simply loves to stay connected, our mission is to help you reach your audience and engage with them authentically.
            We ensure your experience is secure, seamless, and tailored to modern social interaction. From profile creation to post sharing, our team maintains a system that supports your voice, creativity, and privacy.
          </p>

          <div className="about-page"><h1>What We Offer</h1></div>
          <li><u>Creator-Friendly Tools:</u> Whether it's video, photos, reels, or live streaming — share your content in the way that best suits your style.</li>
          <li><u>Interactive Community:</u> Follow, like, comment, or DM — every connection is just a tap away.</li>
          <li><u>Data Privacy & Security:</u> Your content and information are protected with our robust privacy-first infrastructure.</li>
          <li><u>Real-Time Analytics:</u> Understand your reach and growth with detailed engagement insights.</li>

          <div className="about-page"><h1>Our Vision</h1></div>
          <p>
            We envision a world where social media is more than just scrolling — it’s about building communities, fostering creativity, and amplifying individual voices. ConnectSphere is committed to creating a safe, inclusive, and innovative space for self-expression, brand building, and meaningful interaction.
            As we continue to grow, our goal remains clear: to connect people through experiences that inspire and conversations that matter.
          </p>

        </div>
      </div>
    </>
  );
};

export default About;
