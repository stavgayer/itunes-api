import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

const VideoItem = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src={props.item.artworkUrl100}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {props.item.trackName}
              </Typography>
              <Typography gutterBottom>{props.item.artistName}</Typography>
              <Typography color="textSecondary">
                {props.item.collectionName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ cursor: "pointer" }}>
                
                  <Link to={`/result/${props.item.trackId}`}><Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                > Go to the video </Button></Link>
                
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

VideoItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VideoItem);
