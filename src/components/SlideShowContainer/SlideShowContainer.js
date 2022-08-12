import React, { PureComponent } from "react";
import classes from "./SlideShowContainer.css";
import Slide from "./Slide/Slide";
import Slideshow from "react-slidez";
import { PlayerContext } from "../../context/PlayerContext";
import axios from "axios";

// const { ipcRenderer } = window.require("electron");

class SlideShowContainer extends PureComponent {
  state = {
    posts: [],
    loaded: false,
  };

  async componentDidMount() {
    /* axios
      .get("https://stories.exactstaff.com/api/posts/active")
      .then(({ data }) => {
        this.setState({ posts: data, loaded: true });
      }); */
    let res = await axios.post(`https://exact-admin-api.herokuapp.com/graphql`, {
      query: `
          query {
              posts(take:10)
              {
                  title,
                  caption,
                  location,
                  imagePath,
                  imageUrl
              }
          }`,
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(e => {
      console.log(`Response Error: ${e}`);
    });

    const { status, data: { data: {
      posts
    } }, errors } = res;

    switch (status) {
      case 200:
        this.setState({ posts: posts, loaded: true });
        break;
      default:
        break;
    }
    // ipcRenderer.on("posts-loaded", (event, arg) => {
    //   this.setState({ posts: arg.data.posts, loaded: true });
    // });

    // ipcRenderer.on("debugger", (event, arg) => {
    //   console.log(arg);
    // });
    // ipcRenderer.send("slideshow-mounted");
  }

  generateSlides = (posts) => {
    return posts.map((post, index) => {
      return (
        // <Slide
        //   key={post.post_id}
        //   location={post.location}
        //   description={post.imageDescription}
        //   image={post.image}
        //   backgroundColors={[0, 0, 0, 0.5]}
        //   position={index}
        //   totalSlides={posts.length}
        // />
        <Slide
          key={post.imagePath}
          location={post.location}
          description={post.caption}
          image={`data:image/png;base64,${post.imageUrl}`}
          backgroundColors={[[0, 0, 0, 0.5]]}
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
