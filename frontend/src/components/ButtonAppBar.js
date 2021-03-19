import React  from 'react';
import {makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Modal, FormGroup, FormControlLabel, Switch } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import MenuIcon from '@material-ui/icons/Menu';
import Login from '../member/Login';
import Join from '../member/Join';
// import JoinFom from '../components/JoinForm';
import Mypage from '../member/Mypage';
import BoardList from '../board/BoardList';
import Home from '../common/Home';
import Exchange from '../api/Exchange'
import GMap from '../api/GMap'
import GMap2 from '../api/GMap2'
const useStyles = makeStyles(theme => ({
    root : {
      flexGrow: 1,
    },
    menuButton : {
      marginRight : theme.spacing(2),
    },
    title : {
      flexGrow: 1,
    },
    
}));

export default function ButtonAppBar(){
    // localStorage.getItem('email') !== ''  ? alert('login 성공'+localStorage.getItem('name')) : ''
  // console.log("버튼앱바  "+localStorage.getItem('email'));
    
    const classes = useStyles();
    //로그인모달
    const [open, setOpen]    = React.useState(false);
    const [btnName, setName] = React.useState('Login');
    //권한
    const [auth, setAuth] = React.useState(false);
    const handleOpen = (e) => {
        // 이름세팅(로그인인지 회원가입인지)
        setName(e.target.innerHTML);
        console.log(btnName)
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(event) {
      setAuth(event.target.checked);
    }

    const boardList = () => {

    }

    return (
    <Router>   
    <div className = {classes.root}>
        <FormGroup>
          <FormControlLabel
            control = {<Switch checked = {auth} onChange = {handleChange} aria-label = "LoginSwitch" />}
            label   = {auth ? 'Login' : 'Logout'}
          />
        </FormGroup>
        <AppBar position = "static" color = "default">
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant = "h6" className = {classes.title}>
            <Link to = "/">Trip Moa</Link>
            </Typography>
            {auth ? 
              (
                <div>
                  <Button color = "inherit" onClick = {boardList}>
                  <Link to = "/boardList">Board</Link>
                  </Button>
                  <Button color = "inherit">
                  <Link to = "/mypage">Mypage</Link>
                  </Button>
                  <Button color = "inherit">
                  <Link to = "/exchange">환율</Link>
                  </Button>
                  <Button color = "inherit">
                  {/* <Link to = "/gMap">구글맵</Link> */}
                  <Link to = "/gMap2">구글맵</Link>
                  </Button>
                </div>
              ):
              (
                <div>
                  {/* <Button>ddd</Button> */}
                  <Login/>
                  {/* <Button color = "inherit" onClick = {handleOpen}>Login</Button> */}
                  <Button color = "secondary" onClick = {handleOpen}>Join</Button>
                </div>
              )
            }
            
          </Toolbar>
        </AppBar>
        {/* 모달 */}
        <Modal
          aria-labelledby  = "simple-modal-title"
          aria-describedby = "simple-modal-description"
          open    = {open}
          onClose = {handleClose}>  
          {btnName === 'Login' ? <Login/> : <Join/>}
        </Modal>
     </div>
     <Route path = "/mypage"  component = {Mypage}/>
     <Route path = "/boardList"  component = {BoardList}/>
     <Route exact path="/" component={Home} />
     <Route path = "/exchange"  component = {Exchange}/>
     {/* <Route path = "/gMap"  component = {GMap}/> */}
     <Route path = "/gMap2"  component = {GMap2}/>
     </Router>
    );
}
