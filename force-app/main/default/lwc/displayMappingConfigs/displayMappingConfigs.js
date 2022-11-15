import { api, LightningElement, track } from 'lwc';
import fieldMapping from '@salesforce/resourceUrl/field_mapping_converted_data';

export default class DisplayMappingConfigs extends LightningElement {
    @track jsonFieldMapping;
    objectNames;
    activeTab;
    tableHeader;

    connectedCallback(){
        this.jsonFieldMapping = JSON.parse(this.getResource());
        this.objectNames = Object.keys(this.jsonFieldMapping);
        this.activeTab = this.objectNames[0];
        this.getTableHeader(this.activeTab);
    }

    getResource(){
        const request = new XMLHttpRequest();
        request.open("GET", fieldMapping, false);
        request.send();
        return request.responseText;
    }
    
    getTableHeader(tabName){
        const sfObjectFieldTitle = `Salesforce ${tabName} Field`;
        this.tableHeader = ['Name', 'Example', sfObjectFieldTitle,'Auto Overwrite', 'Auto Fill'];
    }


    handleActive(event) {
        this.activeTab = event.target.label;
        this.getTableHeader(this.activeTab);
    }


}

