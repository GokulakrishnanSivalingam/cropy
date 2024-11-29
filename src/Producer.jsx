import React, { useState } from 'react';
import Header from "./Header.jsx";
import "./Producer.css";

const Producer = () => {
    const [names, setName] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAdd] = useState('');
    const [variety, setVar] = useState('');
    const [todoList, setTodoList] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:4000/producer')
            .then((res) => res.json())
            .then((data) => setTodoList(data))
            .catch((err) => console.error(err));
    }, []);
    async function  handleAddToList() {
        
        if (!names || !number || !address || !variety) {
            alert('Please fill in all fields!');
            return;
        }

        
        setTodoList((prevList) => [
            ...prevList,
            { id: Date.now(), names, number, address, variety }
        ]);

        
        setName('');
        setNumber('');
        setAdd('');
        setVar('');
        const newEntry = { names, number, address, variety };
        try {
            const response = await fetch('http://localhost:4000/producer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            });

            if (response.ok) {
                const savedEntry = await response.json();
                setTodoList((prevList) => [...prevList, newEntry]); 
                setName('');
                setNumber('');
                setAdd('');
                setVar('');
                alert('Entry added successfully!');
            } else {
                alert('Failed to add entry.');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to add entry.');
        }
    
    };

    return (
        <div>
            <Header />
            <div className="crop-container">
                <div className="add-crop">
                    <input
                        type="text"
                        value={names}
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
                        onChange={(e) => setAdd(e.target.value)}
                    /><br />
                    <select
                        value={variety}
                        onChange={(e) => setVar(e.target.value)}
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
                <h3>your crops</h3>
                {todoList.length > 0 ? (
                    
                    <ul>
                        <div className="todo-container">
                        {todoList.map((item) => (
                            <p key={item.id} style={{ marginBottom: '10px' }} className='items'>
                                <span>Name:</span> {item.names} <br />
                                <span>Number:</span> {item.number} <br />
                                <span>Address:</span> {item.address} <br />
                                <span>Variety:</span> {item.variety} <br />
                            </p>
                        ))}
                  </div>  </ul>
                ) : (
                    <p>No items in the list yet.</p>
                )}
            </div>
        </div>
    );
};

export default Producer;
