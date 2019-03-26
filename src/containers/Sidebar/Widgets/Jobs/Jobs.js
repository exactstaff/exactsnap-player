import React,{Component} from 'react';
import classes from './Jobs.css';
import axios from 'axios';
import smallLogo from '../../../../assets/small-logo.jpg';

class Jobs extends Component {

    state = {
        jobs: []
    };


    componentDidMount(){
        this.refreshJobs();

        setInterval(this.refreshJobs,7200000)
    }

    refreshJobs = () => {
        let jobs = [];
        let fetchedPosts;
        axios.get("https://jobs.exactstaff.com/wp-json/wp/v2/job_listing?per_page=100").then((data)=>{
            fetchedPosts = data.data;
            console.log(data);
            console.log("================================================================================");

            jobs = fetchedPosts.map(post => {
                return(
                    <div className={classes.Job} key={post.id}>
                        <img src={smallLogo} alt=""/>
                        <div className={classes.content}>
                            <div className={classes.title}>
                                <h4>{post.title.rendered}</h4>
                                <em className={classes.location}>{post.geolocation_city + ", " + post.geolocation_state_short}</em>

                            </div>
                            <div className={classes.Description} dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}>

                            </div>

                        </div>
                    </div>
                );
            });
            this.setState({jobs: jobs});
        }).catch(err => {
            console.log("error");
        })


    }

    render() {
        return(
        <div className={classes.Jobs}>
            <div className={classes.JobContainer}>
                {this.state.jobs}
            </div>
            <div className={classes.sectionTitle}>
                <h4>New Jobs!</h4>
            </div>
        </div>
        );
    }
}

export default Jobs;
