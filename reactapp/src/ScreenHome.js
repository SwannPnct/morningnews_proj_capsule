import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import {Input,Button} from 'antd';

function ScreenHome(props) {

  const [nameSU, setNameSU] = useState('');
  const [emailSU, setEmailSU] = useState('');
  const [passwordSU, setPasswordSU] = useState('');
  const [emailSI, setEmailSI] = useState('');
  const [passwordSI, setPasswordSI] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [siError, setSiError] = useState(false);
  const [suError, setSuError] = useState(false);


  const handleSignUp = async () => {    
    
      await fetch('/sign-up', {
      method: "POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'username='+nameSU+'&email='+emailSU+'&password='+passwordSU
      }).then(async (res) => {
        const json = await res.json();
        if(json.result) {
          props.shareToken(json.token);
          setIsLogged(true);
          setSuError(false);
        } else {
          setSuError(true);
        }
      });
  }

  const handleSignIn = async () => {
    await fetch('/sign-in', {
      method: "POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'email='+emailSI+'&password='+passwordSI
      }).then(async (res) => {
        const json = await res.json();
        console.log(json.token)
        if(json.result) {
          props.shareToken(json.token);
          setIsLogged(true);
          setSiError(false);
        } else {
          setSiError(true);
        }
      });
  }
  


  if (isLogged) {
    return(
      <Redirect to='/screenmyarticles'/>
    )
  } else {
    return (
      <div className="Login-page" >
  
            
  
            <div className="Sign">
            {siError? <span className="login_error">Wrong credentials.</span> : null}
                    
                    <Input className="Login-input" placeholder="email" onChange={(e) => setEmailSI(e.target.value)} value={emailSI}/>
  
                    <Input.Password className="Login-input" placeholder="password" onChange={(e) => setPasswordSI(e.target.value)} value={passwordSI}/>
              
  
              <Button style={{width:'80px'}} type="primary" onClick={() => handleSignIn()}>Sign-in</Button>
  
            </div>
  
            
  
            <div className="Sign">
            {suError? <span className="login_error">There was an issue creating this account.</span> : null}
                    
                    <Input className="Login-input" placeholder="username" onChange={(e) => setNameSU(e.target.value)} value={nameSU}/>
                    <Input className="Login-input" placeholder="email" onChange={(e) => setEmailSU(e.target.value)} value={emailSU}/>
  
                    <Input.Password className="Login-input" placeholder="password" onChange={(e) => setPasswordSU(e.target.value)} value={passwordSU}/>
              
  
              <Button style={{width:'80px'}} type="primary" onClick={() => handleSignUp()}>Sign-up</Button>
  
            </div>
  
            
  
        </div>
    );
  }

 
}

function mapDispatchToProps(dispatch) {
  return {
    shareToken: function(token) {
      dispatch({type: "tokenSharing", token})
    }
  }
}

export default connect(null, mapDispatchToProps)(ScreenHome);
