public with sharing class BorrowBooks {
    @AuraEnabled
    public static Borrower__c getBook(string bookID, Date issueDate, String stat){
        try {
            Borrower__c b = new Borrower__c();
            b.Book__c = bookID;
            b.Date_of_Issue_B__c=issueDate;
            b.Status__c='Not Returned';
                insert b;
                return b;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}