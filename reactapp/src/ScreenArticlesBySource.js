import React, { useEffect, useState } from 'react';
import {useParams}  from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon, Modal, Button} from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [data, setData] = useState([]);
  let {id} = useParams();

  useEffect(() => {
    (async () => {
      const resRaw = await fetch(`http://newsapi.org/v2/top-headlines?sources=${id}&apiKey=b3a69ec6874a4479bd10c66d89f1a9ea`);
      const resJson = await resRaw.json();
      setData(resJson.articles)
    })()
  })

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const articles = data.map((e) => {
    return(
      <div  style={{display:'flex',justifyContent:'center'}}>
      <Card
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="example"
                      src={e.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={showModal}/>,
                      <Modal title={e.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <p>{e.content}</p> 
      </Modal>,
                      <Icon type="like" key="ellipsis" onClick={() => props.addToWishList(e)}/>
                  ]}
                  >

                  <Meta
                    title={e.title}
                    description={e.description.slice(0,100) + "..."}
                  />

                </Card>
                </div>
    )
  })

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
    
              

                {articles}

              


            

           </div> 

         
      
      </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(articleInfo) {
      dispatch({type: "addArticle", 
      info: articleInfo
    })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenArticlesBySource);
