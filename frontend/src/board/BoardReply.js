import React from 'react'
import {makeStyles, Grid, Typography, Paper, Box, TextField,Row,Container,Col } from '@material-ui/core';
import {Card, Button,Table,Form} from 'react-bootstrap'
import axios from 'axios'
import history from '../history'
class BoardReply extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            arr : [],    
            content : '',
            boardNum : this.props.boardNum,
            email : localStorage.getItem('email'),
            modiState : false,
            contentUpdate : ''
        }
        console.log('constructor')
    }
    componentDidMount() {
        const {arr,boardNum} = this.state;
        console.log(this.props.boardNum)
        axios.get(`/boardReply/${boardNum}`)
        .then(res=>{
            console.log(res.data)
            let listMap = []
            for (let i = 0; i < res.data.length; i++) {
                listMap.push({
                    id:res.data[i].id,
                    content:res.data[i].replyText, 
                    email:res.data[i].replyer, 
                    regdate:res.data[i].regdate
                });
                
            }
            this.setState({
                ...this.state,
                arr : listMap,
             })
         })
        .catch(e=>{
            alert('ERROR');
        })
        
    }
    render(){
        console.log('render')
        
        const {arr,email, content,boardNum,modiState,contentUpdate} = this.state
        
        const handleChange = name => e => {
            e.preventDefault();
            this.setState({
                ...this.state, [name] : e.target.value
            })
            // console.log(content)
            // console.log(boardNum)
            // console.log(email)
            console.log(contentUpdate)
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
          }));

        //입력버튼 클릭
        const replyInput = e => {
            e.preventDefault();
            // alert(this.props.boardNum)
            // alert(this.state.email)
            const headers = {
                'Content-Type'  : 'application/json',
                'Authorization' : 'JWT fefege..'
              }
              const data = {
                replyText : this.state.content,
                replyer   : this.state.email
            }
            axios.post(`/boardReply/${boardNum}`, JSON.stringify(data),
            {headers : headers})
            .then(res=>{
                alert(`${res.data.result}`);
                window.location.reload();
            })
            .catch(e=>{
                alert('ERROR');
            }) 

        }
        //삭제버튼 클릭
        const deleteBoardReply = e => {
            e.preventDefault();
            // alert(e.target.value)
            if (window.confirm('삭제하시겠습니까?')) {
                axios.delete(`/boardReply/${boardNum}/${e.target.value}`)
                .then(res=>{
                    console.log(res.data)
                    let listMap = []
                    for (let i = 0; i < res.data.length; i++) {
                        listMap.push({
                            id:res.data[i].id,
                            content:res.data[i].replyText, 
                            email:res.data[i].replyer, 
                            regdate:res.data[i].regdate
                        });
                    }
                    this.setState({
                        ...this.state,
                        arr : listMap,
                     })
                 })
                .catch(e=>{
                    alert('ERROR');
                })
            }
        }
        //수정버튼 클릭(텍스트에서 인풋폼으로 변경)
        const updateBoardReply = e => {
            e.preventDefault();
            this.setState({
                ...this.state,
                modiState : true,
             })
        }
        //수정확인
        const updateBoardReplyConfirm = e => {
            e.preventDefault();
            // alert(e.target.value)
            const headers = {
                'Content-Type'  : 'application/json',
                'Authorization' : 'JWT fefege..'
              }
              const data = {
                replyText : this.state.contentUpdate,
                id        : e.target.value
            }
            axios.put(`/boardReply/${boardNum}`, JSON.stringify(data),
            {headers : headers})
            .then(res=>{
                console.log(res.data)
                let listMap = []
                for (let i = 0; i < res.data.length; i++) {
                    listMap.push({
                        id:res.data[i].id,
                        content:res.data[i].replyText, 
                        email:res.data[i].replyer, 
                        regdate:res.data[i].regdate
                    });
                }
                this.setState({
                    ...this.state,
                    modiState : false,
                    arr : listMap,
                })
            })
            .catch(e=>{
                alert('ERROR');
            }) 

        }
        console.log(boardNum)
        return(
            <div>
               
                {/* {this.props.boardNum} */}
                
                    <Table responsive="md">
                    <tbody>
                        {arr.map((value,idx)=>
                        <tr>
                        {/* <td>{value.id}</td> */}
                        {modiState === false ? 
                            (<td >{value.content}</td>)
                            :
                            (        
                                <TextField
                                fullWidth
                                id="outlined-name"
                                label=""
                                className={classes.textField}
                                defaultValue={value.content}
                                onChange={handleChange('contentUpdate')}
                                margin="normal"
                                variant="outlined"
                                />
                            )
                        }
                        <td>{value.email}</td>
                        
                            {(localStorage.getItem('email') == value.email && modiState === false) &&(
                                    <td>
                                    <Button onClick={updateBoardReply} value={value.id}>수정</Button>
                                    <Button variant="danger" onClick={deleteBoardReply} value={value.id}>삭제</Button>
                                    </td>
                                )  
                            }
                            {(localStorage.getItem('email') == value.email && modiState === true) &&(
                               <td>
                               <Button onClick={updateBoardReplyConfirm} value={value.id}>수정</Button>
                               <Button variant="danger" onClick={deleteBoardReply} value={value.id}>삭제</Button>
                               </td>
                            )}
                            {(localStorage.getItem('email') != value.email)&&
                                <td></td>
                            }    
                            
                        
                        {/* <span>{value.regdate}</span> */}
                        </tr>
                            )}
                    </tbody>
                </Table>
                <TextField
                    fullWidth
                    id="outlined-name"
                    label="댓글"
                    className={classes.textField}
                    value={content}
                    onChange={handleChange('content')}
                    margin="normal"
                    variant="outlined"
                />
                <Button variant="primary" onClick={replyInput}>
                                입력
                            </Button> 
            </div>
        );
    }
}
export default BoardReply