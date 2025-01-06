// src/Wishlist.js
import React from "react";

const Wishlist = ({ wishlist, removeFromWishlist }) => {
  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.length > 0 ? (
        wishlist.map((card, index) => (
          <div key={index}>
            <img src={card.images.small} alt={card.name} />
            <p>{card.name}</p>
            <p>Set: {card.set.name}</p>
            <p>Price: ${card.cardmarket.prices.trendPrice}</p>
            <button onClick={() => removeFromWishlist(index)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
