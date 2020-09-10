import React, { PureComponent } from "react";
import classes from "./SlideShowContainer.css";
import Slide from "./Slide/Slide";
import Slideshow from "react-slidez";
import { PlayerContext } from "../../context/PlayerContext";
import axios from "axios";
// import VideoOverlay from "../VideoOverlay/VideoOverlay";
// const { ipcRenderer } = window.require("electron");

const StatusIndicator = (props) => {
  return (
    <div
      className={
        classes.StatusIndicator +
        " " +
        (props.online ? classes.Online : classes.Offline)
      }
    />
  );
};

class SlideShowContainer extends PureComponent {
  state = {
    posts: [],
    loaded: false,
    online: false,
  };

  componentDidMount() {
    window.addEventListener("online", () => this.setState({ online: true }));
    window.addEventListener("offline", () => this.setState({ online: false }));

    axios
      .get("https://stories.exactstaff.com/api/posts/active")
      .then(({ data }) => {
        this.setState({ posts: data, loaded: true, online: true });
      })
      .catch(() => {
        this.setState({ online: true });
      });

    setInterval(() => {
      if (this.state.online) {
        axios
          .get("https://stories.exactstaff.com/api/posts/active")
          .then(({ data }) => {
            const fetchedPostsId = data.map((post) => post.post_id);
            const localPostsId = this.state.posts.map((post) => post.post_id);

            let postsToDownload = fetchedPostsId.filter(
              (remote_post) => !localPostsId.includes(remote_post)
            );
            let postsToRemove = localPostsId.filter(
              (local_post) => !fetchedPostsId.includes(local_post)
            );

            if (postsToDownload.length > 0 || postsToRemove.length > 0) {
              //Fetches and saves all posts if the local database is empty
              this.setState({ posts: data, loaded: true });
            }
          });
      } else {
        console.log("computer is offline");
      }
    }, 5000);
    // ipcRenderer.on("posts-loaded", (event, arg) => {
    //   this.setState({ posts: arg.data.posts, loaded: true });
    // });

    // ipcRenderer.on("debugger", (event, arg) => {
    //   console.log(arg);
    // });
    // ipcRenderer.send("slideshow-mounted");
  }

  generateSlides = (posts) => {
    let slides = posts.map((post, index) => {
      return (
        //
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
          key={post.post_id}
          location={post.location}
          description={post.imageDescription}
          image={`https://res.cloudinary.com/exactstaff/image/fetch/c_fill,w_800,h_900,q_auto:low/${
            post.imageUrl
          }`}
          backgroundColors={[[0, 0, 0, 0.5]]}
          totalSlides={posts.length}
        />
      );
    });
    return slides;
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
          <StatusIndicator online={this.state.online} />
        </div>
      )
    );
  }
}

export default SlideShowContainer;
