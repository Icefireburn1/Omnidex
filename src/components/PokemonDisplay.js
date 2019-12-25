import React, {setState, useEffect} from 'react';
import $ from 'jquery'
import Button from '@material-ui/core/Button'

class PokemonDisplay extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            value: "",
            pokemon: {
                name:				"",
                nationalPokedexNum: -1,
                artworkUrl:			"",
                type:				"",
                species:			"",
                height:				"",
                weight:				""
            }
        }
        this.CreatePokemonObject = this.CreatePokemonObject.bind(this);
        this.GetWebsiteHTML = this.GetWebsiteHTML.bind(this);
        this.StartScrape = this.StartScrape.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async GetWebsiteHTML(webUrl)
     {
        var result = await $.ajax({ 
            url: webUrl,
            statusCode: {
                404: function() {
                    console.log("URL returned 404, does the pokemon/website exist?");
                }
            },
            success: function(data) {  result = data; },
            error: function(xhr) { console.log('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText); },
        });
         return result;
     }

    
    CreatePokemonObject(pageSource)
     {
         var divHtml = $('<div>', {html:pageSource});
         var tableHtml = $('<table>', {html:pageSource});
         var tableStr = tableHtml.find('.vitals-table');
    
        var loadedPokemon = {
            name:				tableHtml.find('title')[0].innerHTML.replace(/ .*/,''),
            nationalPokedexNum: parseInt(tableStr.find('td')[0].textContent),
            artworkUrl:			divHtml.find('.tabs-panel-list').find('img')[0].src,
            type:				tableStr.find('td')[1].textContent,
            species:			tableStr.find('td')[2].textContent,
            height:				tableStr.find('td')[3].textContent,
            weight:				tableStr.find('td')[4].textContent
        };
        this.setState({pokemon: loadedPokemon});
        console.log(this.state.pokemon);
     }

     StartScrape(newName) {
        this.GetWebsiteHTML("https://pokemondb.net/pokedex/" + this.props.pokeName).then(data => this.CreatePokemonObject(data)).catch(err => console.log("Not a pokemon"));
     }
    
    

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.pokeName !== prevProps.pokeName) {
            this.StartScrape(this.props.pokeName);
        }
      }

    componentDidMount() {
        if (this.props.pokeName !== "") {
            this.StartScrape(this.props.pokeName);
            console.log("why in trouble?");
        }
            
    }


    render (){
        return (
            <div>
                {this.state.pokemon.name !== "" && 
                (
                <div>
                    <img id="pokemonBigPic" src={this.state.pokemon.artworkUrl}/>
                    <p>Name: {this.state.pokemon.name}</p>
                    <p>Pokedex #: {this.state.pokemon.nationalPokedexNum}</p>
                    <p>Type: {this.state.pokemon.type}</p>
                    <p>Species: {this.state.pokemon.species}</p>
                    <p>Height: {this.state.pokemon.height}</p>
                    <p>Weight: {this.state.pokemon.weight}</p>
                </div>)}
            </div>

        )
    }
}

export default PokemonDisplay