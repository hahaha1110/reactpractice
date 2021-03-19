import React,{Component} from 'react'
import ImageAvatars from '../components/ImageAvatars';
import PaperSheet from '../components/PaperSheet';
import {Redirect} from 'react-router-dom'
import {makeStyles, Grid, Typography, Paper,Button} from '@material-ui/core';


class Mypage extends Component{
   
    render(){
        
        
        return(
            <div>
                {/* 로그인 안되어있으면 리다이렉션 */}
                {localStorage.getItem('email') == null && <Redirect/>}
                {localStorage.getItem('email') == 'null' && <Redirect/>}
                {/* 마이페이지 */}
                <br/>
                <PaperSheet/>

               

            </div>
        );
    }
}
export default Mypage;