import React,{Component} from 'react';
import SingleLineGridList from '../components/SingleLineGridList'
import Exchange from '../api/Exchange';
class Home extends Component{
    render(){
        return(
            <div>
                <SingleLineGridList/>
                <br/>
                <Exchange/>
            </div>
        );
    }
}
export default Home;

