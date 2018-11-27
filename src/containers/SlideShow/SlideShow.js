import React,{Component} from 'react';
import axios from '../../sources/axios-images';
import classes from './SlideShow.css';
import Slide from '../../components/Slideshow/Slide/Slide';


class SlideShow extends Component {
    state = {
        posts: null,
        activeSlide: [],
        loaded: false,
        position: 0
    }

    componentDidMount() {
        if(!this.state.loaded){
            axios.get("/posts/active", { 'crossDomain': true })
            .then(response => {
                console.log("fetched posts");
                this.updatePosts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }

    }

    updatePosts = (fetchedPosts) => {
        const posts =  [];
        for(let post in fetchedPosts){
            posts.push(fetchedPosts[post]);
        }

        if(posts){
            let post = posts[0];

            let activeSlide = (<Slide
                key={post.post_id}
                location={post.location}
                description={post.imageDescription}
                image={post.imageUrl}/>);

            this.setState({posts: posts,loaded: true,activeSlide:activeSlide });
            this.startPlaying();
        }
    };

    nextSlide = () => {
        let position = this.state.position+1;
        let nextPost = this.state.posts[position];
        let nextSilde = (<Slide
                key={nextPost.post_id}
                location={nextPost.location}
                description={nextPost.imageDescription}
                image={nextPost.imageUrl}/>);

        if(position === this.state.posts.length-1) {
            position = 0;
        }

        this.setState({activeSlide: nextSilde,position: position});
    };

    startPlaying = () => {
        setInterval(this.nextSlide,5000);
    };

    render() {

        return(
            <div id="Slideshow" className={classes.SlideShow}>
                {this.state.activeSlide}
            </div>
        );
    }
};

export default SlideShow;