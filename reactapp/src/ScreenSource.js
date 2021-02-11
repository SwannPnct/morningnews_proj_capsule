import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function ScreenSource() {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const resRaw = await fetch("http://newsapi.org/v2/sources?country=fr&apiKey=b3a69ec6874a4479bd10c66d89f1a9ea");
      const resJson = await resRaw.json();
      setData(resJson.sources);
    })()
  },[])

  return (
    <div>
        <Nav/>
       
       <div className="Banner">
       <span class="flag-icon flag-icon-fr"></span>
       <span class="flag-icon flag-icon-uk"></span>
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

export default ScreenSource;
