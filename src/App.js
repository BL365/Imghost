import React from 'react';
import './App.css';
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';

class App extends React.Component {
  render() {
    return (
      <div className="App-upload-button">
      <label htmlFor="input">
        <CropOriginalOutlinedIcon />Upload image
      </label>
      <input type="file" id="input" multiple />
      </div>
    );
  }
}

export default App;
