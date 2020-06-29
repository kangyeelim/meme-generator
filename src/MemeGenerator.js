import React from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

class MemeGenerator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textInputs:this.props.textBoxes
    }
    this.handleChange = this.handleChange.bind(this)
    this.downloadMeme = this.downloadMeme.bind(this)
  }

  handleChange(id, event) {
    const {value} = event.target
    var newTextInputs = this.state.textInputs.map((input) => {
      if (input.id === id) {
        return {id:id, input:value}
      } else {
        return input
      }
    })
    this.setState({textInputs:newTextInputs})
  }

  downloadMeme() {
    var FileSaver = require('file-saver')
    var node = document.getElementById("meme")
    console.log(node)
    html2canvas(node, {letterRendering: 1, allowTaint :false, useCORS:true, logging:true}).then(function(canvas) {
      var image = canvas.toDataURL("image/png")
      console.log(image)
      saveAs(image)
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.textBoxes !== this.props.textBoxes) {
      document.getElementById("meme-form").reset()
      this.setState({textInputs:this.props.textBoxes})
    }
  }

  render() {
    const handleChange = this.handleChange;
    const textBoxes = this.props.textBoxes.map(function(data) {
      return <input
        type="text"
        className="input-text"
        placeholder="Meme Text"
        key={data.id}
        onChange={(event) => handleChange(data.id, event)}
      />
    })
    const textInputs = this.state.textInputs.map(function(data) {
      var top = (data.id) * 50;
      return <h2
      style={{ top:top }}
      className="text"
      key={data.id}>{data.input}</h2>
    })
    return (
      <div className="meme-portion">
        <h3 className="header">Edit Text on Meme Image</h3>
        <form className="meme-form" id="meme-form">
          {textBoxes}
        </form>
        <div id="meme" className="meme">
          <img id="edit-img" className="edit-img" src={this.props.imageUrl}/>
          {textInputs}
        </div>
        <button type="button" className="download-btn"
        title="Download the image as a jpg file"
        onClick={this.downloadMeme}>Download</button>
      </div>
    )
  }
}

export default MemeGenerator;

/*<h2 className="top">top text</h2>
<h2 className="bottom">bottom text</h2>*/
