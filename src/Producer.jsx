import React, { useState, useEffect } from 'react';
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import "./Consumer.css";
import AboutExpandable from "./AboutExpandable.jsx";

const loadingQuotes = [
  "🌱 Sowing your ideas... Please wait!",
  "🚜 Ploughing through the database...",
  "🌾 Harvesting your crop ideas...",
  "🕰️ Good things take time. Hang tight!",
  "⚡ Server is working at farm speed..."
];

const Producer = () => {
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [district, setDistrict] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [about, setAbout] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const fetchIdeas = () => {
    setQuote(loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]);
    setLoading(true);
    fetch(`https://cropy.onrender.com/getideas?name=${encodeURIComponent(username)}`)
      .then(res => res.json())
      .then(data => {
        setIdeas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching ideas:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    if (username) fetchIdeas();
  }, [username]);

  useEffect(() => {
    const onStorage = () => setUsername(localStorage.getItem('username'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = localStorage.getItem('username');
      if (current !== username) setUsername(current);
    }, 500);
    return () => clearInterval(interval);
  }, [username]);

  async function handleAddOrUpdateIdea() {
    if (!username || !imageUrl || !district || !title || !description || !about) {
      alert('Please fill in all fields!');
      return;
    }

    if (uploadingImage) {
      alert("Image is still uploading. Please wait...");
      return;
    }

    const newIdea = { name: username, imageUrl, district, title, description, about };

    try {
      const response = await fetch(
        editId
          ? `https://cropy.onrender.com/idea/${editId}`
          : 'https://cropy.onrender.com/idea',
        {
          method: editId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newIdea),
        }
      );

      if (response.ok) {
        alert(editId ? 'Idea updated successfully!' : 'Idea posted successfully!');
        resetForm();
        fetchIdeas();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to save idea.');
      }
    } catch (err) {
      console.error('Error saving idea:', err);
      alert('Failed to save idea.');
    }
  }

  function resetForm() {
    setImageUrl('');
    setDistrict('');
    setTitle('');
    setDescription('');
    setAbout('');
    setEditId(null);
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`https://cropy.onrender.com/idea/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Idea deleted successfully!');
        fetchIdeas();
      } else {
        alert('Failed to delete idea.');
      }
    } catch (err) {
      console.error('Error deleting idea:', err);
      alert('Failed to delete idea.');
    }
  }

  function handleEdit(item) {
    setEditId(item._id);
    setImageUrl(item.imageUrl);
    setDistrict(item.district);
    setTitle(item.title);
    setDescription(item.description);
    setAbout(item.about);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!username) {
    return (
      <div className="login-required">
        <div className="login-message">
          <h2>Please login to access this page.</h2>
          <button onClick={() => navigate('/login')}>Go to Login</button>
          <button onClick={() => navigate('/')}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header username={username} />
      <div className="crop-container">
        <div className="add-crop">
          <input type="text" value={username} readOnly /><br />

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formData = new FormData();
              formData.append('file', file);
              setUploadingImage(true);

              try {
                const res = await fetch(`https://cropy.onrender.com/upload`, {
                  method: 'POST',
                  body: formData,
                });

                const data = await res.json();
                setImageUrl(data.url);
              } catch (error) {
                console.error('Upload error:', error);
                alert('Image upload failed!');
              } finally {
                setUploadingImage(false);
              }
            }}
          />
          {uploadingImage && <p>Uploading image...</p>}
          <br />

          <input
            type="text"
            value={district}
            placeholder="District"
            onChange={(e) => setDistrict(e.target.value)}
          /><br />

          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          /><br />

          <textarea
            value={description}
            placeholder="Tags and Description"
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            style={{
              minHeight: "120px",
              maxHeight: "50px",
              resize: "vertical",
              width: "100%",
              fontSize: "1.08rem",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }}
          /><br />

          <textarea
            value={about}
            placeholder="About"
            onChange={(e) => setAbout(e.target.value)}
            rows={8}
            style={{
              minHeight: "120px",
              maxHeight: "400px",
              resize: "vertical",
              width: "100%",
              fontSize: "1.08rem",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }}
          /><br />

          <button onClick={handleAddOrUpdateIdea}>
            {editId ? "Update Idea" : "Post Idea"}
          </button>

          {editId && (
            <button
              style={{ marginLeft: "10px", background: "#eee", color: "#333" }}
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="todo-list">
        <h3>All Crop Ideas</h3>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>{quote}</p>
          </div>
        ) : ideas.length > 0 ? (
          <div className="todo-container">
            {ideas.map((item) => (
              <div key={item._id} className="items" style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '10px', padding: '16px', background: '#fafbfc' }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', maxWidth: '320px', borderRadius: '8px', marginBottom: '10px' }} />
                <h4 style={{ margin: '8px 0' }}>{item.title}</h4>
                <p>
                  <b>By:</b> {item.name}<br />
                  <b>District:</b> {item.district}<br />
                  <b>Description:</b> <span style={{ whiteSpace: 'pre-line' }}>{item.description}</span><br />
                  <b>About:</b> <span><AboutExpandable about={item.about} /></span>
                </p>
                <button
                  onClick={() => handleEdit(item)}
                  style={{ marginTop: '5px', color: '#1976d2', marginRight: '10px' }}
                >
                  Update
                </button>
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
          <p>No ideas posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Producer;
