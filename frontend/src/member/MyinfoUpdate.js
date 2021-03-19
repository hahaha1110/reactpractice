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
    color : 'red'
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },

}));

export default function MyubfoUpdate(props) {
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
    newpwd   : '',
    newpwdCk   : '',
  });

const handleChange = name => event => {
    setValues({ ...values, [name] : event.target.value });
};


//비밀번호 변경 클릭시
const pwmodi = e => {
    e.preventDefault();
    // alert('로그인'+values.email);
    const headers = {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      }
      const data = {
        email     : localStorage.getItem('email'),
        name      : localStorage.getItem('name'),
        introduce : localStorage.getItem('introduce'),
        pwd       : values.newpwd        
    }
    //비밀번호 일치, 바꿀비번 확인 일치해야 실행
    if(values.newpwd ==''){
        alert('변경할 비밀번호를 입력해주세요.');
        return false;
    }
    if((localStorage.getItem('pwd')===values.pwd)&&(values.newpwd===values.newpwdCk)){

    
        axios.post(`/member/updateMypage`,JSON.stringify(data),{headers})
            .then(res => {
                alert(`${res.data.result}`); 
                localStorage.setItem('pwd',data.pwd);
               
                handleClose();
            })
            .catch(e=>{
                alert(`수정 실패`);
            })
        }
}
const dudUrl = '';
  return (
    <React.Fragment>
      <Button  variant="outlined" color="secondary" onClick={handleClickOpen}>
        비밀번호 변경
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">비밀번호 변경</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
            
                        <TextField
                            id           = "outlined-password-input"
                            label        = "기존 비밀번호"
                            className    = {classes.textField}
                            type         = "password"
                            value        = {values.pwd}
                            onChange     = {handleChange('pwd')}
                            autoComplete = "current-password"
                            margin       = "normal"
                            variant      = "outlined"
                        />
                        {(localStorage.getItem('pwd')!==values.pwd) &&(values.pwd!=='') && <span>비밀번호가 일치하지 않습니다.</span>} 
                        
                        <TextField
                            id           = "outlined-password-input"
                            label        = "새 비밀번호"
                            className    = {classes.textField}
                            type         = "password"
                            value        = {values.newpwd}
                            onChange     = {handleChange('newpwd')}
                            autoComplete = "current-password"
                            margin       = "normal"
                            variant      = "outlined"
                        />
                        <TextField
                            id           = "outlined-password-input"
                            label        = "새 비밀번호 확인"
                            className    = {classes.textField}
                            type         = "password"
                            value        = {values.newpwdCk}
                            onChange     = {handleChange('newpwdCk')}
                            autoComplete = "current-password"
                            margin       = "normal"
                            variant      = "outlined"
                        />
                        {(values.newpwdCk!=='') && (values.newpwd!==values.newpwdCk)&& <span>입력한 새 비밀번호와 다릅니다.</span>}
                        <div>
                            <Button variant = "outlined" color = "secondary" className = {classes.button} onClick = {pwmodi}>
                                변경
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