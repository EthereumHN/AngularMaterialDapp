import { Injectable, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

declare let require: any;
const Web3 = require('web3');
const tokenAbi = require('../../../../Contracts/build/contracts/Payment.json');
declare let window: any;
const contract = require('@truffle/contract');

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  private web3Provider: null;
  private contracts: {};
  public compatible: boolean;
  private accounts: string[];
  public accountsObservable = new Subject<string[]>();
  public success: boolean;
  constructor(private snackbar: MatSnackBar) {
    if (typeof window.web3 === 'undefined' || (typeof window.ethereum !== 'undefined')) {
      this.web3Provider = window.ethereum || window.web3;
      window.web3 = new Web3(this.web3Provider);
    } else {
      this.web3Provider = new Web3(new Web3.providers.HttpProvider('http://134.209.56.46:1919'));
      // Material use custom endpoint please change with your key.
      // if you are using linix or ganche cli maybe the port is  http://localhost:8545
      //   Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      //   this.web3Provider = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/Private_key'));
      // Change with your credentials as the test network and private key in infura.io
       }
     }





  seeAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase((err, account) => {
          if (account === true) {
            console.log('dondt work' + account);
            return reject({name: 'account'});
          } else {
            window.web3.eth.getBalance(account, (error, balance) => {
              if (balance !== null) {
                return resolve({
                  originAccount: account,
                  balance: (window.web3.utils.fromWei(balance, 'ether'))
                });
              } else {
                return reject({name: 'balance'});
              }
            });
          }
      });
    });
  }

   refreshAccounts() {

    window.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err === true) {
        console.warn('There was an error fetching your accounts.');
        console.log(err , accs);
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');

        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      console.log('ready');
   });
  }

  trasnferEther(originAccount, destinyAccount, amount) {
    const that = this;

    return new Promise((resolve, reject) => {
      const paymentContract = contract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);

      paymentContract.deployed().then((instance) => {
          return instance.nuevaTransaccion(
            destinyAccount,
            {
              from: originAccount,
              value: window.web3.utils.toWei(amount, 'ether')
            });
        }).then((status) => {
          if (status) {
            return resolve({status: true});
          }
        }).catch((error) => {
          console.log(error);

          return reject('Error transfering Ether');
        });
    });
  }



  failure(message: string) {
     this.snackbar.open(message, '' , {   duration: 3000
     });
  }

  succes() {
   this.snackbar.open('Transaction complete successfuly', '' , { duration: 300 } );
  }
}
