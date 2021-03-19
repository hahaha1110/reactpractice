import React from 'react';
import {makeStyles, Dialog, Button,TextField} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import axios from 'axios'
import { Router, Route, Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

//   function handleMaxWidthChange(event) {
//     setMaxWidth(event.target.value);
//   }

//   function handleFullWidthChange(event) {
//     setFullWidth(event.target.checked);
//   }
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

    axios.post(`/member/login`,JSON.stringify(data),{headers})
        .then(res => {
            localStorage.setItem('id',`${res.data.id}`);
            localStorage.setItem('email',`${res.data.email}`);
            localStorage.setItem('pwd',`${res.data.pwd}`);
            localStorage.setItem('name',`${res.data.name}`);
            localStorage.setItem('grade',`${res.data.grade}`);
            localStorage.setItem('introduce',res.data.introduce!==null?res.data.introduce:'');
            localStorage.setItem('fileUrl',res.data.fileUrl!==null?res.data.fileUrl:'');
            // alert(localStorage.getItem('id'));
            // console.log(localStorage.getItem('id'));
            // console.log(localStorage.getItem('email'));
            // console.log(localStorage.getItem('pwd'));
            // console.log(localStorage.getItem('name'));
            // console.log(localStorage.getItem('grade'));
            // console.log(localStorage.getItem('introduce'));
            alert(`login 성공 ${res.data.name}`);      
            handleClose();
            window.location.reload();
        })
        .catch(e=>{
            alert(`login 실패`);
        })
}
const dudUrl = '';
  return (
    <React.Fragment>
      <Button color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Login</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
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
                            {/* 아이디가 없으신가요?&nbsp;
                            <Link href = {dudUrl} color = "error" className = {classes.link} variant = "body2">
                            회원가입
                            </Link> */}
                        </div>
            </FormControl>
            {/* <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} value="fullWidth" />
              }
              label="Full width"
            /> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}