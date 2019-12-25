import React, { TextareaHTMLAttributes, useState } from 'react';
import './App.css';
import './scripts/pokemondbScraper'

import NavBar from './components/NavBar'
import Clickable from './components/Clickable'
import EssayForm from './components/EssayForm'
import TabPanel from './components/TabPanel'
import PokemonDisplay from './components/PokemonDisplay'

import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import SearchBar, { GetSearchBarText } from './components/SearchBar';


const App: React.FC = () => {
    const [isPrimary, setIsPrimary] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [searchText, setSearchText] = useState("");

    function handleStatusChange(status: boolean) {
      setIsPrimary(status);
    }
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setCurrentTab(newValue);
    };

    const something=(event: any)=> {
      if (event.keyCode === 13) {
          setSearchText(GetSearchBarText());
      }
    }
      return (
        <div className="App" 
            onKeyDown={(e) => {
              something(e);
            }}>
          <header className="App-header">

            <NavBar />
            <SearchBar />
            <Tabs className="Tabs"
              value={currentTab}  
              indicatorColor="primary"
              textColor="inherit"
              onChange={handleChange}
              centered
            >
              <Tab label="ITEM ONE"></Tab>
              <Tab label="ITEM TWO" />
              <Tab label="ITEM THREE"/>
            </Tabs>

            <Box className="Page-body">
              <TabPanel value={currentTab} index={0}>
                <PokemonDisplay pokeName={searchText} value={currentTab} index={0}/>
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <p>Test 2</p>
              </TabPanel>
              <TabPanel value={currentTab} index={2}>
                <p>Eric is gay btw</p>
              </TabPanel>
            </Box>

          </header>
        </div>
      );
}
/*
            <EssayForm buttonColor={isPrimary ? "default" : "inherit" } value="Rule #1"/>
            <EssayForm buttonColor={isPrimary ? "primary" : "secondary" } value="Rule #2"/>
            <Button onClick={() => handleStatusChange(!isPrimary)}>Hello World</Button>
*/

export default App;
