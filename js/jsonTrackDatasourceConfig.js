
const jsonTrackDatasourceConfigurator = genomeId => {

     // A json file track should follow the naming convention : <assemblyName>.json
     // and should always be in JSON format. Example format: 
     //  https://tweep-igv-data-modal.s3-us-west-2.amazonaws.com/GRCh38.json

    return {
        genomeId,
        suffix: '.json',
        //urlPrefix: 'http://sc1lvbcbjnk1.sc1.roche.com:10080/firedb/',
        urlPrefix: 'https://tweep-igv-data-modal.s3-us-west-2.amazonaws.com/',

        // the proxy the address of a file server which feeds the bam/bigwigs from local disk
        proxy: 'http://my-file-server.com/',
        addIndexColumn: true,

        columns:
            [
                'FDB ID',
                'FRS ID',
                'Study',
                'Origin',
                'Sample ID',
                'Data type',
                'Assay type',
 //              'author',
                'journal',
//                'year',
//                'organism',
//               'reference genome',
                'cell type',
                'protocol'
            ],
        hiddenColumns:
            [
              // 'index',
              // 'url'
            ],
        parser,
        selectionHandler: undefined
    }

}

const parser = (obj, columnDictionary, addIndexColumn, proxy ) => {

    return Object.entries(obj).map(([ path, record ], i) => {

        const cooked = {};
        Object.assign(cooked, record);

        for (let key of Object.keys(columnDictionary)) {
            cooked[ key ] = cooked[ key ] || '-';
        }

        const output = {};
        Object.assign(output, cooked);

        //output['url'] = '-' === cooked[ 'NVI' ] ? `${ path }` : `${ path }?nvi=${ cooked[ 'NVI' ] }`;
        //output['url'] =  'http://sc1lvbcbjnk1.sc1.roche.com:10080' + `${ cooked[ 'NVI' ] }`;

        // create the url out ouf our proxy add and the uri of the file
        output['url'] =  proxy + `${ cooked[ 'uri' ] }`;


        if (true === addIndexColumn) {
            output['index'] = i;
        }

        return output;
    });

};

export { jsonTrackDatasourceConfigurator }
