import { LightningElement, track } from 'lwc';
import fieldMapping from '@salesforce/resourceUrl/field_mapping_converted_data';

export default class DisplayMappingConfigs extends LightningElement {
    @track jsonFieldMapping;
    objectNames;
    activeTab;
    columns;
    data;

    connectedCallback(){
        this.jsonFieldMapping = JSON.parse(this.getResource());
        this.objectNames = Object.keys(this.jsonFieldMapping);
        this.activeTab = this.objectNames[0];
        
    }

    getResource(){
        const request = new XMLHttpRequest();
        request.open("GET", fieldMapping, false);
        request.send();
        return request.responseText;
        }
    
    handleActive(event) {
        this.activeTab = event.target.label;
        this.columns = this.getColumns(this.activeTab);
        this.data = this.jsonFieldMapping[this.activeTab];

        console.log('activeTab changed');
        console.log('columns recalculated'); 
        console.log('data recalculated');
    }

    separateNamesInTab(activeTab){
        let headerIncludeObject = [];

        if(activeTab.includes("_")){
            headerIncludeObject = activeTab.split("_");
        } else {
            headerIncludeObject.push(activeTab);
        }

        headerIncludeObject = headerIncludeObject.map(
                    ele => ele.substring(0,1).toUpperCase() + ele.slice(1));

        console.log('headerIncludeObject',headerIncludeObject);                    
        return headerIncludeObject;
    }

    getColumns(activeTab){
        const objects = this.separateNamesInTab(activeTab);
        let columns = [
            {label:"Name", fieldName:"apollo_field_label"},
            {label:"Example", fieldName: 'example'},
        ];

        for (const obj of objects){
            const column = {};
            column.label = `Salesforce ${obj} Field`;
            column.fieldName = `${obj.toLowerCase()}_field_label`;
            columns.push(column);
        }

        columns.push(
            {label:'Auto Write', fieldName:'autowrite', type:'boolean'},
            {label:'Auto Fill', fieldName:'autofill', type:'boolean'}
        );

        return columns;
        
        console.log('columns',columns);
    }

}

