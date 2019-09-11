import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// Services
import { ContractService } from '../services/contract.service';
import { UploadService} from '../services/upload.service';
type TransactionField = 'sendaddress' | 'amount';
type FormErrors = {[u in TransactionField]: string};
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  direction: string;
  address: string;
  amount: string;
  balance: string;
  success: boolean;
  compatible: boolean;
  transactionDone: boolean;
  error;
  uploadResponse = { status: '', message: '', filePath: '' };
  transactionForm: FormGroup;
  form: FormGroup;
  formErrors: FormErrors = {
    sendaddress: '',
    amount: '',
  };
  validationMessages = {
   sendaddress: {
   required: 'The send address is required ',
   pattern: 'that´s no looks like a valid address',
   minlength: 'a address must have much than 40 characters',

   },
   amount: {
     required: 'Need a amount to sent to address',
     pattern: 'Only support numbers',
   },
  };

// tslint:disable-next-line: no-shadowed-variable
  constructor(private frb: FormBuilder, private contract: ContractService, private upload: UploadService, private snackbar: MatSnackBar) {
   contract.seeAccountInfo().then((value: any) => {
      this.direction = value.originAccount;
      this.balance = value.balance;
    }).catch((error: any) => {
      console.log(error);
      contract.failure('Could\'t get the account data, please check if metamask is running correctly and refresh the page');
    });
  }

  ngOnInit() {
    this.buildForm();
    this.form = this.frb.group({
      file: ['']
    });
  }

  buildForm() {
    this.transactionForm = this.frb.group({
      sendaddress: ['', [
          Validators.required,
          Validators.minLength(42),
        ]
      ],
      amount : ['', [
          Validators.required,
          Validators.pattern(/^[+-]?\d+(\.\d+)?$/),
        ]
      ],
    });
    this.transactionForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  reset() {
    this.transactionForm.reset();
  }

  transferEth(e) {
    this.address = this.transactionForm.value.sendaddress;
    this.amount = this.transactionForm.value.amount;

    this.contract.trasnferEther(this.direction, this.address, this.amount).then((r) => {
      this.contract.succes();
// tslint:disable-next-line: no-shadowed-variable
    }).catch((e) => {
      this.contract.failure('Transaction failed');
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('file').value);

    this.upload.upload(formData , 1).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err,
    );
  }
  onValueChanged(data?: any) {
    if (!this.transactionForm) { return; }
    const form = this.transactionForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'sendaddress' || field === 'amount')) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }
}
