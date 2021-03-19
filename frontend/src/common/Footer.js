import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function MadeWithLove() {
    return (
      <Typography variant = "body2" color = "textSecondary" align = "center">
        {'Built with love by the '}
        <Link color = "inherit" href = "https://material-ui.com/">
          Material-UI
        </Link>
        {' team.'}
      </Typography>
    );
  }
  function Hamail() {
    return (
      <Typography variant = "subtitle1" align = "center" color = "textSecondary" component = "p">
          {'고객센터 : '}
        <Link color = "inherit" href = "mailto:gaulbaram111@naver.com">
          gaulbaram111@naver.com
        </Link>
          {'  /  대표 : 하현지'}
      </Typography>
    );
  }
class Footer extends Component{
    render(){
        const classes = makeStyles(theme => ({
            icon : {
              marginRight : theme.spacing(2),
            },
            heroContent : {
              backgroundColor : theme.palette.background.paper,
              padding         : theme.spacing(8, 0, 6),
            },
            heroButtons : {
              marginTop : theme.spacing(4),
            },
            cardGrid : {
              paddingTop    : theme.spacing(8),
              paddingBottom : theme.spacing(8),
            },
            card : {
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
        return(
            <footer className = {classes.footer}>
            <Typography variant = "h6" align = "center" gutterBottom>
                TripMoa
            </Typography>
            <Typography variant = "subtitle1" align = "center" color = "textSecondary" component = "p">
            <Hamail />
            </Typography>
            <MadeWithLove />
        </footer>
        );
    }
}
export default Footer;