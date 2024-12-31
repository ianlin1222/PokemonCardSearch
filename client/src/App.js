import React, { useState, useEffect } from "react";

function App() {
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
                {data ? (
                    data.data.map((card, index) => (
                        <div key={index}>
                            <img src={card.images.small} alt={card.name} />
                            <p>{card.name}</p>
                            <p>Set: {card.set.name}</p>
                            <p>Price: ${card.cardmarket.prices.trendPrice || "N/A"}</p>
                        </div>
                    ))
                ) : (
                    <p>No results</p>
                )}
            </div>
        </div>
    );
}

export default App;
