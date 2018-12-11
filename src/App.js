import React, { Component } from "react";
import TextArea from "./TextArea";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      endpoint: "http://127.0.0.1:8000",
      num:0
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    console.log("cdm")
    const socket = socketIOClient(endpoint);
    socket.on('num',data => this.setState({num:data}))
    socket.on("broadcast", data => {
      console.log("response "+JSON.stringify(data)+" "+data.content);
      let arr = [...this.state.response];
      arr[data.file] = data.content;
      this.setState({ response: arr });
    });
    
  }
  render() {
    const { response } = this.state;
    console.log(this.state);
    const display = this.state.response.map(elem => <textarea>{elem}</textarea>);
    console.log(display);
    return (
      <div style={{ textAlign: "center" }}>
        {
          this.state.response.map(elem => {
            return <textarea style={{width:'300px',height:'500px'}}value={elem}></textarea>
          })
        }
      </div>
    );
  }
}
export default App;