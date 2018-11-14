import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TopTenLink from './TopTenLink'
export default class FullVideoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
  }
  componentDidMount() {
    if (this.props.results) {
      let item = this.props.results.results.find(el => {
        console.log(el.trackId, this.props.match.params.id);
        return el.trackId === parseInt(this.props.match.params.id);
      });
      this.setState({ result: item });
    }
  }
  render() {
    if (!this.props.results) {
      return <div>Error</div>;
    }
    if (!this.state.result) {
      return <div>No Details</div>;
    }
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <iframe
              src={this.state.result.previewUrl}
              style={{
                width: "50vw",
                height: "calc(50vw/1.77777778)"
              }}
              title={this.state.result.trackName}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              {this.state.result.trackName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Track by : {this.state.result.artistName} , (Genre : {this.state.result.primaryGenreName} , Relese date : {this.state.result.releaseDate})
            </Typography>
          </Grid>
        </Grid>
        <TopTenLink/>
      </div>
    );
  }
}
