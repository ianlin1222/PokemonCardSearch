import React, { useState } from "react";

function SearchPage({ wishlist, setWishlist }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = () => {
    fetch(`http://127.0.0.1:5000/pokemon-card/${searchQuery}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const addToWishlist = (card) => {
    setWishlist((prevWishlist) => [...prevWishlist, card]);
  };

  return (
    <div>
      <h1>Pokemon Card Price Search</h1>
      <input
        type="text"
        placeholder="Search Pokemon Card"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Search Results</h2>
        {data ? (
          data.data.map((card, index) => (
            <div key={index}>
              <img src={card.images.small} alt={card.name} />
              <p>{card.name}</p>
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
  );
}

export default SearchPage;
