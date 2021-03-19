import React  from 'react';
import {makeStyles, Button, TextField} from '@material-ui/core'
import axios from 'axios'
import { Router, Route, Link } from 'react-router-dom';
import history from '../history';
import Mypage from '../member/Mypage';

const useStyles = makeStyles(theme => ({
    //모달
    paper : {
        position        : 'absolute',
        width           : 400,
        backgroundColor : theme.palette.background.paper,
        border          : '2px solid #000',
        boxShadow       : theme.shadows[5],
        padding         : theme.spacing(2, 4, 4),
        outline         : 'none',
    },
    //input
    container : {
        display  : 'flex',
        flexWrap : 'wrap',
      },
      textField : {
        marginLeft  : theme.spacing(1),
        marginRight : theme.spacing(1),
        width       : "80%",
      },
      dense : {
        marginTop : theme.spacing(2),
      },
      menu : {
        width : 200,
      },
      //button
      button : {
        margin : theme.spacing(1),
      },
      input : {
        display : 'none',
      },
}));
//모달

function getModalStyle() {
    const top  = 30;
    const left = 45; 
    return {
        top       : `${top}%`,
        left      : `${left}%`,
        transform : `translate(-${top}%, -${left}%)`,
    };
}
export default function Login(){
    const classes             = useStyles();
    const [modalStyle]        = React.useState(getModalStyle);
    const [values, setValues] = React.useState({
        email : '',
        pwd   : '',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name] : event.target.value });
    };

    //로그인 버튼 클릭시
    const login = e => {
        e.preventDefault();
        // alert('로그인'+values.email);
        const headers = {
            'Content-Type'  : 'application/json',
            'Authorization' : 'JWT fefege..'
          }
          const data = {
            email    : values.email,
            pwd      : values.pwd        
        }

        axios.post(`http://localhost:9000/member/login`,JSON.stringify(data),{headers})
            .then(res => {
                
                localStorage.setItem('email',`${res.data.email}`);
                localStorage.setItem('pwd',`${res.data.pwd}`);
                localStorage.setItem('name',`${res.data.name}`);
                localStorage.setItem('grade',`${res.data.grade}`);
                
                console.log(localStorage.getItem('email'));
                console.log(localStorage.getItem('pwd'));
                console.log(localStorage.getItem('name'));
                console.log(localStorage.getItem('grade'));
                // window.location.reload();
                alert(`login 성공 ${res.data.name}`);                
            })
            .catch(e=>{
                alert(`login 실패`);
            })
    }
    // This resolves to nothing and doesn't affect browser history
    const dudUrl = '';
    return(
        
            <Router history={history}>
                <div style = {modalStyle} className = {classes.paper}>
                    <h2 id = "modal-title">Login</h2>
                    <form>
                        <TextField
                            id           = "outlined-email-input"
                            label        = "Email"
                            className    = {classes.textField}
                            type         = "email"
                            name         = "email"
                            value        = {values.email}
                            onChange     = {handleChange('email')}
                            autoComplete = "email"
                            margin       = "normal"
                            variant      = "outlined"
                        />
                        <TextField
                            id           = "outlined-password-input"
                            label        = "Password"
                            className    = {classes.textField}
                            type         = "password"
                            value        = {values.pwd}
                            onChange     = {handleChange('pwd')}
                            autoComplete = "current-password"
                            margin       = "normal"
                            variant      = "outlined"
                        />
                        <div>
                            <Button variant = "outlined" color = "secondary" className = {classes.button} onClick = {login}>
                                로그인
                            </Button>
                            아이디가 없으신가요?&nbsp;
                            <Link href = {dudUrl} color = "error" className = {classes.link} variant = "body2">
                            회원가입
                            </Link>
                        </div>
                    </form>
                </div>
                <Route path="/mypage" component={Mypage} />
            </Router>
        
    );
}
