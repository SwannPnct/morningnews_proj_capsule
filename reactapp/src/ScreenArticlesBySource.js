import React, { useEffect, useState } from 'react';
import {useParams}  from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon, Modal, Button} from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenArticlesBySource(props) {


  console.log(props.token);
  const [data, setData] = useState([]);
  let {id} = useParams();

  useEffect(() => {
    (async () => {
      const resRaw = await fetch(`http://newsapi.org/v2/top-headlines?sources=${id}&apiKey=fe029808a40c4dbfaae679aadccf71a1`);
      const resJson = await resRaw.json();
      setData(resJson.articles)
    })()
  }, [])
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

  const addWishlistElement = (wishlistElement, flag) => {
    fetch('/wish-list', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        token: props.token,
        wishlist: wishlistElement,
        flag
      })
    })
    .then((response) => response.json())
    // .then(() => {
    //   props.addToWishList(wishlistElement)
    // })
  }

  console.log(props.token);

  const articles = data.map((article) => {
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
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={showModal}/>,
                      <Modal title={article.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <p>{article.content}</p> 
      </Modal>,
                      <Icon type="like" key="ellipsis" onClick={() => addWishlistElement(article,props.flagSelected)}/>
                      // <Icon type="like" key="ellipsis" onClick={() => props.addToWishList(e)}/>
                  ]}
                  >

                  <Meta
                    title={article.title}
                    description={article.description.slice(0,100) + "..."}
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

// Token est stocké dans store redux
// mapStateToProps permet de récuperer des elements du store et de les ajouter en props au composant ( token )
// depuis le composant, possibilité d'utiliser "props"


function mapStateToProps(state) {
  // const { todos } = store
 
  return { token: state.token ,
          flagSelected: state.flagSelected}
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
  mapStateToProps, mapDispatchToProps
)(ScreenArticlesBySource);
