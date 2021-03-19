import React from 'react'
import axios from 'axios'
import {Table, Button,Form,Col,Row,ButtonToolbar,ButtonGroup} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
class MemberList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          arr : [],
          search : '',
          nowPage : '0',
          totalPage : '',
          btnArr : []
        }
        this.key = 0;
      }
      componentDidMount() {
        const {arr,nowPage} = this.state;
        //엑시오스 호출
        //처음엔 1페이지
        axios.get(`/member/memberList/${nowPage}/null`)
        .then(res=>{
            console.log(res.data)
            console.log(res.data.content)

            let listMap = []
            for (let i = 0; i < res.data.content.length; i++){
                listMap.push({id:res.data.content[i].id, email:res.data.content[i].email, grade:res.data.content[i].grade, regdate:res.data.content[i].regDate});
              }
              console.log(listMap)
              console.log(res.data.totalPages)

            let buttonArr = []  
            for (let i = 0; i < res.data.totalPages; i++){
              buttonArr.push(i);
            }
            console.log(buttonArr)
            this.setState({
               arr : listMap,
               totalPage : (res.data.totalPages)+1,
               btnArr : buttonArr
            })

        })
        .catch(e=>{
            alert('ERROR');
        })
        console.log(this.state.arr)
        
      }
      
    render(){
       const {arr,search,totalPage,btnArr,nowPage} = this.state;
      //  console.log(arr);
      //강퇴
       const removeMember = e => {
        e.preventDefault();
        if (window.confirm(`회원을 탈퇴시키겠습니까?`)) {
          // alert(e.target.value)
          axios.delete(`/member/${e.target.value}`)
            .then(res=>{
              alert(`${res.data.result}`);
              window.location.reload();
          })
          .catch(e=>{
              alert('ERROR');
          })      
        }
      }

      
      //페이지 버튼 클릭
      const pageBtnClick = e => {
        e.preventDefault();
        // alert(e.target.value)
        this.setState({
          ...this.state, nowPage : e.target.value
        })
        console.log(search);
        //엑시오스 호출
        axios.get(`/member/memberList/${e.target.value}/${search==''?'null':search}`)
        .then(res=>{
            console.log(res.data)
            console.log(res.data.content)

            let listMap = []
            for (let i = 0; i < res.data.content.length; i++){
                listMap.push({id:res.data.content[i].id, email:res.data.content[i].email, grade:res.data.content[i].grade, regdate:res.data.content[i].regDate});
              }
              console.log(listMap)
              console.log(res.data.totalPages)

            let buttonArr = []  
            for (let i = 0; i < res.data.totalPages; i++){
              buttonArr.push(i);
            }
            console.log(buttonArr)
            this.setState({
               arr : listMap,
               totalPage : (res.data.totalPages)+1,
               btnArr : buttonArr
            })

        })
        .catch(e=>{
            alert('ERROR');
        })
        
      }
      //검색버튼 클릭
      const searchBtn = e => {
        e.preventDefault();
        // alert(search)
        
        // if(search == ''){
        //   alert('검색어를 입력해주세요')
        //   return false;
        // }
        axios.get(`/member/memberList/0/${search==''?'null':search}`)
        .then(res=>{
            console.log(res.data)
            console.log(res.data.content)

            let listMap = []
            for (let i = 0; i < res.data.content.length; i++){
                listMap.push({id:res.data.content[i].id, email:res.data.content[i].email, grade:res.data.content[i].grade, regdate:res.data.content[i].regDate});
              }
              console.log(listMap)
              console.log(res.data.totalPages)

            let buttonArr = []  
            for (let i = 0; i < res.data.totalPages; i++){
              buttonArr.push(i);
            }
            console.log(buttonArr)
            this.setState({
               arr : listMap,
               totalPage : (res.data.totalPages)+1,
               btnArr : buttonArr
            })

        })
        .catch(e=>{
            alert('ERROR');
        })

      }
      const handleChange = name => e => {
        e.preventDefault();
        this.setState({
          ...this.state, [name] : e.target.value
        })
        console.log(search)
      }
        return(
            <div>
                {localStorage.getItem('grade') == 'n' && <Redirect/>}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>email</th>
                      <th>grade</th>
                      <th>regdate</th>
                      <th>강퇴</th>
                    </tr>
                  </thead>
                  <tbody>
                  {arr.map((value, idx) => 
                    <tr><td>{value.id}</td><td>{value.email}</td>
                    <td>{value.grade}</td><td>{value.regdate}</td>
                    <td>
                      {value.grade === 'n' && <Button variant="danger" onClick={removeMember} value={value.id}>강퇴</Button>}
                    </td>
                    </tr>
                    )}
                  </tbody>
                </Table>
                <br/>
                
                <Form>
                  <Row className="justify-content-md-center">
                    <Col sm="2">
                      <Form.Control type="text" placeholder="search" value={search} onChange={handleChange('search')}/>
                    </Col>
                    <Col sm="1">
                      <Button onClick={searchBtn}>검색</Button>
                    </Col>
                  </Row>
                </Form>
                <br/>
                <Row className="justify-content-md-center">
                  <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="mr-2" aria-label="First group">
                      
                      {btnArr.map((value, idx) => 
                        <Button onClick={pageBtnClick} value={value}>{value+1}</Button>
                      )}
                      
                    </ButtonGroup>
                  </ButtonToolbar>
                </Row>
            </div>
        );
    }
}
export default MemberList