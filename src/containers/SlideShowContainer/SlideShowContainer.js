import React,{Component} from 'react';
import axios from '../../sources/axios-posts';
// import axios from 'axios';
import classes from './SlideShowContainer.css';
import Slide from './Slide/Slide';
import Slideshow from 'react-slidez';
// const electron = window.require('electron');
const { rendererPreload } = window.require('electron-routes');

class SlideShowContainer extends Component {
    state = {
        posts: null,
        slides:null,
        loaded: false,
        position: 0,
    }

    componentDidMount() {
        rendererPreload();

        if(!this.state.loaded){

            axios.get("all", { 'crossDomain': true })
            .then(response => {
                console.log(response);
                this.updateSlides(response.data);
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })

        }

    }

    updateSlides = (fetchedPosts) => {

        const posts =  [];
        for(let post in fetchedPosts){

            posts.push(fetchedPosts[post]);
        }

        if(posts){

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