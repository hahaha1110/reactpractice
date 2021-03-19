import React from 'react';
import { makeStyles, Avatar, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  avatar : {
    margin : 10,
  },
  bigAvatar : {
    margin : 10,
    width  : 80,
    height : 80,
  },
});

export default function ImageAvatars() {
  const classes = useStyles();

  return (
    <Grid container justify = "center" alignItems = "center">
      <Avatar alt = "Remy Sharp" src = "/static/images/avatar/jk.jpg" className = {classes.bigAvatar} />
    </Grid>
  );
}