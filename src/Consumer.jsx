import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import "./Consumer.css";

const loadingQuotes = [
  "⚡ Our server is slow like a tractor on a muddy road... Please be patient!",
  "🕰️ Good things take time. Hang in there!",
  "🚜 Loading crops from the field... please wait!",
  "🐌 Server is working at village speed...",
  "🌾 Harvesting data... stay with us!"
];

const Consumer = () => {
  const [todoList, setTodoList] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  useEffect(() => {
    setQuote(loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]);
    setLoading(true);
    fetch("http://localhost:5172/getproducer")
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching producers:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const onStorage = () => setUsername(localStorage.getItem('username'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const filteredTodoList = todoList.filter(
    (item) =>
      item.address.toLowerCase().includes(searchAddress.toLowerCase()) &&
      item.variety.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div>
      <Header username={username} />
      <div className="product-input">
        <div className="search-todo">
          <input
            type="search"
            className="search-box"
            placeholder="Search by Address..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />
        </div>
        <div className="search-todo">
          <input
            type="search"
            className="search-box"
            placeholder="Search by Item Type..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
      </div>

      <div className="todo-list">
        <h3>Crop Variety</h3>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>{quote}</p>
          </div>
        ) : filteredTodoList.length > 0 ? (
          <div className="todo-container">
            {filteredTodoList.map((item) => (
              <div key={item._id} className="items">
                <p>
                  <span>Name:</span> {item.name} <br />
                  <span>Quantity:</span> {item.quantity} <br />
                  <span>Address:</span> {item.address} <br />
                  <span>Variety:</span> {item.variety} <br />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No items found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default Consumer;
