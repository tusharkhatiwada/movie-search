import React, { Component } from "react";
import axios from "axios";

export default class MovieDetails extends Component {
    state = {
        movie: null,
        isLoading: true
    };
    componentDidMount() {
        const { id } = this.props.match.params; //Accessing id from react router
        // const { id } = this.props; //Accessing id from reach router
        axios
            .get(`http://www.omdbapi.com/?i=${id}&apikey=7fe8103a`)
            .then(response => {
                const res = response.data;
                this.setState({
                    movie: res,
                    isLoading: false
                });
                console.log("Data: ", res);
            })
            .catch(err => {
                console.log("Error getting movie details: ", err.response);
            });
    }
    renderMovie = () => {
        const { movie } = this.state;
        return (
            <div className="card" style={{ width: "20rem" }}>
                <img src={movie.Poster} alt="" className="card-img-top" />
                <div className="card-body">
                    <div className="category">
                        <span className="badge badge-danger">{movie.Type}</span>
                    </div>
                    <h5 className="card-title">{movie.Title}</h5>
                    <h4>Ratings:</h4>
                    <ul className="list-group">
                        {movie.Ratings.map((rating, i) => {
                            return (
                                <li key={i} className="list-group-item">{`${rating.Source}: ${
                                    rating.Value
                                }`}</li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    };
    render() {
        const { movie, isLoading } = this.state;
        return <div>{isLoading ? <h3>Loading....</h3> : movie && this.renderMovie()}</div>;
    }
}
