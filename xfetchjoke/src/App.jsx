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
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data = await response.json();
      setJoke(data);
    } catch {
      setJoke(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Fetch Joke Application</h1>

        <button
          className="fetch-btn"
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Joke"}
        </button>

        {error && (
          <p className="error">
            Something went wrong. Please try again.
          </p>
        )}

        {joke && (
          <div className="joke">
            <p className="setup">{joke.setup}</p>
            <p className="punchline">{joke.punchline}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
