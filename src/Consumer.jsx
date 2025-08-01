import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import "./Consumer.css";
import AboutExpandable from "./AboutExpandable.jsx";
import { useNavigate } from "react-router-dom";

const loadingQuotes = [
  "🙏 We're sorry — our backend is taking longer than expected.",
  "😔 Apologies for the delay, things are moving... just a bit slowly.",
  "🛠️ Our servers are working hard to catch up. Thanks for your patience!",
  "⏳ Sorry for the wait — your request is important to us.",
  "🚧 Our system's a bit overwhelmed right now. Hang in there!",
  "📡 We’re experiencing a temporary slowdown. Thank you for staying with us.",
  "😓 Oops, our backend is running a bit late. We really appreciate your patience.",
  "🤝 Sorry about the delay — we’re on it and things will be back to normal shortly.",
  "🔄 Processing... we know it's slow, and we're truly sorry for the inconvenience.",
  "💬 Thank you for bearing with us — smoother experience coming soon!"
];

const MAX_DESC_LENGTH = 120;

const Consumer = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    setQuote(loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]);
    setLoading(true);
    fetch("https://cropy.onrender.com/getidea")
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ideas:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const onStorage = () => setUsername(localStorage.getItem("username"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = localStorage.getItem("username");
      if (current !== username) setUsername(current);
    }, 500);
    return () => clearInterval(interval);
  }, [username]);

  // Slideshow quote animation
  useEffect(() => {
    if (!loading) return;
    let index = 0;
    setQuote(loadingQuotes[index]);

    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        index = (index + 1) % loadingQuotes.length;
        setQuote(loadingQuotes[index]);
        setFadeClass("fade-in");
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [loading]);

  const filteredIdeas = ideas.filter(
    (item) =>
      item.district.toLowerCase().includes(searchDistrict.toLowerCase()) &&
      item.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  function IdeaCard({ item }) {
    const [expanded, setExpanded] = useState(false);

    const isLong = item.description.length > MAX_DESC_LENGTH;
    const shortDesc = isLong
      ? item.description.slice(0, MAX_DESC_LENGTH) + "..."
      : item.description;

    return (
      <div className="idea-container">
        <div className="idea-card">
          <div className="idea-topbar">
            <img
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(item.name)}`}
              alt={item.name}
              className="idea-avatar"
            />
            <div className="idea-author-info">
              <span className="idea-author">{item.name}</span>
              <span className="idea-district">{item.district}</span>
            </div>
          </div>
          {item.imageUrl?.match(/\.(mp4|webm|ogg)$/i) ? (
            <video  
  
  controls src={item.imageUrl} className="idea-image" />
          ) : (
            <img src={item.imageUrl} alt={item.title} className="idea-image" />
          )}
          <div className="idea-content">
            <h2 className="idea-title">{item.title}</h2>
            <p className="idea-description">
              {expanded ? item.description : shortDesc}
              {isLong && (
                <span className="read-more" onClick={() => setExpanded((v) => !v)}>
                  {expanded ? " Show less" : " Read more"}
                </span>
              )}
            </p>
            <div className="idea-about">
              <AboutExpandable about={item.about} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header username={username} />

      <div className="product-input">
        <div className="search-todo">
          <input
            type="search"
            className="search-box"
            placeholder="Search by Title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="todo-list">
        
        {loading ? (
          <div className="loading centered-loading">
            <div className="spinner"></div>
            <p className={`loading-quote ${fadeClass}`}>{quote}</p>
          </div>
        ) : filteredIdeas.length > 0 ? (
          <div className="todo-container">
            {filteredIdeas.map((item) => (
              <IdeaCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p>No ideas found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default Consumer;
