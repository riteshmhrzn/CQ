public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks() {
        return [
            SELECT Name,Book_Id__c, Author__c ,Avalibility__c,Image_URL__c,Description__c
            FROM Book__c
            WITH SECURITY_ENFORCED
        ];
       
    }
    @AuraEnabled(Cacheable=true)
    public static List<Book__c> searchBooks(String searchTerm) {
        // Return all bears when no search term
        if (searchTerm == '') {
            return getBooks();
        }
        // Prepare query paramters
        searchTerm = '%'+ searchTerm +'%';
        // Execute search query
        return [
            SELECT Name,Book_Id__c, Author__c ,Avalibility__c,Image_URL__c,Description__c
            FROM Book__c WHERE Name LIKE : searchTerm  
            WITH SECURITY_ENFORCED
        ];
    }
    @AuraEnabled(Cacheable=true)
    public static List<Book__c> getBooksById(String viewId) {
        if (viewId== ''){
            return null;
        }
        else{
        return [
            SELECT Name,Book_Id__c, Author__c ,Avalibility__c,Image_URL__c,Description__c
            FROM Book__c WHERE Id=:viewId
            WITH SECURITY_ENFORCED
        ];
    }}
}
