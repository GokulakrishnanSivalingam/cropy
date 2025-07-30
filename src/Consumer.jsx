import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import "./Consumer.css";
import AboutExpandable from "./AboutExpandable.jsx"; // Import the AboutExpandable component
import { useNavigate } from "react-router-dom";

const loadingQuotes = [
  "⚡ Our server is slow like a tractor on a muddy road... Please be patient!",
  "🕰️ Good things take time. Hang in there!",
  "🚜 Loading crops from the field... please wait!",
  "🐌 Server is working at village speed...",
  "🌾 Harvesting data... stay with us!"
];

const MAX_DESC_LENGTH = 120; // characters to show before "Read more"

const Consumer = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [quote, setQuote] = useState("");
 const [username, setUsername] = useState(localStorage.getItem('username'));  const navigate = useNavigate();

  useEffect(() => {
    setQuote(loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]);
    setLoading(true);
    fetch("http://localhost:5172/getidea")
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
      // Listen for changes to localStorage (e.g., login/logout in other tabs)
      const onStorage = () => setUsername(localStorage.getItem('username'));
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }, []);
  
    // Optional: update username after login/logout in this tab
    useEffect(() => {
      const interval = setInterval(() => {
        const current = localStorage.getItem('username');
        if (current !== username) setUsername(current);
      }, 500);
      return () => clearInterval(interval);
    }, [username]);

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
        <img src={item.imageUrl} alt={item.title} className="idea-image" />
        <div className="idea-content">
          <h2 className="idea-title">{item.title}</h2>
          <p className="idea-description">
            {expanded ? item.description : shortDesc}
            {isLong && (
              <span
                className="read-more"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? " Show less" : " Read more"}
              </span>
            )}
          </p>
          <div className="idea-about">
            <AboutExpandable about={item.about} />
          </div>
        </div>
      
      </div>
    );
  }

  if (!username) {
    return (
      <div className="login-required">
        <Header />
        <div className="login-message">
          <h2>Please login to access this page.</h2>
          <button onClick={() => navigate('/login')}>Go to Login</button>
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
            placeholder="Search by District..."
            value={searchDistrict}
            onChange={(e) => setSearchDistrict(e.target.value)}
          />
        </div>
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
        <h3>Crop Ideas</h3>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>{quote}</p>
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
