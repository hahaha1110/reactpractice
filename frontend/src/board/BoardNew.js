import React from 'react'
import {makeStyles, Grid, Typography, Paper,Button,Box, FormGroup,FormControl, FormControlLabel,TextField,TextareaAutosize, Checkbox,InputLabel, Select, MenuItem} from '@material-ui/core';
import { Router, Route, Link } from 'react-router-dom';
import history from '../history'
import axios from 'axios'
const useStyles = makeStyles(theme => ({
    root : {
        padding : theme.spacing(3, 3),
      },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
export default function BoardNew(){
    
    const classes = useStyles();
    const [values, setValues] = React.useState({
        title: '',
        content: '',
        file : '',
        imagePreviewUrl: '',
        storeFileUrl: '',
        country:'',
      });
      const [state, setState] = React.useState({
        checkedA: false,
      });
      const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
      const c_handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };
      //카테고리 체인지
      const cate_handleChange = event => {
        setValues(oldValues => ({
          ...oldValues,
          [event.target.name]: event.target.value,
        }));
      }
      //글작성 버튼 클릭
      const confirmBtn = e => {
        e.preventDefault();
        //이미지 업로드함수 실행
        if(values.file != ''){
          _handleSubmit(e);
        }else{
          plainNew(e);
        }
      }

      //이미지 없이 기본업로드
      const plainNew = e => {
        e.preventDefault();
        
        if(values.title===''||values.content===''){
            alert('제목과 내용을 입력해 주세요');
            return false;
        }
        
        const headers = {
            'Content-Type'  : 'application/json',
            'Authorization' : 'JWT fefege..'
          }
          const data = {
            title   : values.title,
            content : values.content,
            email   : localStorage.getItem('email'),
            protect : state.checkedA,
            country : values.country
          }
        axios.post(`/board`, JSON.stringify(data),
        {headers : headers})
            .then(res=>{
                alert(`${res.data.result}`);
                history.push('/boardList');
                window.location.reload();
            })
            .catch(e=>{
                alert('ERROR');
            }) 
      }
      //이미지 변경
      const handleImageChange = e => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          setValues({
              ...values,
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }
      
      //이미지 수정
      const _handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle uploading-', values.file);
        var frm = new FormData();
        frm.append("photo", values.file);
          console.log(frm)
          axios.post('/board/uploadProfileImg', frm,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            })
            .then(res => {
              alert(`이미지 저장 성공`);
              //글수정함수실행 
              newboard(res.data.result);
              setValues({
                ...values,
              storeFileUrl: res.data.result
              
              });
            
              history.push('/boardList');
              window.location.reload();
            })
            .catch(e => {
            
            alert('ERROR');
            })
      }

      //이미지 업로드용 글쓰기
      const newboard = fileUrl => {
        if(values.title===''||values.content===''){
          alert('제목과 내용을 입력해 주세요');
          return false;
        }
        const headers = {
          'Content-Type'  : 'application/json',
          'Authorization' : 'JWT fefege..'
        }
        const data = {
          title   : values.title,
          content : values.content,
          email   : localStorage.getItem('email'),
          fileUrl : fileUrl,
          protect : state.checkedA,
          country : values.country
        }
        axios.post(`/board`, JSON.stringify(data),
        {headers : headers})
        .then(res=>{
            alert(`글작성 성공`);
        })
        .catch(e=>{
            alert('ERROR');
        }) 
        
      }
      
        const {imagePreviewUrl} = values
        let $imagePreview = null;
        
          $imagePreview = (<img src={imagePreviewUrl} />);
        
          if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
          } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
          }

        return(            
            <Paper className = {classes.root}>
            
              <form className={classes.container} noValidate autoComplete="off">
              
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="country-simple">Country</InputLabel>
                <Select
                  value={values.country}
                  onChange={cate_handleChange}
                  inputProps={{
                    name: 'country',
                    id: 'country-simple',
                  }}
                >
                  <MenuItem value={'한국'}>한국</MenuItem>
                  <MenuItem value={'중국, 중화권'}>중국, 중화권 </MenuItem>
                  <MenuItem value={'러시아'}>러시아</MenuItem>
                  <MenuItem value={'일본'}>일본</MenuItem>
                  <MenuItem value={'캐나다'}>캐나다</MenuItem>
                  <MenuItem value={'미국'}>미국</MenuItem>
                </Select>
              </FormControl>

                <TextField
                    fullWidth
                    id="outlined-name"
                    label="제목"
                    className={classes.textField}
                    value={values.title}
                    onChange={handleChange('title')}
                    margin="normal"
                    variant="outlined"
                />
               {/* 이미지 */}
               {/* 표지이미지 */}
               <div className="previewComponent">
                    <form onSubmit={_handleSubmit}>
                    <input className="fileInput" 
                        type="file" 
                        onChange={(e)=>handleImageChange(e)} />
                   
                    </form>
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                </div>
                {/* 이미지 */}
                <TextField
                    id="outlined-multiline-static"
                    label="내용"
                    multiline
                    fullWidth
                    rows="10"
                    value={values.content}
                    onChange={handleChange('content')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox checked={state.checkedA} onChange={c_handleChange('checkedA')} value="checkedA" />
                  }
                  label="비밀글"
                />
                <Button variant = "outlined" color = "secondary" className = {classes.button} onClick = {confirmBtn}>
                            글작성
                </Button>
              </FormGroup>
                
                </form>
                </Paper>
                
                
        );
    
}
