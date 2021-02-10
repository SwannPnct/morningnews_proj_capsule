import React, {useState} from 'react';
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon, Modal, Button} from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenMyArticles(props) {

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

  console.log(props.myArticles);


  const genArticles = props.myArticles.map((e,idx) => {
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
                      <Icon type="close" key="ellipsis" onClick={() => props.deleteFromWishList(idx)}/>
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

            {props.myArticles ? genArticles: <span>No articles</span>}         

             </div>
      
 

      </div>
  );
}

function mapStateToProps(state) {
  return {
    myArticles: state.myArticles
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFromWishList: function(idx) {
      dispatch({type:"deleteArticle", index: idx})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ScreenMyArticles);
