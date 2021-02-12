import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import { Link, Redirect } from 'react-router-dom';

function ScreenSource(props) {

  const [data, setData] = useState([]);
  
  const flagList = ["fr","gb","pt","es","ie","it","kr"];
  const styleFlagSelected = {
    border: "5px solid #44FDB1"
  }

  const genFlags = flagList.map((flag) => {
    return(
      <img className="flag-icon" alt={"flag-"+flag} src={"/images/flags/"+flag+".svg"} onClick={() => props.handleFlagSelection(flag, props.token)} style={flag === props.flagSelected ? styleFlagSelected : {}}></img>
    )
  })

  useEffect(() => {
    (async () => {
        await fetch("http://newsapi.org/v2/sources?country="+props.flagSelected+"&apiKey=fe029808a40c4dbfaae679aadccf71a1");
        const res = await fetch('/get-country?token='+props.token);
        console.log(props.token);
        const resJson = await res.json();
        props.handleFlagSelection(resJson.foundUser.country, props.token);
    })()
  },[])

  useEffect(() => {
    (async () => {
      const resRaw = await fetch("http://newsapi.org/v2/sources?country="+props.flagSelected+"&apiKey=fe029808a40c4dbfaae679aadccf71a1");
      const resJson = await resRaw.json();
      setData(resJson.sources);
      await fetch('/update-country', {
          method: "PUT",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: "country=" + props.flagSelected + "&token=" + props.token
        });
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
    handleFlagSelection: function(flag,token) {
      dispatch({type: "flagSelection", flag, token})
    }
  }
}

function mapStateToProps(state) {
  return {
    flagSelected : state.flagSelected,
    token : state.token
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ScreenSource);
