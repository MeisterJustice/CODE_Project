import DztImageGalleryComponent from "reactjs-image-gallery";
import Box from "@material-ui/core/Box";
import { useEffect, useState } from "react";

const data = [];
const Gallery = (props) => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    for (var i = 0; i < props.photos.length; i++) {
      data.push({
        title: props.photos[i].title,
        url: props.photos[i].photo,
        thumbUrl: props.photos[i].photo,
      });
    }
    setDone(true);
  }, []);
  return (
    <Box id="gallery" mb={10}>
      <Box pt={10} pb={5} className="title" textAlign="center">
        Photo Gallery
      </Box>
      {done && <DztImageGalleryComponent images={data} />}
    </Box>
  );
};

export default Gallery;
