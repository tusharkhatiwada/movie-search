import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Using React Router

// import { Router } from "@reach/router"; //Using Reach Router
import "./App.css";

import MovieLists from "./MoviesList";
import MovieDetails from "./MovieDetails";
import NotFound from "./NotFound";

class App extends Component {
    render() {
        return (
            <Router>
                {/* Configuring Router using React Router */}
                {
                    <Switch>
                        <Route exact path="/" component={MovieLists} />
                        <Route exact path="/details/:id" component={MovieDetails} />
                        <Route component={NotFound} />
                    </Switch>
                }

                {/* Configuring Router using Reach Router */}
                {/*<MovieLists path="/" />
            <MovieDetails path="details/:id" />*/}
            </Router>
        );
    }
}

export default App;
