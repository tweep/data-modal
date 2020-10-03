import GenericMapDatasource from './genericDataSource.js'

class JsonMapDatasource extends GenericMapDatasource {


    constructor(config) {

        super(config)

        if (config.filter) {
            this.filter = config.filter
        }

        // default suffix for Json data source is '.json'
        this.suffix = config.suffix || '.json'
        this.isJSON = true

    }

    /* Overwrite the GenericMapDataSource tableData() method 
        so we make it species/assembly specific
    */

    async tableData() {

        let response = undefined;

        try {
            // Define where the data is pulled 
            const url = `${ this.urlPrefix }${ canonicalId(this.genomeId) }${ this.suffix }`
            response = await fetch(url);
        } catch (e) {
            console.error(e)
            return undefined;
        }

        if (response) {

            if (true === this.isJSON) {
                const obj = await response.json();
                return this.parser(obj, this.columnDictionary, this.addIndexColumn);
            } else {
                // throw error here 
                const str = await response.text();
                return this.parser(str, this.columnDictionary, this.addIndexColumn);
            }
        }
   }
}

function canonicalId(genomeId) {

    switch(genomeId) {
        case "hg38":
            return "GRCh38"
        case "CRCh37":
            return "hg19"
        case "GRCm38":
            return "mm10"
        case "NCBI37":
            return "mm9"
        case "WBcel235":
            return "ce11"
        case "WS220":
            return "ce10"
        default:
            return genomeId
    }

}

export default JsonMapDatasource
