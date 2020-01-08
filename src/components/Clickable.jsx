import React, {Component} from 'react'
import Button from '@material-ui/core/Button'

class Clickable extends Component{
    state = {
        hasBeenClicked: false
    }

    simulateButtonClick(text){
        console.log(text);
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={() => this.simulateButtonClick("Poggers")}>Taco Button</Button>
            </div>
        );
    }
}


export default Clickable;