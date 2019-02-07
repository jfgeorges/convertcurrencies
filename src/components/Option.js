import React from "react";

class Option extends React.Component {
  render() {
    return <option value={this.props.currency}>{this.props.currency}</option>;
  }
}

export default Option;
