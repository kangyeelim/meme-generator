import React from 'react';
import './App.css';
import MemeGenerator from './MemeGenerator';
import Header from './Header';
import Gallery from './Gallery'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: "https://i.imgflip.com/1bij.jpg",
      textBoxNum:2,
      textBoxes:[{id:1, input:""}, {id:2, input:""}]
    }
    this.setImage = this.setImage.bind(this)
    this.setTextBox = this.setTextBox.bind(this)
  }

  setImage(url) {
    this.setState({imageUrl:url})
    window.scrollTo(0,0)
  }

  setTextBox(num) {
    this.setState({textBoxNum:num})
    var textBoxes = [];
    for (var i = 0; i < num; i++) {
      textBoxes.push({id:i, input:""})
    }
    this.setState({textBoxes:textBoxes});
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="App">
          <MemeGenerator
            imageUrl={this.state.imageUrl}
            textBoxNum={this.state.textBoxNum}
            textBoxes={this.state.textBoxes}
          />
          <Gallery
            setImage={this.setImage}
            setTextBox={this.setTextBox}
          />
        </div>
      </div>
    );
  }
}

export default App;
