import React,{Component} from 'react';
import classes from './Jobs.css';
import smallLogo from '../../../../assets/small-logo.jpg';

const {ipcRenderer} = window.require('electron');

class Jobs extends Component {

    state = {
        jobs: []
    };


    componentDidMount(){

        ipcRenderer.on('jobs-loaded', (event, arg) => {
            this.setState({jobs: arg.data.jobs});
        });

        ipcRenderer.send('jobs-mounted');
    }

    render() {
        const JobsToRender = this.state.jobs.map(post => {
            return(
                <div className={classes.Job} key={post.id}>
                    <img src={smallLogo} alt=""/>
                    <div className={classes.content}>
                        <div className={classes.title}>
                            <h4>{post.title}</h4>
                            <em className={classes.location}>{post.location.name}</em>
                        </div>
                        <div className={classes.Description} dangerouslySetInnerHTML={{__html: (post.description.substring(0,200))}}>

                        </div>

                    </div>
                </div>
            );
        });


        return(
        <div className={classes.Jobs}>
            <div className={classes.JobContainer}>
                {JobsToRender}
            </div>
            <div className={classes.sectionTitle}>
                <h4>New Jobs!</h4>
            </div>
        </div>
        );
    }
}

export default Jobs;
