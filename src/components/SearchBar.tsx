import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    inputRoot: {
      color: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "green",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "red"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "purple"
      },
    },
    root: {
        "& $notchedOutline": {
          borderWidth: 0
        },
        "&:hover $notchedOutline": {
          borderWidth: 0
        },
        "&$focused $notchedOutline": {
          borderWidth: 0
        }
      },
      focused: {},
      notchedOutline: {}
  }));

var input = "NULL";
export function GetSearchBarText(){
    return input;
}

export default function SearchBar() {
    const classes = useStyles();
    return (
        <Autocomplete className="Search-bar"
            id="combo-box-demo"
            size="small"
            autoComplete
            autoHighlight
            autoSelect
            classes={{inputRoot: classes.inputRoot, root: classes.root}}
            onInputChange={(e,v,s) => input = v}
            options={pokemonList}
            getOptionLabel={(option: PokemonInfo) => option.name}
            style={{ width: 200}}
            renderInput={params => (
                <TextField {...params} 
                    label="Search"
                    classes={{root: classes.root}}
                    InputLabelProps={{style: {color: "whitesmoke"}}}
                    fullWidth
                    variant="outlined"
                />
            )}
        />
    )
}

interface PokemonInfo {
    name:   string;
}

const pokemonList = [
    {name:'Pikachu'},
    {name:'Bulbasaur'},
    {name:'Squirtle'},
    {name:'Charmander'},
    {name:'Pichu'},
    {name:'Ditto'},
];

/*
    nationalPokedexNum: number;
    artworkUrl:			string;
    type:				string;
    species:			string;
    height:				number;
    weight:				number;
    */