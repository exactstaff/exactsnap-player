import React,{Component} from 'react';
import classes from './ScrollingFooter.css';
import axios from 'axios';



//eac90b4bd4f6416780cf5183953f0a8c news api key
class ScrollingFooter extends Component {
    state = {
        news: null
    }

    componentDidMount() {
        axios.get("https://newsapi.org/v2/top-headlines?"
        +'country=us&'
        +'category=health&'
        + 'apiKey=eac90b4bd4f6416780cf5183953f0a8c')
        .then(res => {
            let i = 0;
            let news = res.data.articles.map((fetchedNew)=>{
                i++;
                return <div key={i} className={classes.tickerItem}>{fetchedNew.title}</div>
            });

            this.setState({news: news});
        })
    }


    render() {
        return(
        <div className={classes.ScrollingFooter}>
            <div className={classes.ticker}>
                {this.state.news}
            </div>
        </div>);
    }
}

export default ScrollingFooter;