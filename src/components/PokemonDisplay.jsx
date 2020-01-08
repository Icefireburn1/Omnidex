import React, {setState, useEffect} from 'react';
import $ from 'jquery'
import Pokemon from '../scripts/pokemon'

class PokemonDisplay extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            value: "",
            pokemon: new Pokemon("","","","","","","",""),
        }

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    // This catches when properties change
    componentDidUpdate(prevProps) {
        if (this.props.pokeName !== prevProps.pokeName) {
            this.state.pokemon.getPokemonObject(this.props.pokeName).then(data => this.setState({pokemon: data}));
        }
      }

    // This runs when DOM is available
    componentDidMount() {
        if (this.props.pokeName !== "") {
            // Check if pokemon is in JSON file here

            // If not in JSON, pull from website then write to JSON
            this.state.pokemon.getPokemonObject(this.props.pokeName).then(data => this.setState({pokemon: data}));
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
                    <p>Description: {this.state.pokemon.description}</p>
                </div>)}
            </div>

        )
    }
}

export default PokemonDisplay