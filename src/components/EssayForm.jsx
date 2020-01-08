import React, { TextareaHTMLAttributes } from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const styles = {
  button: {
    
  },
};

class EssayForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        initialValue: this.props.value,
        value: 'Default',
        buttonColor: "primary"
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

//    handleChange(event) {
//      this.setState({value: event.target.value});
//    }
    handleChange(event) {
      this.setState({initialValue: this.state.initialValue += this.state.value});
    }
  
    handleSubmit(event) {
      //alert('An essay was submitted: ' + this.state.value);
      this.setState({initialValue: this.state.initialValue += this.state.value});
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Essay:
            <textarea value={this.state.initialValue} onChange={this.handleChange} />
          </label>
          <Button onClick={() => this.handleSubmit()} variant="contained" color={this.props.buttonColor} style={styles}>Submit</Button>
        </form>
      );
    }
  }

  

  export default EssayForm