import React,{PureComponent} from 'react';
import axios from '../../sources/axios-posts';
// import axios from 'axios';
import classes from './SlideShowContainer.css';
import Slide from './Slide/Slide';
import Slideshow from 'react-slidez';
// const electron = window.require('electron');
const {ipcRenderer} = window.require('electron');
const { rendererPreload } = window.require('electron-routes');

class SlideShowContainer extends PureComponent {
    state = {
        posts: null,
        slides:null,
        loaded: false,
        position: 0,
    }

    componentDidMount() {
        rendererPreload();
        ipcRenderer.on('posts-loaded', (event, arg) => {
            this.loadSlides();
            console.log("post loaded");
         });

        ipcRenderer.on('posts-changed', (event, arg) => {
           this.loadSlides();
           console.log("posts changed");
        //    console.log(arg);
        });

        ipcRenderer.on('nothing-changed', (event, arg) => {
            // this.loadSlides();
            console.log(event, arg);
         //    console.log(arg);
         });

        // this.loadSlides();
    }

    loadSlides = () => {
        console.log("called loadSlides");
        axios.get("all", { 'crossDomain': true })
        .then(response => {
            this.updateSlides(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    updateSlides = (fetchedPosts) => {

        const posts =  [];
        for(let post in fetchedPosts){

            posts.push(fetchedPosts[post]);
        }

        if(posts.length > 0){
            let slides = posts.map( (post,index)=>{

                return (
                    <Slide
                    key={post.post_id}
                    location={post.location}
                    description={post.imageDescription}
                    image={post.imageName}
                    backgroundColors={post.fetchedColors}
                    position={index}
                    totalSlides={posts.length}
                    />
                );
            });

            this.setState({posts: posts,loaded: true,slides: slides });
        }
    };



    render() {

        return(
            (this.state.loaded) &&
            <div id="Slideshow" className={classes.SlideShow}>

                <Slideshow showArrows={false} slideInterval={8000} effect='fade'>
                    {this.state.slides}
                </Slideshow>;

            </div>
        );
    }
};

export default SlideShowContainer;