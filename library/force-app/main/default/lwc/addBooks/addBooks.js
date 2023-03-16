import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import Book_OBJECT from '@salesforce/schema/Book__c';
import BOOKNAME_FIELD from '@salesforce/schema/Book__c.Name';
import AUTHOR_FIELD from '@salesforce/schema/Book__c.Author__c';
import QUANTITY_FIELD from '@salesforce/schema/Book__c.Quantity__c';
import IMAGEURL_FIELD from '@salesforce/schema/Book__c.Image_URL__c';
import createAccount from '@salesforce/apex/createBook.addBook';

export default class CreateAccountRecord extends LightningElement {
    objectApiName=Book_OBJECT;
    fields = [BOOKNAME_FIELD,AUTHOR_FIELD,QUANTITY_FIELD,IMAGEURL_FIELD];
    add= false;
    handleAddBook(){
        this.add = true;
        }

    handleSuccess(event){
        const toastEvent=new ShowToastEvent({
            title:"New book added successfully !",
            message: "New book added ",
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
       }, 1000);
    }
    handleCancel() {    
            
        this.add = false;
    }

}