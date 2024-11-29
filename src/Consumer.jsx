import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import "./Consumer.css";

const Consumer = () => {
  const [todoList, setTodoList] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchItem, setSearchItem] = useState("");


  useEffect(() => {
    fetch("http://localhost:5172/getproducer")
      .then((res) => res.json())
      .then((data) => setTodoList(data))
      .catch((err) => console.error("Error fetching producers:", err));
  }, []);

  // Filtered todoList based on search
  const filteredTodoList = todoList.filter(
    (item) =>
      item.address.toLowerCase().includes(searchAddress.toLowerCase()) &&
      item.variety.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div>
      <Header />
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
        {filteredTodoList.length > 0 ? (
          <div className="todo-container">
            {filteredTodoList.map((item) => (
              <div key={item._id} style={{ marginBottom: "10px" }} className="items">
                <p>
                  <span>Name:</span> {item.name} <br />
                  <span>Number:</span> {item.number} <br />
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
