import { api, LightningElement, wire, track } from "lwc";
import getRecordsWithIds from "@salesforce/apex/GetSelectedRecords.getRecordsWithIds";

const recordColumns = ["Id", "Name", "Title"];
export default class GetRecords extends LightningElement {
  @api selectedRecordIds;
  @track hrefdata;

  @wire(getRecordsWithIds, { selectedRecordIds: "$selectedRecordIds" })
  records;

  exportToCSV() {
    const jsonRetrivedData = this.records["data"];
    const csvHeader = recordColumns;

    const csvSeperator = ",";
    const newLineCharacter = "\r\n";

    let csvContent;
    csvContent = "";
    csvContent += csvHeader.join(",");
    csvContent += newLineCharacter;

    console.log("csvContent 1", csvContent);
    console.log("json reocrds", jsonRetrivedData);
    for (let i = 0; i < jsonRetrivedData.length; i++) {
      let counter = 0;

      for (let column of recordColumns) {
        console.log("column", column);
        if (counter > 0) {
          csvContent += csvSeperator;
        }
        if (
          jsonRetrivedData[i][column] !== null &&
          jsonRetrivedData[i][column] !== undefined
        ) {
          csvContent += '"' + jsonRetrivedData[i][column] + '"';
        } else {
          csvContent += '""';
        }

        counter++;
      }
      csvContent += newLineCharacter;
    }

    console.log("csvContent", csvContent);
    this.hrefdata = "data:text/csv;charset=UTF-8," + encodeURI(csvContent);
  }
}