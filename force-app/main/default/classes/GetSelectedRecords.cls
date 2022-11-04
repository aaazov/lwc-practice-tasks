public with sharing class GetSelectedRecords {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRecordsWithIds(List<String> selectedRecordIds) {
        List<Contact> selectedRecords = [SELECT Id, Name, Title
                            FROM Contact
                            WHERE Id IN :selectedRecordIds
                            LIMIT 20];
        system.debug('selectedRecords:' + selectedRecords);
        return selectedRecords;
    }
}