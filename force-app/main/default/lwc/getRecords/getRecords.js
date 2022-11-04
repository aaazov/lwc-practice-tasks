import { api, LightningElement, wire} from "lwc";
import getRecordsWithIds from "@salesforce/apex/GetSelectedRecords.getRecordsWithIds";


export default class GetRecords extends LightningElement {
  @api selectedRecordIds;

  @wire(getRecordsWithIds, { selectedRecordIds: "$selectedRecordIds" })
  records;
}