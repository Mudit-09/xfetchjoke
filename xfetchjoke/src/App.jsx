import { useState } from "react";
import "./App.css";

const API_URL = "https://official-joke-api.appspot.com/random_joke";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setJoke(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Random Joke</h1>
        <p className="subtitle">Click the button to fetch a fresh one.</p>

        <button className="fetch-btn" onClick={fetchJoke} disabled={loading}>
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

        {error ? (
          <div>
            <p className="error">Could not fetch a joke. Try again.</p>
            <button className="link-btn" onClick={fetchJoke} disabled={loading}>
              Try again
            </button>
          </div>
        ) : joke ? (
          <div>
            <p className="setup">{joke.setup}</p>
            <p className="punchline">
              <strong>{joke.punchline}</strong>
            </p>
          </div>
        ) : (
          <p className="empty">No joke yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;