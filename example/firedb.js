

import ModalTable from '../js/modalTable.js'

import JsonMapDatasource from "../js/JsonDataSource.js"

// Write a config for your json track and call it XXXTrackDatasourceConfig.js
import { jsonTrackDatasourceConfigurator } from  '../js/jsonTrackDatasourceConfig.js'


const jsonModalConfig =
    {
        id: "jsonModal",
        title: "JSON Modal",
        pageLength: 100,
        selectionStyle: 'multi',
        selectHandler: selectionList => {
            console.log(selectionList)
        }
    }

const jsonModal = new ModalTable(jsonModalConfig)


// Update the modal with a new datasource on genome change.  Setting the datasource will clear the modal,
// causing the data table to be rebuilt opon opening
$("#genome-select").change(function (e) {

    $("#genome-select option:selected").each(function () {

        const genomeId = this.value
        const datasource = new JsonMapDatasource(jsonTrackDatasourceConfigurator(genomeId))
        jsonModal.setDatasource(datasource)

    })

})

