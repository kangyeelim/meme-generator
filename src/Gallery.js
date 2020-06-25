import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numOfMemes:0,
      memes:[],
      indexOfLast:0,
      hasMore:true
    }
    this.fetchData = this.fetchData.bind(this)
  }

  async componentDidMount() {
    const response = await fetch("https://api.imgflip.com/get_memes")
    const result = await response.json()
    var {memes} = result.data;
    var numOfMemes = memes.length
    console.log(numOfMemes);
    this.setState({numOfMemes:numOfMemes, memes:memes, indexOfLast:11});
  }

  fetchData() {
    console.log(this.state.memes.length);
    if (this.state.numOfMemes === this.state.indexOfLast - 1) {
      this.setState({hasMore:false});
    }
    var num = 0;
    if (this.state.numOfMemes >= this.state.indexOfLast - 1) {
      num = this.state.indexOfLast  + 10;
    } else {
      num = this.state.numOfMemes + 1 - this.state.indexOfLast;
    }
    this.setState({indexOfLast:num})
  }

  render() {
    const props = this.props;
    const items = this.state.memes.slice(0, this.state.indexOfLast).map(function(data) {
      return <img className="meme-img" key={data.id} src={data.url} onClick={() => {props.setImage(data.url); props.setTextBox(data.box_count)}}/>
    });
    return (
      <InfiniteScroll
      dataLength={this.state.memes.slice(0, this.state.indexOfLast).length} //This is important field to render the next data
      next={this.fetchData}
      hasMore={this.state.hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b>Yay! You have seen it all</b>
        </p>
      }>
      {items}
      </InfiniteScroll>
    )
  }
}

export default Gallery;
