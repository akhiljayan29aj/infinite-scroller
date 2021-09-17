import React from "react";
import "./App.scss";

import Gallery from "./components/gallery/gallery";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Infinite Scrolling Project</h1>
      <div className="details">
        <h3>Project Details</h3>
        <ul>
          <li>Made with ReactJS</li>
          <li>
            Design is RESPONSIVE and includes INFINITE SCROLL using Intersection
            Observer.
          </li>
          <li>
            Images are fetched using{" "}
            <a
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              href="https://unsplash.com/documentation"
            >
              Unsplash API.
            </a>
          </li>
        </ul>
      </div>

      <a className="git" href="https://github.com/akhiljayan29aj">
        Designed by Akhil Jayan
      </a>

      <Gallery />
    </div>
  );
}

export default App;
