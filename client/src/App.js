import React, { Component } from "react";
import SearchContainer from "./components/SearchContainer";
import NavBar from "./components/NavBar";
import FullVideoItem from "./components/FullVideoItem";
import { Route, Redirect } from "react-router-dom";
import TopTen from "./components/TopTen";
import "./App.css";

const initialState = {
  loading: false,
  results: null,
  error: null
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  fetchResults = searchTerm => {
    this.setState({ ...initialState, loading: true });
    let value = searchTerm
      .toLowerCase()
      .trim()
      .split(" ")
      .join("+");

    Promise.all([
      fetch(
        `https://itunes.apple.com/search?term=${value}&entity=musicVideo&limit=25`
      ),
      fetch(`/search`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ searchTerm })
      })
    ])
      .then(values => {
        return values[0].json();
      })
      .then(json => this.setState({ results: json, loading: false }))
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  render() {
    console.log(this.state.results);
    return (
        <div>
          <NavBar />
          <Route
            path="/"
            exact={true}
            component={() => (
              <SearchContainer
                fetchResults={this.fetchResults}
                results={this.state.results}
                loading={this.state.loading}
                error={this.state.error}
              />
            )}
          />
          <Route
            path="/result/:id"
            render={props =>
              this.state.results ? (
                <FullVideoItem {...props} results={this.state.results} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
          <Route exact={true} path="/top-ten" component={TopTen} />
        </div>
    );
  }
}

export default App;
