import React  from 'react';
import {makeStyles, Button, TextField, Grid, Checkbox,FormControlLabel} from '@material-ui/core'
import axios from 'axios'
import { link } from 'fs';
import { Router, Route, Link } from 'react-router-dom';
import history from '../history'
import Mypage from './Mypage';

//안씀

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
//모달 위치
function getModalStyle() {
    const top  = 30;
    const left = 45;

    return {
        top       : `${top}%`,
        left      : `${left}%`,
        transform : `translate(-${top}%, -${left}%)`,
    };
}


export default function Join(){
    const classes             = useStyles();
    const [modalStyle]        = React.useState(getModalStyle);
    const [values, setValues] = React.useState({
        name     : '',
        email    : '',
        pwd      : '',
        grade    : ''
    });
    const [state, setState] = React.useState({
        checkedA: false,
        
      });
    const handleChange = name => event => {
        setValues({ ...values, [name] : event.target.value });
    };
    const handleChangeC = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    //가입버튼 클릭
    const joinBtn = e =>{
        e.preventDefault();
        
        const headers = {
            'Content-Type'  : 'application/json',
            'Authorization' : 'JWT fefege..'
          }
          const data = {
            name     : values.name,
            email    : values.email,
            pwd      : values.pwd,
            grade    : state.checkedA == false?'n':'y'

        }
        // alert("회원가입 버튼 클릭"+data.name);
        // alert(values.name);
        // alert(values.email);
        // alert(values.pwd);
        axios.post(`/member`, JSON.stringify(data),
        {headers : headers})
            .then(res=>{
                alert(`${res.data.result}`);
                window.location.reload();
            })
            .catch(e=>{
                alert('ERROR');
            }) 

    }

    return(
        <Router history={history}>
            <div style = {modalStyle} className = {classes.paper}>
                <h2 id = "modal-title">Join</h2>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        id="outlined-name"
                        label="Name"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange('name')}
                        margin="normal"
                        variant="outlined"
                    />
                    
                    <TextField
                        required
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
                        required
                        id           = "outlined-password-input"
                        label        = "password"
                        className    = {classes.textField}
                        type         = "password"
                        value        = {values.pwd}
                        onChange     = {handleChange('pwd')}
                        autoComplete = "current-password"
                        margin       = "normal"
                        variant      = "outlined"
                    />
                    <div>
                    
                        <Checkbox
                            checked={state.checkedA}
                            onChange={handleChangeC('checkedA')}
                            value="checkedA"
                            inputProps={{
                            'aria-label': 'primary checkbox',
                            }}
                        />관리자로 가입
                    
                    
                
                        
                    </div>
                    
                    <div>
                        <Button variant = "outlined" color = "secondary" className = {classes.button} onClick = {joinBtn}>
                            가입
                        </Button>
                        <Button variant = "outlined" className = {classes.button}>
                            취소
                        </Button>
                    </div>
                </form>
            </div>
            <Route path = "/mypage"  component = {Mypage}/>
          </Router>
    );
}
