import React, { useState, useRef, useCallback } from "react";
import "./gallery.scss";

import useFetchImages from "../../hooks/useFetchImages";

import { ReactComponent as View } from "../../assets/view.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as Quote } from "../../assets/quote.svg";
import { ReactComponent as Loader } from "../../assets/loader.svg";

function Gallery() {
  const [count, setCount] = useState(9);
  const { images, error, loading } = useFetchImages(count);
  const observer = useRef();
  const lastImageElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCount(count === 9 ? 10 : 9);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {images.map((el, idx) => {
          if (images.length === idx + 1) {
            return (
              <div className="card" key={idx} ref={lastImageElement}>
                <div className="profile">
                  <img
                    src="https://img.icons8.com/bubbles/50/000000/apple-camera.png"
                    alt="Clicked by"
                  />
                  <span>
                    <span>{el.user}</span>
                    <span>{el.location}</span>
                  </span>
                </div>
                <div className="image">
                  <img src={el.imgLink} alt={el.alt} />
                </div>
                <div className="stats">
                  <span>{el.likes} Likes</span>
                  <span>{el.views} Views</span>
                </div>
                <div className="desc">{el.desc}</div>
              </div>
            );
          } else {
            return (
              <div key={idx} className="card">
                <div className="profile">
                  <img
                    src="https://img.icons8.com/bubbles/50/000000/apple-camera.png"
                    alt="Clicked by"
                  />
                  <span
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <span className="username">{el.user}</span>
                    <span className="location">{el.location}</span>
                  </span>
                </div>
                <div className="image">
                  <img src={el.imgLink} alt={el.alt} />
                </div>
                <div className="stats">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Heart style={{ marginRight: 5 }} /> {el.likes}
                  </span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {el.views} <View style={{ marginLeft: 5 }} />
                  </span>
                </div>
                <div className="desc">
                  <Quote style={{ marginRight: 5 }} />
                  {el.desc
                    ? el.desc.charAt(0).toUpperCase() + el.desc.slice(1)
                    : el.alt
                    ? el.alt.charAt(0).toUpperCase() + el.alt.slice(1)
                    : "No Description"}
                </div>
              </div>
            );
          }
        })}
      </div>
      <div>{loading && <Loader />}</div>
      <div style={{ textAlign: "center" }}>{error && "That's It!"}</div>
    </div>
  );
}

export default Gallery;
