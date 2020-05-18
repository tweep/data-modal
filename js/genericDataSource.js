class GenericMapDatasource {

    constructor(config) {

        this.isJSON = config.isJSON || false;

        if (config.genomeId) {
            this.genomeId = config.genomeId;
        }

        if (config.dataSetPathPrefix) {
            this.dataSetPathPrefix = config.dataSetPathPrefix;
        }

        if (config.urlPrefix) {
            this.urlPrefix = config.urlPrefix;
        }

        if (config.dataSetPath) {
            this.path = config.dataSetPath;
        }

        this.addIndexColumn = config.addIndexColumn || false;

        this.columnDictionary = {};

        for (let column of config.columns) {
            this.columnDictionary[ column ] = column;
        }

        if (config.hiddenColumns) {

            this.columnDefs = [];
            for (let column of config.hiddenColumns) {
                this.columnDefs.push({ visible: false, searchable: false, targets: [ Object.keys(this.columnDictionary).indexOf(column) ] })
            }

        } else {
            this.columnDefs = undefined
        }

        if (config.parser) {
            this.parser = config.parser;
        }

        if (config.selectionHandler) {
            this.selectionHandler = config.selectionHandler;
        }

    }

    async tableColumns() {
        return Object.keys(this.columnDictionary);
    }

    async tableData() {

        let response = undefined;

        try {
            response = await fetch(this.path);
        } catch (e) {
            console.error(e)
            return undefined;
        }

        if (response) {

            if (true === this.isJSON) {
                const obj = await response.json();
                return this.parser(obj, this.columnDictionary, this.addIndexColumn);
            } else {
                const str = await response.text();
                return this.parser(str, this.columnDictionary, this.addIndexColumn);
            }
        }
    }

    tableSelectionHandler(selectionList) {
        return this.selectionHandler(selectionList);
    };

}

export default GenericMapDatasource
