import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function ScreenSource(props) {

  const [data, setData] = useState([]);
  
  const flagList = ["fr","gb","pt","es","ie","it","kr"];
  const styleFlagSelected = {
    border: "5px solid #44FDB1"
  }

  const genFlags = flagList.map((flag) => {
    return(
      <img className="flag-icon" alt={"flag-"+flag} src={"/images/flags/"+flag+".svg"} onClick={() => props.handleFlagSelection(flag)} style={flag === props.flagSelected ? styleFlagSelected : {}}></img>
    )
  })

  useEffect(() => {
    (async () => {
      const resRaw = await fetch("http://newsapi.org/v2/sources?country="+props.flagSelected+"&apiKey=fe029808a40c4dbfaae679aadccf71a1");
      const resJson = await resRaw.json();
      setData(resJson.sources);
    })()
  },[props.flagSelected])

  return (
    <div>
        <Nav/>
       
       <div className="Banner flagged">
       {genFlags}
       </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<Link to={"/screenarticlesbysource/"+item.id}>{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    handleFlagSelection: function(flag) {
      dispatch({type: "flagSelection", flag})
    }
  }
}

function mapStateToProps(state) {
  return {
    flagSelected : state.flagSelected
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ScreenSource);
