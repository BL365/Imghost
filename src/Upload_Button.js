import React from 'react';
import './Upload_Button.css';
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';

class Upload_Button extends React.Component {
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

export default Upload_Button;