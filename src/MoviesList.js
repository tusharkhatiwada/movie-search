import React, { Component } from "react";
import { Link } from "react-router-dom"; //Using React Router
// import { Link } from "@reach/router"; //Using Reach Router
import "./App.css";

import axios from "axios";

class MoviesList extends Component {
    state = {
        title: "",
        page: 1,
        movieList: []
    };
    handleMovieTitle = event => {
        this.setState({
            title: event.target.value
        });
    };
    handlePrevious = () => {
        // let page = this.state.page - 1;
        this.setState(state => ({
            page: state.page - 1
        }));
        this.handleMovieSearch();
    };
    handleNext = () => {
        // let page = this.state.page + 1;
        this.setState(state => ({
            page: state.page + 1
        }));
        this.handleMovieSearch();
    };
    handleMovieSearch = event => {
        if (event) {
            event.preventDefault();
        }
        axios({
            url: `http://www.omdbapi.com/?s=${this.state.title}&type=movie&apikey=7fe8103a&page=${
                this.state.page
            }`,
            method: "get"
        })
            .then(response => {
                const res = response.data;
                this.setState({
                    movieList: res.Search
                });
            })
            .catch(err => {
                console.log("Error: ", err.response);
            });
    };
    renderMovies = () => {
        const { movieList } = this.state;

        return movieList.map(movie => {
            return (
                <div key={movie.imdbID} className="card movieItem">
                    <img src={movie.Poster} alt="" className="card-img-top" />
                    <div className="card-body">
                        <div className="category">
                            <span className="badge badge-danger">{movie.Type}</span>
                        </div>
                        {/* Using React Router or Reach Router to send the id dynamically */}
                        <Link to={`/details/${movie.imdbID}`}>
                            <h5 className="card-title">{movie.Title}</h5>
                        </Link>
                    </div>
                </div>
            );
        });
    };
    render() {
        const { title } = this.state;
        return (
            <div className="container">
                <form action="" onSubmit={this.handleMovieSearch} className="form-inline">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            value={title}
                            onChange={this.handleMovieTitle}
                        />
                        <button className="btn btn-primary">Search</button>
                    </div>
                </form>
                <div style={{ margin: 20 }}>
                    <button className="btn btn-secondary" onClick={this.handlePrevious}>
                        Previous
                    </button>
                    <button className="btn btn-secondary" onClick={this.handleNext}>
                        Next
                    </button>
                </div>
                <div className="movies">{this.renderMovies()}</div>
            </div>
        );
    }
}

export default MoviesList;
