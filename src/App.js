import React from 'react';
import './App.css';
import List from './List.js';
import Header from "./Header.js";
import Footer from "./Footer.js";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            currentStart: 0,
            currentCount: 20,
            intervalId: 0
        };
    }

    componentDidMount() {
        this.fetchStories();
        this.intervalId = setInterval(() => this.fetchStories(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    fetchStories (start = 0, count = 0) {
        const url = 'https://hacker-news.firebaseio.com/v0/item/';

        if(start !== count) {
            this.setState({
                error: null,
                isLoaded: false,
                items: [],
                currentStart: start,
                currentCount: count
            });
            const ids = this.state.ids.slice(start, count);
            for (const id of ids) {
                const idUrl = url + id + '.json';
                this.fetchStory(idUrl);
            }
        } else {
            if(this.state.isLoaded) {
                this.setState({
                    error: null,
                    isLoaded: false,
                    ids: [],
                    items: [],
                });
            }
            fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
                .then(response => response.json())
                .then((response) => {
                        this.setState({ ids: response });
                        const ids = response.slice(this.state.currentStart, this.state.currentCount);
                        ids.map(id => {
                            const idUrl = url + id + '.json'
                            this.fetchStory(idUrl)
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    });
        }
    }

    fetchStory(url) {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({ items: [...this.state.items, result] });
                    if(this.state.items.length === 20) {
                        this.setState({ isLoaded: true });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }

    render() {
        return (
            <div>
                <Header fetch={this.fetchStories.bind(this, 0, 0)} />
                <List
                    error={this.state.error}
                    isLoaded={this.state.isLoaded}
                    items={this.state.items}
                    start={this.state.currentStart + 1}
                />
                <Footer
                    isLoaded={this.state.isLoaded}
                    start={this.state.currentStart}
                    prev={this.fetchStories.bind(this, this.state.currentStart - 20, this.state.currentCount - 20)}
                    more={this.fetchStories.bind(this, this.state.currentStart + 20, this.state.currentCount + 20)}
                />
            </div>
        );
    }
}
