import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';

import myArticles from './reducers/article.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

const store = createStore(combineReducers({myArticles}));


function App() {
  return (
      <Provider store={store}>
      <Router>
      <Switch>
        <Route path='/' exact><ScreenHome/></Route>
        <Route path='/screenarticles'><ScreenArticles/></Route>
        <Route path='/screensource' ><ScreenSource/></Route>
        <Route path='/screenarticlesbysource/:id'><ScreenArticlesBySource/></Route>
        <Route path='/screenmyarticles'><ScreenMyArticles/></Route>
      </Switch>
      </Router>
      </Provider>
    
  );
}

export default App;
