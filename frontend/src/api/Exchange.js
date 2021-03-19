import React,{Component} from 'react';
import {Table, Row, Form, Col} from 'react-bootstrap'
import {Container} from '@material-ui/core';
class Exchange extends Component{
    constructor(props) {
        super(props);
        this.state = {
          // country   : '',
          // kftc_bkpr : ''
          korValue : 1,
          cons: []
        }
        this.key = 0;
      }
      callApi = () => {
        let d = new Date();
        let month = d.getMonth()+1
        //월이 한자릿수면 앞에 0을 붙임
        if(month<10){
          month = "0"+(d.getMonth()+1)
        }
        //일이 한자릿수면 앞에 0을 붙임
        let date = d.getDate();
        if(date<10){
          date = "0"+d.getDate();
        }
        let today = d.getFullYear()+''+month+''+date;
        //월요일 이른시간일경우 금요일로세팅
        if(d.getDay() == 1 && d.getHours() < 12){
          today = d.getFullYear()+''+month+''+(d.getDate()-3);
        }
        //주말엔 안나와서 금요일로 세팅
        switch (d.getDay()) {
          case 0:
            //일요일일 경우
            today = d.getFullYear()+''+month+''+(d.getDate()-2);
            break;
          case 6:
              //토요일일경우
              today = d.getFullYear()+''+month+''+(d.getDate()-1);
            break;  
        }
        // alert(today)
        fetch("/site/program/financial/exchangeJSON?authkey=lh4eJnm6eYZjI0fVzsBHLx5iDB9eWRJr&searchdate="+today+"&data=AP01")
          .then(res => res.json())
          .then(res => {

            let countryMap = []
            
            for (let i = 0; i < res.length; i++){
              countryMap.push({code:res[i].cur_unit, desc:res[i].cur_nm, rate:res[i].kftc_deal_bas_r});
            }

            this.setState({
              
              cons:countryMap
            })
            
            console.log(this.state)
            
          })
      }
      componentDidMount() {
        this.callApi();
      }
    render(){

      const { cons,korValue} = this.state;


      console.log("---------------");
     
      console.log(cons);
      console.log("---------------");


      // const testArray = cons;

      // let currentState;
      
      // testArray.map((value) => currentState = value)
      
      // console.log(currentState);
      let d = new Date();
      const korValueChange = e =>  {
        // alert(e.target.value)
        this.setState({
          ...this.state,
          korValue : e.target.value,
        })
        
      }
        return(
            <div>
                <Container maxWidth="sm">
                  <h5>{d.getFullYear()}년 {d.getMonth()+1}월 {d.getDate()}일 환율</h5>
                  <Form.Row>
                    <Col>
                      <Form.Control type="number" placeholder="한화" defaultValue = "1" value = {this.state.korValue} onChange= {korValueChange}/> 
                    </Col>  
                    <Col>
                    원
                    </Col>
                  </Form.Row>
                <Table striped bordered hover size="sm" >
                <thead>
                  <tr>
                    <th>국가명</th> 
                    <th>화폐/원</th>
                    <th>화폐명</th> 
                  </tr>
                </thead>
                <tbody>
                  {
                    cons.map( (value, idx) => 
                    <tr>
                      <td>{value.desc}</td>
                      <td>
                        {// korValue/value.rate
                          //소수점 반올림처리
                          (korValue=='1')?
                          (korValue/(value.rate.replace(',',''))).toFixed(2):
                          ((1/(value.rate.replace(',',''))) * korValue).toFixed(2)
                          // (value.rate.replace(',',''))
                          }
                      </td>
                      <td>{value.code}</td>
                    </tr> 
                    )
                  }
                </tbody>
                </Table> 
                </Container>
            </div>
        );
    }
}

export default Exchange;