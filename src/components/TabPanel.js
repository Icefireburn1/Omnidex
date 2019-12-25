import React from 'react';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

class TabPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            index: 0,
            value: "",
            children: React.ReactNode
        }
    }


    render() {
        return(
            <div>{this.props.value === this.props.index && <Box p={3}>{this.props.children}</Box>}</div>
        )

    }
}

export default TabPanel