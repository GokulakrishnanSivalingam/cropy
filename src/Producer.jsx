import React, { useState, useEffect } from 'react';
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import "./Producer.css";
import AboutExpandable from "./AboutExpandable.jsx";

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
  placeholder='Upload Image or Video'
  accept="image/*,video/*"
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

      if (data?.url) {
        setImageUrl(data.url);
      } else {
        alert('Upload succeeded, but no URL returned.');
        setImageUrl('');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('File upload failed!');
      setImageUrl('');
    } finally {
      setUploadingImage(false);
    }
  }}
/>          {uploadingImage && <p style={{color:"green" }}>file Uploading ...</p>}
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

          <input
            type="text"
            value={description}
            placeholder="Tags and Description"
            onChange={(e) => setDescription(e.target.value)}
           
            
          /><br />

          <textarea
            value={about}
            placeholder="About"
            onChange={(e) => setAbout(e.target.value)}
            rows={9}
            style={{
              minHeight: "120px",
              maxHeight: "400px",
              
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
              <div key={item._id} className="items-producer" >
                {item.imageUrl?.match(/\.(mp4|webm|ogg)$/i) ? (
  <video
    controls autoPlay 
    src={item.imageUrl}
    className='item-image'
  />
) : (
  <img
    src={item.imageUrl}
    alt={item.title}
    className='item-image'
  />
)}
                <h4 style={{ margin: '8px 0' }}>{item.title}</h4>
                
                <button
                  onClick={() => handleEdit(item)}
                 
                  className='update-button'
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className='delete-button'
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
