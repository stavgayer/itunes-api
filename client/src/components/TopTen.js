import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

export default class TopTen extends Component {
  constructor() {
    super();
    this.state = {
      list: null,
      loading: false,
      error : null
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    console.log('SDASDASDSA')
    fetch("/top-searches")
      .then(res => res.json())
      .then(items => {
        this.setState({ list: items, loading: false });
      })
      .catch(error => this.setState({ error, loading: false }));
  }
  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    if (this.state.error) {
      return <div>Error was occured</div>;
    }
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Top 10 Most Searched Videos
          </Typography>
          <div >
            <List >
              {this.state.list &&
                this.state.list.map((item, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={item.searchTerm} />
                    <ListItemSecondaryAction>
                      {item.counter} Times
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
      </Grid>
    );
  }
}
