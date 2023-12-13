import { container, imagesStyles } from "../css-kit-react";


const carouselStyle = {
  ...imagesStyles,
  homeCarousel: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 10,
  },
  section: {
    padding: "70px 0"
  },
  container,
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important"
  }
};

export default carouselStyle;
