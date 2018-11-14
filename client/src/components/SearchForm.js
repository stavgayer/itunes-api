import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }
  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.fetchResults(this.state.searchTerm);
  };
  render() {
    return (
      <Grid container>
        <Grid item xs={8}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Search here: "
              style={{ margin: 10 }}
              placeholder="Your favorite artist"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.onChangeInput}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}
