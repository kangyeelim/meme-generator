import React from 'react';

class MemeGenerator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textInputs:this.props.textBoxes
    }
    this.handleChange = this.handleChange.bind(this)
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
        name="input-text"
        placeholder="Meme Text"
        key={data.id}
        onChange={(event) => handleChange(data.id, event)}
      />
    })
    const textInputs = this.state.textInputs.map(function(data) {
      var top = (data.id - 1) * 50;
      return <h2
      style={{ top:top }}
      className="text"
      key={data.id}>{data.input}</h2>
    })
    return (
      <div>
        <form className="meme-form" id="meme-form">
          {textBoxes}
        </form>
        <div className="meme">
          <img className="editImg" src={this.props.imageUrl}/>
          {textInputs}
        </div>
      </div>
    )
  }
}

export default MemeGenerator;

/*<h2 className="top">top text</h2>
<h2 className="bottom">bottom text</h2>*/
