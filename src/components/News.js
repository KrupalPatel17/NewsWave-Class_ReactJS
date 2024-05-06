import React, { Component } from 'react'
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import './News.css';
// import Spinner from './Spinner';
import { Loaders } from './Loaders';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',

    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizedLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loding: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizedLetter(this.props.category)} - NewsWave`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loding: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loding: false,
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5a2acbbf45647a3a75d2dc1051a4fdd&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loding: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,
        //     loding: false })

        this.updateNews();
    }

    handlePreviousClick = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5a2acbbf45647a3a75d2dc1051a4fdd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loding: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loding: false
        // })

        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5a2acbbf45647a3a75d2dc1051a4fdd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loding: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //          loding: false
        //     })
        // }

        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a5a2acbbf45647a3a75d2dc1051a4fdd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page: this.state.page + 1});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    };


    render() {
        return (
            <>
                <h1 className="text-center mt-5 pt-5" style={{ color: this.props.mode === 'light' ? 'black' : 'white', fontFamily: "serif" }}><i><b>News Wave - Top {this.capitalizedLetter(this.props.category)} Headlines</b></i></h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loaders />}
                >

                    <div className="container">

                        <div className="row">

                            {this.state.loding && <Loaders/>}
                            {/* {!this.state.loding && this.state.articles.map((element) => { */}
                            
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 " key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 60) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} mode={this.props.mode} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>


                {/* <div className="container d-flex justify-content-between">

                        <button disabled={this.state.page <= 1} type="button" className={`btn  btnx btn-${this.props.mode === 'light' ? 'secondary' : 'dark'}`} onClick={this.handlePreviousClick}> &#8592; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className={`btn  btnx btn-${this.props.mode === 'light' ? 'secondary' : 'dark'}`} onClick={this.handleNextClick}>Next &rarr;</button>

                    </div> */}

            </>

        )
    }
}

export default News
