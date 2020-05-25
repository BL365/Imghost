import React from 'react';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div className="App-upload-button">
    
      <button onClick={() => (console.log('Clicked'))}>Upload File</button>
      
      </div>
  
    );
  }
}

export default App;
