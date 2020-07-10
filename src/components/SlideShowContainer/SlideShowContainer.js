import React, { PureComponent } from "react";
import classes from "./SlideShowContainer.css";
import Slide from "./Slide/Slide";
import Slideshow from "react-slidez";
import { PlayerContext } from "../../context/PlayerContext";

const { ipcRenderer } = window.require("electron");

class SlideShowContainer extends PureComponent {
  state = {
    posts: [],
    loaded: false,
  };

  componentDidMount() {
    ipcRenderer.on("posts-loaded", (event, arg) => {
      this.setState({ posts: arg.data.posts, loaded: true });
    });

    ipcRenderer.on("debugger", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.send("slideshow-mounted");
  }

  generateSlides = (posts) => {
    return posts.map((post, index) => {
      return (
        <Slide
          key={post.post_id}
          location={post.location}
          description={post.imageDescription}
          image={post.image}
          backgroundColors={post.fetchedColors}
          position={index}
          totalSlides={posts.length}
        />
      );
    });
  };

  render() {
    const slidesToRender = this.generateSlides(this.state.posts);
    return (
      this.state.loaded &&
      this.state.posts.length > 0 && (
        <div id="Slideshow" className={classes.SlideShow}>
          <PlayerContext.Consumer>
            {(context) => {
              return (
                <Slideshow
                  showArrows={false}
                  slideInterval={8000}
                  effect="fade"
                  autoplay={!context[0].paused}
                >
                  {slidesToRender}
                </Slideshow>
              );
            }}
          </PlayerContext.Consumer>
          ;
        </div>
      )
    );
  }
}

export default SlideShowContainer;
