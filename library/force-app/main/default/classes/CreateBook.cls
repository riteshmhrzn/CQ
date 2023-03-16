public with sharing class CreateBook {
    @AuraEnabled
    public static Book__c[] addBook(Book__c[] b){
        try {
                insert b;
                return b;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}