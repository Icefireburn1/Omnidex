import $ from 'jquery'

export default class Pokemon {
    constructor(name,nationalPokedexNum,artworkUrl,type,species,height,weight,description)
    {
        this.name = name;
        this.nationalPokedexNum = nationalPokedexNum;
        this.artworkUrl = artworkUrl;
        this.type = type;
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.description = description;
    }

    async getWebsiteHTML(webUrl)
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

    // Try to check for unuseful results due to webpage changes
    checkForFaultyResults()
    {
        if (isNaN(this.nationalPokedexNum))
            console.log("Error: National Pokedex Number is NaN");
    }

    parseWebpage(pageSource)
    {
        try {
            var divHtml = $('<div>', {html:pageSource});
            var tableHtml = $('<table>', {html:pageSource});
            var tableStr = tableHtml.find('.vitals-table');

            this.name =	tableHtml.find('title')[0].innerHTML.replace(/ .*/,'');
            this.nationalPokedexNum = parseInt(tableStr.find('td')[0].textContent);
            this.artworkUrl = divHtml.find('.tabs-panel-list').find('img')[0].src;
            this.type = tableStr.find('td')[1].textContent;
            this.species = tableStr.find('td')[2].textContent;
            this.height = tableStr.find('td')[3].textContent;
            this.weight = tableStr.find('td')[4].textContent;
            this.description = tableStr.find('td')[44].textContent // This is currently bugged for some pokemon

            // There is a chance a pokemon has 2 pages, so we have to check for that
            // If it does have 2 pages, we will get the pokemon's weight instead
            if (this.description.includes("kg") && this.description.includes("lb"))
                this.description = tableStr.find('td')[86].textContent; 

            // Check for inconclusive results
            this.checkForFaultyResults();
        }
        catch(err) {
            if (err.name === TypeError.name)
                console.log("Element not found. Does the element location need to be updated?\n" + err)
            else
                console.log(err);
        }
    }

    async getPokemonObject(newName) {
        await this.getWebsiteHTML("https://pokemondb.net/pokedex/" + newName).then(data => this.parseWebpage(data)).catch(err => console.log("Tried to search for a nonexisting Pokemon"));
        return new Pokemon(this.name,this.nationalPokedexNum,this.artworkUrl,this.type,this.species,this.height,this.weight,this.description);
     }
}