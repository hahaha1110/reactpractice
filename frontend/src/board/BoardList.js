import React from 'react'
import {Card, Button,Col,Container,Row,Form,ButtonToolbar,ButtonGroup} from 'react-bootstrap';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import history from '../history'
class BoardList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          arr : [],
          search : '',
          boardNum : '',
          nowPage : '0',
          totalPage : '',
          btnArr : []
        }
        this.key = 0;
      }
      componentDidMount() {
        const {arr,nowPage} = this.state;
      //엑시오스 호출
      axios.get(`/board/boardList/${nowPage}/null`)
    .then(res=>{
        console.log(res.data)
        console.log(res.data.content)
        let listMap = []
        let cards = []
        for (let i = 0; i < res.data.content.length; i++){
          cards.push(i+1)
          // cards.map()
          listMap.push({
                id           :res.data.content[i].id,
                title        :res.data.content[i].title, 
                content      :res.data.content[i].content, 
                email        :res.data.content[i].email, 
                regdate      :res.data.content[i].regDate,
                storeFileUrl :res.data.content[i].fileUrl,
                protect      : res.data.content[i].protect,
            });
            
        }
       
        console.log(listMap)
        let buttonArr = []  
            for (let i = 0; i < res.data.totalPages; i++){
              buttonArr.push(i);
            }

        this.setState({
            arr : listMap,
            totalPage : (res.data.totalPages)+1,
            btnArr : buttonArr
         })
        
        
        
    })
    .catch(e=>{
        alert('ERROR');
    })
    console.log('렌더링이 완료되었습니다!');
    console.log(arr)  
    }
    render(){
        const {arr,boardNum,btnArr,search} = this.state;
        console.log(arr)
        console.log(boardNum)
        //새글쓰기
        const boardNewPage = e => {
            e.preventDefault();
            history.push('/boardNew');
            window.location.reload();
          }
          //글 상세보기
        const boardDetailPage = e => {
            e.preventDefault();
            console.log(e.target.value)
            this.setState({
                boardNum : e.target.value
            })
            console.log(boardNum)
            
            // history.push(`/boardDetail/${e.target.value}`);
            history.push({
                pathname : `/boardDetail`,
                state : e.target.value
            })
            window.location.reload();
        }
        //검색버튼 클릭
      const searchBtn = e => {
        e.preventDefault();
        axios.get(`/board/boardList/0/${search==''?'null':search}`)  
          .then(res=>{
            console.log(res.data)
            console.log(res.data.content)

            let listMap = []
            let cards = []
            for (let i = 0; i < res.data.content.length; i++){
            cards.push(i+1)
            // cards.map()
            listMap.push({id:res.data.content[i].id, title:res.data.content[i].title, content:res.data.content[i].content, email:res.data.content[i].email, regdate:res.data.content[i].regDate,storeFileUrl:res.data.content[i].fileUrl});
                
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
      //페이지 버튼 클릭
      const pageBtnClick = e => {
        e.preventDefault();
        this.setState({
            ...this.state, nowPage : e.target.value
          })
          axios.get(`/board/boardList/${e.target.value}/${search==''?'null':search}`)  
          .then(res=>{
            console.log(res.data)
            console.log(res.data.content)

            let listMap = []
            let cards = []
            for (let i = 0; i < res.data.content.length; i++){
            cards.push(i+1)
            // cards.map()
            listMap.push({id:res.data.content[i].id, title:res.data.content[i].title, content:res.data.content[i].content, email:res.data.content[i].email, regdate:res.data.content[i].regDate,storeFileUrl:res.data.content[i].fileUrl});
                
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
      const imageSrc = '/static/images/board/'
      console.log(arr)
        return(
            <div>
            <br/>
            <Container>
            <Row>
            {arr.map((value,idx)=>
            value.protect == 'true' && value.email != localStorage.getItem('email') ? '':
             <Col sm>
                <Card style={{ width: '18rem' }}>
                  {value.storeFileUrl!==null && <Card.Img variant="top" src={imageSrc+value.storeFileUrl} />}
                  {value.storeFileUrl===null && <Card.Img variant="top" src={imageSrc+"noimg.jpg"} />}  
                    
                    <Card.Body>
                        <Card.Title>{value.title}</Card.Title>
                        <Card.Subtitle>{value.email}</Card.Subtitle>
                        <Card.Text>
                        {value.regdate}
                        {/* {value.protect=='true' && value.protect} */}
                        </Card.Text>
                        <Button variant="primary" onClick={boardDetailPage} value={value.id}>전체보기</Button>
                    </Card.Body>
                </Card>
            </Col>
                )}
            </Row>
            <br/>
            <Form>
                  <Row className="justify-content-md-center">
                    <Col sm="4">
                      <Form.Control type="text" placeholder="search" value={search} onChange={handleChange('search')}/>
                    </Col>
                    <Col sm="2">
                      <Button onClick={searchBtn}>검색</Button>
                    </Col>
                    <Col sm="2">
                    <Button variant="outline-danger" onClick = {boardNewPage}>
                        새글작성
                    </Button>
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
            </Container>
            </div>
        );
    }
}
export default BoardList