import React,{Component} from 'react';
import axios from '../../sources/axios-images';
import classes from './SlideShowContainer.css';
import Slide from './Slide/Slide';
import Slideshow from 'react-slidez';

class SlideShowContainer extends Component {
    state = {
        posts: null,
        slides:null,
        loaded: false,
        position: 0,
    }

    componentDidMount() {
        if(!this.state.loaded){
            axios.get("/", { 'crossDomain': true })
            .then(response => {
                this.updateSlides(response.data.rows);

            })
            .catch(error => {
                console.log(error);
            })
        }

    }

    updateSlides = (fetchedPosts) => {
        const posts =  [];
        for(let post in fetchedPosts){

            posts.push(fetchedPosts[post].doc);
        }

        if(posts){

            let slides = posts.map((post,index)=>{

                return (
                    <Slide
                    key={post.post_id}
                    location={post.location}
                    description={post.imageDescription}
                    image={post.imageUrl}
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