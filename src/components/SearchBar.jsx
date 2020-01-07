import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles, createStyles, fade, withStyles, Input } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';
import { relative } from 'path';
import $ from 'jquery'

var input = "NULL";
export function GetSearchBarText(){
    return input;
}

const classes = makeStyles((theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }),
);

const CssSearchBar = withStyles({
  root: {
    backgroundColor: "#212121",
    '& .MuiAutocomplete-input': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
      borderColor: '#080808',
      opacity: 0,
      },
      '&:hover fieldset': {
      borderColor: 'white',
        },
      '&.Mui-focused fieldset': {
        borderColor: '#5e0000',
      },
    },
  },
})(Autocomplete);

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pokemonList: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.GetNationalPokedexList();
  }

  render() {
    return (
      <CssSearchBar className="Search-bar"
          id="combo-box-demo"
          onInputChange={(e,v,s) => input = v}
          options={this.state.pokemonList}
          className={{root: classes}}
          getOptionLabel={(option) => option}
          renderInput={params => (
              <TextField {...params}
                  label="Search"
                  size="small"
                  variant="outlined"
                  margin='dense'
                  fullWidth
              />
          )}
      />
    )
  }

  async GetWebsiteHTML(webUrl)
  {
     var result = await $.ajax({ 
         url: webUrl,
         statusCode: {
             404: function() {
                 console.log("URL returned 404, website exist?");
             }
         },
         success: function(data) {  result = data; },
         error: function(xhr) { console.log('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText); },
     });
      return result;
  }

   ParseWebpage(pageSource)
  {
    try {
        var divHtml = $('<div>', {html:pageSource});     
        var localPokemonList = [];

        divHtml.find('.ent-name').each(function( i ) {
          localPokemonList.push(this.textContent);
        });

        this.setState({pokemonList: localPokemonList});
    }
    catch(err) {
        if (err.name === TypeError.name)
            console.log("Element not found. Does the element location need to be updated?\n" + err)
        else
            console.log(err);
    }
  }

  async GetNationalPokedexList(){
    await this.GetWebsiteHTML('https://pokemondb.net/pokedex/national').then(data => this.ParseWebpage(data)).catch(err => console.log(err));
  }
}
export default SearchBar

/*
export default function SearchBar(props){
  const classes = useStyles();
    return (
      <CssSearchBar className="Search-bar"
          id="combo-box-demo"
          onInputChange={(e,v,s) => input = v}
          options={pokemonList}
          className={{root: classes}}
          getOptionLabel={(option) => option.name}
          renderInput={params => (
              <TextField {...params}
                  label="Search"
                  size="small"
                  variant="outlined"
                  margin='dense'
                  fullWidth
              />
          )}
      />
    )
}
*/