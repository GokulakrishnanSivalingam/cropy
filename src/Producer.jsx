import React, { useState, useEffect } from 'react';
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import "./Consumer.css";

const loadingQuotes = [
  "⚡ Our server is slow like a tractor on a muddy road... Please be patient!",
  "🕰️ Good things take time. Hang in there!",
  "🚜 Loading crops from the field... please wait!",
  "🐌 Server is working at village speed...",
  "🌾 Harvesting data... stay with us!"
];

const Producer = () => {
  const [address, setAddress] = useState('');
  const [variety, setVariety] = useState('');
  const [quantity, setQuantity] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  // Fetch only the current user's data
  const fetchUserCrops = () => {
    if (!username) return;
    setQuote(loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]);
    setLoading(true);
    fetch(`http://localhost:5172/getproducer?name=${encodeURIComponent(username)}`)
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching producers:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserCrops();
    // eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    const onStorage = () => {
      setUsername(localStorage.getItem('username'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  async function handleAddToList() {
    if (!address || !variety) {
      alert('Please fill in all fields!');
      return;
    }

    const newEntry = { name: username, address, variety, quantity };

    try {
      const response = await fetch('http://localhost:5172/producer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        alert('Entry added successfully!');
        setAddress('');
        setVariety('');
        setQuantity('');
        fetchUserCrops();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add entry.');
      }
    } catch (err) {
      console.error('Error adding producer:', err);
      alert('Failed to add entry.');
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:5172/producer/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Entry deleted successfully!');
        fetchUserCrops();
      } else {
        alert('Failed to delete entry.');
      }
    } catch (err) {
      console.error('Error deleting producer:', err);
      alert('Failed to delete entry.');
    }
  }

  return (
    <div>
      <Header username={username} />
      <div className="crop-container">
        <div className="add-crop">
          <input
            type="text"
            value={username || ''}
            placeholder="Enter your name"
            readOnly
          /><br />
          <input
            type="text"
            value={address}
            placeholder="Enter your address"
            onChange={(e) => setAddress(e.target.value)}
          /><br />
          <input
            type="number"
            value={quantity}
            placeholder="Enter your number of quantity"
            onChange={(e) => setQuantity(e.target.value)}
          /><br />
          <select
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
          >
            <option value="">Select variety</option>
            <option value="samba">samba</option>
            <option value="karumbu">karumbu</option>
            <option value="nelu">nelu</option>
            <option value="ulundhu">ulundhu</option>
            <option value="ellu">ellu</option>
            <option value="kezangu">kezangu</option>
            <option value="kadalai">kadalai</option>
          </select><br />
          <button onClick={handleAddToList}>Add to List</button>
        </div>
      </div>

      <div className="todo-list">
        <h3>Your Crops</h3>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>{quote}</p>
          </div>
        ) : todoList.length > 0 ? (
          <div className="todo-container">
            {todoList.map((item) => (
              <div key={item._id} style={{ marginBottom: '10px' }} className="items">
                <p>
                  <span>Name:</span> {item.name} <br />
                  <span>Address:</span> {item.address} <br />
                  <span>Variety:</span> {item.variety} <br />
                  <span>Quantity:</span> {item.quantity} <br />
                </p>
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{ marginTop: '5px', color: 'red' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No items in the list yet.</p>
        )}
      </div>
    </div>
  );
};

export default Producer;
