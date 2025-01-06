import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // For the search input
  const [data, setData] = useState(null); // For search results
  const [wishlist, setWishlist] = useState([]); // For the wishlist

  // Fetch data from the Flask backend when the user searches
  const handleSearch = () => {
    fetch(`http://127.0.0.1:5000/pokemon-card/${searchQuery}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data); // Set the search results
        console.log(data); // Debug: Log the results
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Add a card to the wishlist
  const addToWishlist = (card) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist, card];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to localStorage
      return updatedWishlist;
    });
  };

  // Remove a card from the wishlist
  const removeFromWishlist = (index) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((_, i) => i !== index);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update localStorage
      return updatedWishlist;
    });
  };

  // Load the wishlist from localStorage when the app starts
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <div>
                <header className="navigation">
                  <Link to="/wishlist">
                    <button>Go to Wishlist</button>
                  </Link>
                </header>
                <h1>Pokemon Card Price Search</h1>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search Pokemon Card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>

                {/* Search Results */}
                <div className="card-grid">
                  {data ? (
                    data.data.map((card, index) => (
                      <div className="card" key={index}>
                        <img src={card.images.small} alt={card.name} />
                        <h3>{card.name}</h3>
                        <p>Set: {card.set.name}</p>
                        <p>Price: ${card.cardmarket.prices.trendPrice}</p>
                        <button onClick={() => addToWishlist(card)}>Add to Wishlist</button>
                      </div>
                    ))
                  ) : (
                    <p>No results!</p>
                  )}
                </div>
              </div>
            }
          />

          {/* Wishlist Page */}
          <Route
            path="/wishlist"
            element={
              <div>
                <header className="navigation">
                  <Link to="/">
                    <button>Back to Home</button>
                  </Link>
                </header>
                <h1>Your Wishlist</h1>
                <div className="card-grid">
                  {wishlist.length > 0 ? (
                    wishlist.map((card, index) => (
                      <div className="card" key={index}>
                        <img src={card.images.small} alt={card.name} />
                        <h3>{card.name}</h3>
                        <p>Set: {card.set.name}</p>
                        <p>Price: ${card.cardmarket.prices.trendPrice}</p>
                        <button onClick={() => removeFromWishlist(index)}>Remove</button>
                      </div>
                    ))
                  ) : (
                    <p>Your wishlist is empty.</p>
                  )}
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
