import React from 'react';
import {makeStyles,Button,Card,CardActions,CardContent,CardMedia,CssBaseline,Grid,Typography,Container} from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from '../history'
import BoardNew from '../board/BoardNew';
const useStyles = makeStyles(theme => ({
  icon : {
    marginRight : theme.spacing(2),
  },
  heroContent : {
    backgroundColor : theme.palette.background.paper,
    padding : theme.spacing(8, 0, 6),
  },
  heroButtons : {
    marginTop : theme.spacing(4),
  },
  cardGrid : {
    paddingTop    : theme.spacing(8),
    paddingBottom : theme.spacing(8),
  },
  card: {
    height        : '100%',
    display       : 'flex',
    flexDirection : 'column',
  },
  cardMedia : {
    paddingTop : '56.25%', // 16:9
  },
  cardContent : {
    flexGrow : 1,
  },
  footer : {
    backgroundColor : theme.palette.background.paper,
    padding         : theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  // useEffect(() => {
    
  //   console.log('렌더링이 완료되었습니다!');
  //   console.log({
  //     name,
  //     nickname
  //   });
  // });
  const classes = useStyles();
  const boardNewPage = e => {
    e.preventDefault();
    history.push('/boardNew');
    window.location.reload();
  }
  return (
    <React.Fragment>
      <Router> 
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className = {classes.heroContent}>
          <Container maxWidth = "sm">
            
            <Typography component = "h1" variant = "h2" align = "center" color = "textPrimary" gutterBottom>
              Album layout
            </Typography>
            {/* <Typography variant = "h5" align = "center" color = "textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography> */}
          </Container>
         
        </div>
        
        <Button variant = "outlined" color = "secondary" className = {classes.button} onClick = {boardNewPage}>
        새글작성
        </Button>
        
        <Container className = {classes.cardGrid} maxWidth = "md">
          {/* End hero unit */}
          <Grid container spacing = {4}>
            {cards.map(card => (
              <Grid item key = {card} xs = {12} sm = {6} md = {4}>
                <Card className = {classes.card}>
                  <CardMedia
                    className = {classes.cardMedia}
                    image = "https://source.unsplash.com/random"
                    title = "Image title"
                  />
                  <CardContent className = {classes.cardContent}>
                    <Typography gutterBottom variant = "h5" component = "h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size = "small" color = "primary">
                      View
                    </Button>
                    <Button size = "small" color = "primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Route path = "/boardNew"  component = {BoardNew}/>
      </Router>
    </React.Fragment>
  );
}