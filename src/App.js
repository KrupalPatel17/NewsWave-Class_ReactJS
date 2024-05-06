import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'dark', // Initial state
    };
    document.body.style.backgroundColor = '#616161';
  }

  toggleMode = () => {
    const newMode = this.state.mode === 'light' ? 'dark' : 'light';
    this.setState({ mode: newMode });
    document.body.style.backgroundColor = newMode === 'dark' ? '#616161' : '#a4d4ff';
  };
  pageSize = 5;

  state = {
    progress: 0
  }

  setProgress=(progress)=> {
    this.setState({ progress: progress })
  }

  apiKey= process.env.REACT_APP_NEWS_API

  render() {
    return (
      <div>
        <Router>
          <Navbar mode={this.state.mode} toggleMode={this.toggleMode} />
          <LoadingBar
            height={2}
            color='linear-gradient(to right, #0074D9, #00BFFF, #00eeff)'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
