import { LightningElement, api} from 'lwc';

export default class DisplayMappingHeader extends LightningElement {
    @api objectName;
    dataTableHeader;

    connectedCallback(){
        const sfObjectFieldTitle = `Salesforce ${this.objectName} Field`;
        this.dataTableHeader = ['Name', sfObjectFieldTitle,'Auto Overwrite', 'Auto Fill'];
    }



    

}