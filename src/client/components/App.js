import React from 'react';

class App extends React.Component {
  constructor (props) {
    super();
    this.state = { renderMsg: "This was rendered on the server!", peopleList: props.peopleList}

    /* Uncomment the lines below to see how React 'reacts' when the
    client tries to overwrite the server rendered data on it's intital state.
    The clients initial state must match up with the servers rendered
    state of the component. (Check Web Console)*/

    // if (typeof window != 'undefined') {
    //   this.state.renderMsg = "Uh oh! The client and server initial renders didn't match up!";
    // }
  }
  componentWillMount() { //This lifecycle method does initialize on the server side renderToString() method and on the client side.
    console.log("Will I ever mount?");
  }
  componentDidMount() {
    //This lifecycle method won't get called server side. On the client however, react
    //will notice the component already on the page and then only mount it to it's virtual DOM if the state has not changed.
    console.log("Look ma' I mounted!");
  }
  handleClick(e) {
    //Events can still be registered on pre-rendered components from the server.
    this.setState((previousState) => {
      let peopleList = previousState.peopleList;
      if (peopleList.length > 0) peopleList.pop();
      previousState.renderMsg = "This was rendered safely on the client!";
      return previousState;
    });
  }
  render() {
    //If the state is the same on the client as it was when rendered on the server, it will not rerender the component.
    //However, the render method will still get called in order to compare states, but will not manipulate the DOM if there is no change.
    let people = this.state.peopleList.map((person, i) => {
      return (
        <Person key={i} personInfo={person} />
      );
    });
    return (
      <div>
        {people}
        <div>{this.state.renderMsg}</div>
        <button onClick={this.handleClick.bind(this)}>Remove a Person!</button> {/*React no longer auto binds when written in ES6 classes */}
      </div>
    );
  }
}

const Person = ({personInfo}) => { //Stateless component as function
  return (
    <div>
      Name: {personInfo.Name}
      <br />
      Age: {personInfo.Age}
    </div>
  );
}

export default App;
