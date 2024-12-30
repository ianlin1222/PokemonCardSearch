import Reac, {useState, useEffect} from 'react'


function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:5000/members")
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
    }, []);
    

  return (
    <div>
      {(typeof data.members === "undefined") ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  )
}

export default App