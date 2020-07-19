import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <button className={this.props.value} onClick={() => alert('funciona')}>{this.props.value}</button>
    );
  }
}

export default Button;
