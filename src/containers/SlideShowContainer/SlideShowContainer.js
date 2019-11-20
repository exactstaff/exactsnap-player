import React,{PureComponent} from 'react';
import classes from './SlideShowContainer.css';
import Slide from './Slide/Slide';
import Slideshow from 'react-slidez';
const {ipcRenderer} = window.require('electron');


class SlideShowContainer extends PureComponent {
    state = {
        posts: [],
        loaded: false,
    }

    componentDidMount() {
        ipcRenderer.on('posts-loaded', (event, arg) => {
            this.setState({posts: arg.data.posts, loaded: true});
        });

        ipcRenderer.on('debugger', (event, arg) => {
            console.log(arg);
        });
        ipcRenderer.send('slideshow-mounted');
    }

    generateSlides = (posts) => {
        console.log(posts);
       return posts.map( (post,index)=>{
            return (
                <Slide
                key={post.post_id}
                location={post.location}
                description={post.imageDescription}
                image={post.localImagePath}
                backgroundColors={post.fetchedColors}
                position={index}
                totalSlides={posts.length}
                />
            );
        });
    };

    render() {
        const slidesToRender = this.generateSlides(this.state.posts);

        return(
            (this.state.loaded && this.state.posts.length > 0) &&
            <div id="Slideshow" className={classes.SlideShow}>

                <Slideshow showArrows={false} slideInterval={8000} effect='fade'>
                    {slidesToRender}
                </Slideshow>;

            </div>
        );
    }
};

export default SlideShowContainer;