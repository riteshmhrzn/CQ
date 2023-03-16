import { LightningElement,track,api, wire} from 'lwc';
import getBook from '@salesforce/apex/BorrowBooks.getBook';
import searchBooks from '@salesforce/apex/BookController.searchBooks';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class BooksTile extends NavigationMixin(LightningElement) {
    @api recordId;
    // Navigation to Custom Tab
    navigateToBorrowerPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                //Name of any CustomTab. Visualforce tabs, web tabs, Lightning Pages, and Lightning Component tabs
                apiName: 'Books_Borrowed_Detail'
            },
        });
    }
    // pageniation
    totalbooks
    visiblebooks    
    @wire(searchBooks, {searchTerm: '$searchTerm'})
        wiredBook({error, data}){
        if(data){ 
            this.totalbooks = data
            console.log(this.totalbooks)
        }
        if(error){
            console.error(error)
        }
    }
    updatebookHandler(event){
        this.visiblebooks=[...event.detail.records]
        console.log(event.detail.records)
    }
    @track book;
    @track bookname;
    @track dateofissue;
    @track status;
    @track bookID;  
  status='Not Returned';
  dateofissue='';
  bookname='';
  name='';

          
        @track customFormModal = false; 

        handlebooknamechange(event){
            const book = event.target.value;           
            this.customFormModal = true;
            this.bookname= book;
        }
        
    
        customShowModalPopup(event) { 
          const id = event.target.value;           
            this.customFormModal = true;
            this.bookID= id;
        }
     
        customHideModalPopup() {    
            
            this.customFormModal = false;
        }

        // code for borrow book   
  
    handleNameChange(event) {
        this.bookname = event.target.value;
        //console.log("Book__c", this.rec.Book__c);
    }
    
    handleDOIChange(event) {
        this.dateofissue= event.target.value;
        //console.log("Date_of_Issue_B__c", this.rec.Date_of_Issue_B__c);
    }
    
    handleStsChange(event) {
        this.status = event.target.value;
        //console.log("Status__c", this.rec.Status__c);
    }
    

    handleClick() {
        getBook({ bookID : this.bookID, issueDate: this.dateofissue, stat:this.status  })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.book= '';
                    this.dateofissue = '';
                    this.status = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Book Borrowed Succesfully',
                            variant: 'success',
                        }),
                    );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Failed to Insert record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }

}
      

        

