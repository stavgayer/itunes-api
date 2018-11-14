import React from "react";
import VideoItem from "./VideoItem/VideoItem";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchForm from "./SearchForm";
import TopTenLink from './TopTenLink'
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

const SearchContainer = props => {
  return (
    <Grid container spacing={24}>
      {props.loading && <div>loading...</div>}
      {props.error && <div>{props.error}</div>}
      <Grid item xs={12}>
        <SearchForm fetchResults={props.fetchResults} />
      </Grid>

      {props.results &&
        props.results.results.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.trackId}>
            <VideoItem item={item} />
          </Grid>
        ))}
        <TopTenLink />
    </Grid>
  );
};
SearchContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchContainer);
