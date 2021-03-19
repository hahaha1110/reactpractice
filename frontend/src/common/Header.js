import React,{Component}  from 'react';
// import ButtonAppBar from '../components/ButtonAppBar';
import {Grid, makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Modal, FormGroup, FormControlLabel, Switch } from '@material-ui/core'
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
import history from '../history'
import MypageUpdate from '../member/MypageUpdate';
import MemberList from '../member/MemberList';
import axios from 'axios'
import BoardNew from '../board/BoardNew';
import BoardDetail from '../board/BoardDetail';
import BoardUpdate from '../board/BoardUpdate';
import GMapMarker from '../api/GMapMarker';


class Header extends Component{
  state = {
    open : false,
    auth : false
  }
  constructor(props) {
    super(props);
    console.log('constructor'+localStorage.getItem('email'));
    
  }
  componentDidMount() {
    if (localStorage.getItem('email') !== null) {
        this.setState({auth: true})
    }
}
  render(){
    console.log('render');
    const classes = makeStyles(theme => ({
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
    const {open, btnName, auth} = this.state;
    const handleOpen = () => {
      this.setState({
        open : true
      })
    };
    const handleChange=(event)=> {
    this.setState({
      auth : event.target.checked
    })
  }
  const handleClose = () => {
    this.setState({
      open : false
    })
  };
  const boardList = () => {

    }
    const LogOut = () =>{
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      localStorage.removeItem('pwd');
      localStorage.removeItem('name');
      localStorage.removeItem('grade');
      localStorage.removeItem('introduce');
      localStorage.removeItem('fileUrl');
      this.setState({
        auth : false
      })
      history.push('/');
      window.location.reload();    
    }
    const dummyData = () =>{
      const headers = {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      }
      const data = {
        data : 's'
    }
    // alert("회원가입 버튼 클릭"+data.name);
    // alert(values.name);
    // alert(values.email);
    // alert(values.pwd);
    axios.post(`/member/dummyData`, JSON.stringify(data),
    {headers : headers})
        .then(res=>{
            alert(`${res.data.result}`);

        })
        .catch(e=>{
            alert('ERROR');
        }) 
    }
    //게시판더미데이터
    const dummyDataB = () =>{
      const headers = {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      }
      const data = {
        data : 's'
    }
    // alert("회원가입 버튼 클릭"+data.name);
    // alert(values.name);
    // alert(values.email);
    // alert(values.pwd);
    axios.post(`/board/dummyData`, JSON.stringify(data),
    {headers : headers})
        .then(res=>{
            alert(`${res.data.result}`);

        })
        .catch(e=>{
            alert('ERROR');
        }) 
    }
    const responseGoogle = (response) => {
      console.log(response);
    }
    return(
      <Router>   
        <div className = {classes.root}>
            {/* <FormGroup>
              <FormControlLabel
                control = {<Switch checked = {auth} onChange = {handleChange} aria-label = "LoginSwitch" />}
                label   = {auth ? 'Login' : 'Logout'}
              />
            </FormGroup> */}
            <AppBar position = "static" color = "default">
              <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton> */}
                <Typography variant = "h6" className = {classes.title}>
                <Link to = "/">TripMoa</Link>
                </Typography>
                <Grid container justify = "flex-end" alignItems = "flex-end">
                {auth ? 
                  (
                    <div>
                      <Button color = "primary" onClick = {dummyData}>회원 더미데이터 생성</Button>
                      <Button color = "primary" onClick = {dummyDataB}>게시판 더미데이터 생성</Button>
                      <Button color = "inherit">
                      <Link to = "/boardList">Board</Link>
                      </Button>
                      <Button color = "inherit">
                      <Link to = "/mypage">Mypage</Link>
                      </Button>
                      {/* {localStorage.getItem('grade')==='y'&&(<Button color = "inherit">
                      <Link to = "/memberList">멤버리스트</Link>
                      </Button>)} 
                       */}
                      {/* <Button color = "inherit">
                      <Link to = "/exchange">환율</Link>
                      </Button> */}
                      {/* <Button color = "inherit"> */}
                      {/* <Link to = "/gMap">구글맵</Link> */}
                      {/* <Link to = "/gMap2">구글맵</Link> */}
                      {/* </Button> */}
                      <Button color = "inherit" onClick = {LogOut}>LogOut</Button>
                    </div>
                  ):
                  (
                    <div>
                      <Button color = "primary" onClick = {dummyData}>회원 더미데이터 생성</Button>
                      <Button color = "primary" onClick = {dummyDataB}>게시판 더미데이터 생성</Button>
                      {/* <Button>ddd</Button> */}
                      <Login/>
                      
  
                      {/* <Button color = "inherit" onClick = {handleOpen}>Login</Button> */}
                      <Button color = "secondary" onClick = {handleOpen}>Join</Button>
                    </div>
                  )
                }
                </Grid>
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
        <Route path = "/mypageUpdate"  component = {MypageUpdate}/>
        <Route path = "/memberList"  component = {MemberList}/>
        <Route path = "/boardNew"  component = {BoardNew}/>
        <Route path = "/boardDetail"  component = {BoardDetail}/>
        <Route path = "/boardUpdate"  component = {BoardUpdate}/>
        <Route path = "/gMapMarker"  component = {GMapMarker}/>
        </Router>
      // <ButtonAppBar/>
    );
  }
}
export default Header
