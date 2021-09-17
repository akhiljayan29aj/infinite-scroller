import { useEffect, useState } from "react";
import axios from "axios";

const useFetchImages = (count) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: "https://api.unsplash.com/photos/random/",
      params: {
        client_id: "zsH6qSBzsLXVR0o2fpmXSUIRvx6AEGEiDLWifxdnb8Q",
        count: count,
        orientation: "squarish",
      },
    })
      .then((res) => {
        setImages((prevImages) => {
          return [
            ...new Set([
              ...prevImages,
              ...res.data.map((el) => ({
                imgLink: el.urls.small,
                user: el.user.username,
                views: el.views,
                likes: el.likes,
                alt: el.alt_description,
                desc: el.description,
                location: el.location.name,
              })),
            ]),
          ];
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, [count]);
  return { loading, error, images };
};

export default useFetchImages;
