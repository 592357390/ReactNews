import React from 'react'
import {Card} from 'antd';
// import {Router,Route,Link,browserHistory} from 'react-router;'
export default class NewsBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        }

    }

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
            + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({
                    news: json
                })
            )
    }

    render() {

        const {news} = this.state;
        const newList = news.length ?
            news.map((newsItem, index) => (
                <li key={index}>
                    {/*<Link to{/de}></Link>*/}
                </li>
            ))
            : "没有加载到任何新闻"
        return (
            <div className="topNewsList">
                <Card>
                    <ul>

                    </ul>

                </Card>
            </div>
        )
    }
}