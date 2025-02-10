import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { SendNote } from 'src/app/inboxModule/modal/SendNote';
import { InboxService } from '../../inbox.service';
import { Receiver } from '../../modal/Receiver';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-notes',
  templateUrl: './send-notes.component.html',
  styleUrls: ['./send-notes.component.css']
})
export class SendNotesComponent implements OnInit {

  color: ThemePalette = 'primary';
  sendNote: SendNote = new SendNote();
  listOfSendNotes: SendNote[] = [];
  listOfReceivers: Receiver[] = [];
  intialListOfReceivers: Receiver[] = [];
  checked = false;
  disabled = false;
  receiver:Receiver = new Receiver;
  sendNotesForm!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredReceiver!: Observable<Receiver[]>;
  receiverControl = new FormControl();
  @ViewChild('receiverInput') receiverInput!: ElementRef<HTMLInputElement>;
  fruits: any;
  fruitCtrl: any;
  listOfReceiversCopy: Receiver[] =[];


  constructor(private formBuilder: FormBuilder, private restService: InboxService,
    private router: Router
    ) {
  }


  ngOnInit(): void {
    console.log("Init of send notes Calling send notes -> ")
    this.sendNotesForm = this.formBuilder.group({
      receiverName: ['', Validators.required],
      receiverDesignation: ['', Validators.required],
      content: ['', Validators.required],
      isUrgent: ['', Validators.required]
    })

    this.restService.fetchReceiverDropDown().subscribe((response) => {
      this.listOfReceivers = response;
      this.listOfReceiversCopy = response;
      console.log("drop down " + response);
      this.postIniatilize();
    })


  }



  sendNoteTo() {
    console.log("Init of send notes Calling send notes -> ")
    console.log(this.sendNotesForm.value);
    this.sendNote.isUrgent = this.sendNotesForm.value.isUrgent;
    this.sendNote.content = this.sendNotesForm.value.content;
    this.sendNote.receivers= this.intialListOfReceivers;
    this.sendNote.sendUserName='Nayana';
    // this.sendNote.sendUserName=window.sessionStorage.getItem('username');
    // this.intialListOfReceivers.forEach(element =>{
    //  // this.sendNote = Object.assign(this.sendNote, this.sendNotesForm.value)
      
    //   this.sendNote.receivers?.push(element);
    // })
   
    this.listOfSendNotes.push(this.sendNote);
    console.log(this.listOfReceivers)
    // const loginData = {
    //   email: "admin4",
    //   password: "1234",
    //   role:"Patient"
    //  }
    // window.sessionStorage.setItem("userdetails",JSON.stringify(loginData));
    this.restService.saveSendNotes(this.listOfSendNotes).subscribe((response) => {
      console.log(response);
      this.listOfSendNotes = [];
      this.router.navigate(['dashboard/sent-notes'])

    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      //this.listOfReceivers.push(event.value);
    }
  }

  remove(fruit: number): void {
    console.log(fruit)
    this.listOfReceivers.splice(fruit, 1)
    this.intialListOfReceivers.splice(fruit, 1)
  }

  displayFn(user: Receiver): string {
    // this.intialListOfReceivers.push(user);
    console.log("this is user "+user);
    //return "fakefirstName"+"-"+"fakedesignation";
    return user.firstName+"-"+user.designation;
  }

  selected(event: Receiver): void {
    console.log("event   "+event);
    const id = event.id;
    this.intialListOfReceivers.forEach(element =>{
      console.log("intialListOfReceivers   "+element.id);
    })
    if( this.intialListOfReceivers.length != 0 ) {
      console.log("lenfghkghrdjh"+((this.intialListOfReceivers.filter(fill => fill.id == id ).length)))
      if ((this.intialListOfReceivers.filter(fill => fill.id == id ).length == 0))
      {
        this.intialListOfReceivers.push(event);
      }
    }else
    {
      this.intialListOfReceivers.push(event);
    }
   
    
    this.receiverInput.nativeElement.value = '';
    this.receiverControl.setValue(null);
  }

  private _filter(value: Receiver) {
    const filterValue = value.firstName.toLowerCase();
    return this.listOfReceivers.filter(receiver => {
      receiver.firstName.toLowerCase().includes(filterValue)
    });

  }

  postIniatilize() {

    this.filteredReceiver = this.receiverControl.valueChanges.pipe(
      startWith(null),
      map((fruit: Receiver | null) => {
        console.log("lrngg"+this.intialListOfReceivers.length)
        if(this.intialListOfReceivers.length == 0)
        {
          this.listOfReceivers = this.listOfReceiversCopy;
        }
      return   (fruit ? this._filter(fruit) : this.listOfReceivers.slice())
      })
    );
  }
}
