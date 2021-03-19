import React from 'react'
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'
import history from '../history'
import {makeStyles, Grid, Typography, Paper, Box, TextField,Row,Container,Col,Checkbox,FormGroup, FormControlLabel,InputLabel, Select, MenuItem,FormControl } from '@material-ui/core';
class BoardUpdate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.location.state.id,
            title : this.props.location.state.title,
            content : this.props.location.state.content,
            email : this.props.location.state.email,
            file: '',
            imagePreviewUrl: '',
            storeFileUrl : this.props.location.state.storeFileUrl,
            checkedA : this.props.location.state.protect,
            country : this.props.location.state.country,
        }
    }
     _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
              ...this.state,
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }
    
    render(){
      console.log(localStorage.getItem('fileUrlTemp'))
      console.log(this.state.storeFileUrl)
        let {imagePreviewUrl} = this.state;
        const {id, title, content, email,storeFileUrl,checkedA,country} = this.state
        let $imagePreview = null;
        if (storeFileUrl&&(!imagePreviewUrl)) {
          $imagePreview = (<img src={'/static/images/board/'+storeFileUrl} />);
        }else if(imagePreviewUrl){
          $imagePreview = (<img src={imagePreviewUrl} />);
        }
         else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        
        //이미지 수정
        const _handleSubmit = (e) => {
          e.preventDefault();
          // TODO: do something with -> this.state.file
          // alert('클릭');
          console.log('handle uploading-', this.state.file);
          var frm = new FormData();
          frm.append("photo", this.state.file);
          console.log(frm)
          //경로에 파일저장
          axios.post('/board/uploadProfileImg', frm,{
          headers: {
              'Content-Type': 'multipart/form-data'
          }
          })
          .then(res => {
            // alert(`이미지 저장 성공`);
            //글수정함수실행 
            update(res.data.result);
            // localStorage.setItem('fileUrlTemp',res.data.result)
          // var strArray = res.data.result.split()
          //state에 받아온 경로저장
          // alert(res.data.result)
          this.setState((state, props) => ({
              ...state, storeFileUrl: res.data.result
          }))
          // setValues({
          //   ...values,storeFileUrl: res.data.result
          // })
          // window.location.reload();
          history.push({
                    pathname : `/boardDetail`,
                    state : id
                })
                window.location.reload();
          })
          .catch(e => {
          
          alert('ERROR');
          })
  
          // console.log(this.state.storeFileUrl)
          // console.log(localStorage.getItem('fileUrlTemp'))
        }
        
        //글수정용 업데이트
        const update = fileUrl => {
            
            // e.preventDefault();
            // alert('글수정')
            const headers = {
                'Content-Type'  : 'application/json',
                'Authorization' : 'JWT fefege..'
            }
            const data = {
                id : id,
                title : title,
                content : content,
                fileUrl : fileUrl,
                protect : checkedA,
                country : country
                // fileUrl : values.storeFileUrl
            }
            axios.post(`/board/updateBoard`, JSON.stringify(data),
            {headers : headers})
            .then(res=>{
                alert(`${res.data.result}`);
                
                // history.push({
                //     pathname : `/boardDetail`,
                //     state : id
                // })
                // window.location.reload();
            })
            .catch(e=>{
                alert('ERROR');
            }) 
        }
        //이미지 없이 글수정
        const plainUpdate = e => {
            
          e.preventDefault();
          
          const headers = {
              'Content-Type'  : 'application/json',
              'Authorization' : 'JWT fefege..'
          }
          const data = {
              id : id,
              title : title,
              content : content,
              protect : checkedA,
              fileUrl : storeFileUrl,
              country : country
          }
          axios.post(`/board/updateBoard`, JSON.stringify(data),
          {headers : headers})
          .then(res=>{
              alert(`${res.data.result}`);
              
              history.push({
                  pathname : `/boardDetail`,
                  state : id
              })
              window.location.reload();
          })
          .catch(e=>{
              alert('ERROR');
          }) 
      }

        //글수정버튼 클릭
        const updateBtn = e => {
          e.preventDefault();
          //이미지 업로드함수 실행
          if(this.state.file != ''){
            _handleSubmit(e);
          }else{
            plainUpdate(e);
          }
                   
        }

        const handleChange = name => e => {
            e.preventDefault();
            this.setState({
                ...this.state, [name] : e.target.value
            })
            console.log(title)
            console.log(content)
        }
        //체크박스 수정
        const c_handleChange = name => event => {
          this.setState({
            ...this.state, [name] : event.target.checked
          })
        };
        //카테고리체인지
        const cate_handleChange = event => {
          this.setState(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
          }));
        }
        const classes = makeStyles(theme => ({
            root : {
                padding : theme.spacing(3, 3),
                height : 500
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
        return(
            <div>
                {/* 보드업데이트 */}
               {/* {id}
               {title}
               {content}
               {email} */}
               <br/>
               <Paper className = {classes.root}>
                <form className={classes.container} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="country-simple">Country</InputLabel>
                <Select
                  value={this.state.country}
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
                    value={title}
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
                        onChange={(e)=>this._handleImageChange(e)} />
                    {/* <button className="submitButton" 
                        type="submit" 
                        onClick={_handleSubmit}>Upload Image</button> */}
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
                    value={content}
                    onChange={handleChange('content')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox checked={checkedA} onChange={c_handleChange('checkedA')} value="checkedA" />
                  }
                  label="비밀글"
                />
                <Button  variant="outline-danger" onClick = {updateBtn}>
                            글수정
                </Button>
                </FormGroup>
                </form>
                </Paper>
               
            </div>
        );
    }
}
export default BoardUpdate