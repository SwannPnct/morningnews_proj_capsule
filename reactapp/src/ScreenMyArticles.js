import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon, Modal, Button} from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenMyArticles(props) {
  

  const [myArticles, setMyArticles] = useState ([]);
  const [flagSelected, setFlagSelected] = useState("all");
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

  const styleFlagSelected = {
    border: "5px solid #44FDB1"
  }


  useEffect(() => { ( async () => {
    const res = await fetch('/screen-articles?token='+props.token);
    const response = await res.json();
    setMyArticles (response.user.wishlist)
  })()
},[])

function handleFlagSelection(flag) {
  setFlagSelected(flag);
}

async function deleteFromWishList(idx) {
  const res = await fetch('/delete-article', {
    method: 'PUT',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body : "index=" + idx + "&token="+ props.token
  })
  const resJson = await res.json();
  setMyArticles(resJson.saved.wishlist);
}

  const genFlags = () => {
    const flagList = [];
    myArticles.forEach((e) => {
      if (flagList.indexOf(e.country) === -1) {
        flagList.push(e.country);
      } 
    })
    return flagList.map((flag) => {
        return(
          <img className="flag-icon" alt={"flag-"+flag} src={"/images/flags/"+flag+".svg"} onClick={() => handleFlagSelection(flag) } style={flag === props.flagSelected ? styleFlagSelected : {}}></img>
        )
    })
  }

  const genArticles = () => {
    const filteredArticles = flagSelected === "all" ? [...myArticles] : myArticles.filter(e => e.country === flagSelected);
    return (filteredArticles.map((e,idx) => {
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
                        src={e.url}
                    />
                    }
                    actions={[
                        <Icon type="read" key="ellipsis2" onClick={showModal}/>,
                        <Modal title={e.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
         <p>{e.content}</p> 
        </Modal>,
                        <Icon type="close" key="ellipsis" onClick={() => deleteFromWishList(idx)}/>
                    ]}
                    >
  
                    <Meta
                      title={e.title}
                      description={e.description.slice(0,100) + "..."}
                    />
  
                  </Card>
                  </div>
      )
    }))
  }

  return (
    <div>
         
            <Nav/>

            <div className="Banner flagged">
              <div className="flag-icon all-icon" onClick={() => handleFlagSelection("all") }>All</div>
              {genFlags()}
            </div>

            <div className="Card">       

            {myArticles.length !== 0 ? genArticles(): <span>No articles</span>}         

             </div>
      
 

      </div>
  );
}

function mapStateToProps(state) {
  return {
    myArticles: state.myArticles,
    token: state.token
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
