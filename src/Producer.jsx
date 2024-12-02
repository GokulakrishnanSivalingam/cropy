import React, { useState, useEffect } from 'react';
import Header from "./Header.jsx";
import "./Consumer.css";

const Producer = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [variety, setVariety] = useState('');
    const [quantity, setQuantity] = useState('');
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        fetch('https://fertilizer-site-1.onrender.com/getproducer')
            .then((res) => res.json())
            .then((data) => setTodoList(data))
            .catch((err) => console.error('Error fetching producers:', err));
    }, []);

    
    async function handleAddToList() {
        if (!name || !number || !address || !variety) {
            alert('Please fill in all fields!');
            return;
        }

        const newEntry = { name, number, address, variety,quantity };

        try {
            const response = await fetch('https://fertilizer-site-1.onrender.com/producer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            });

            if (response.ok) {
                alert('Entry added successfully!');
                setName('');
                setNumber('');
                setAddress('');
                setVariety('');
                
                fetch('https://fertilizer-site-1.onrender.com/getproducer')
                    .then((res) => res.json())
                    .then((data) => setTodoList(data))
                    .catch((err) => console.error('Error fetching producers:', err));
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
            const response = await fetch(`https://fertilizer-site-1.onrender.com/producer/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Entry deleted successfully!');
                setTodoList((prevList) => prevList.filter((item) => item._id !== id));
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
            <Header />
            <div className="crop-container">
                <div className="add-crop">
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                    /><br />
                    <input
                        type="number"
                        value={number}
                        placeholder="Enter your mobile no"
                        onChange={(e) => setNumber(e.target.value)}
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
                        placeholder="Enter your number of quatity"
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
                {todoList.length > 0 ? (
                    <div className="todo-container">
                        {todoList.map((item) => (
                            <div key={item._id} style={{ marginBottom: '10px' }} className="items">
                                <p>
                                    <span>Name:</span> {item.name} <br />
                                    <span>Number:</span> {item.number} <br />
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
