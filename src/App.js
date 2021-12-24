
import React from "react";

import imageCompression from "browser-image-compression";

import Card from "react-bootstrap/Card";

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false
    };
  }

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Bring a bigger image");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <div className="appBody">
        <div className="appTitle">
          <h1>Image Compressor</h1>
        </div>

        <div className="components">
          <div className="upload">
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png"
              ></Card.Img>
            )}
            <div className="choosefile">
              <input
                type="file"
                accept="image/*"
                className="inputname"
                onChange={e => this.handle(e)}
              />
            </div>
          </div>
          <div className="middle">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className="compressbtn"
                onClick={e => this.click(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="downlop">
            <Card.Img variant="top" class="ht2" src={this.state.compressedLink}></Card.Img>
            {this.state.clicked ? (
              <div className="downloadbtn">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="downloadbtn"
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
