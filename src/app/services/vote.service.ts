import { Injectable } from '@angular/core'
import { Initiative } from '../models/initiative'
import Web3 from 'web3'

declare let require: any
declare let window: any
const tokenAbi = require('../../../truffle/build/contracts/Vote.json')

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private account: any = null
  private readonly web3: any
  private enable: any
  private contracts: any = {}

  constructor() {
    if (window.ethereum === undefined) {
      alert('Please install MetaMask')
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:7545')
      }
      console.log('transfer.service :: constructor :: window.ethereum')
      window.web3 = new Web3(window.ethereum)
      console.log('transfer.service :: constructor :: this.web3')
      console.log(this.web3)
      this.enable = this.enableMetaMaskAccount()
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false
    await new Promise(() => {
      enable = window.ethereum.enable()
    })
    return Promise.resolve(enable)
  }

  private async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start')
    if (!this.account) {
      this.account = await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth')
        console.log(window.web3.eth)
        window.web3.eth.getAccounts((err: any, retAccount: any) => {
          console.log('transfer.service :: getAccount: retAccount')
          console.log(retAccount)
          if (retAccount.length) {
            this.account = retAccount[0]
            resolve(this.account)
          } else {
            alert('transfer.service :: getAccount :: no accounts found.')
            reject('No accounts found.')
          }
          if (err) {
            alert('transfer.service :: getAccount :: error retrieving account')
            reject('Error retrieving account')
          }
        })
      }) as Promise<any>
    }
    return Promise.resolve(this.account)
  }

  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount()
    console.log('transfer.service :: getUserBalance :: account')
    console.log(account)
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function(err: any, balance: any) {
        console.log('transfer.service :: getUserBalance :: getBalance')
        console.log(balance)
        if (!err) {
          const retVal = {
            account: account,
            balance: balance
          }
          console.log('transfer.service :: getUserBalance :: getBalance :: retVal')
          console.log(retVal)
          resolve(retVal)
        } else {
          reject({ account: 'error', balance: 0 })
        }
      })
    }) as Promise<any>
  }

  public async getInitiatives(): Promise<Initiative[]> {
    const contract = require('@truffle/contract')
    const voteContract = contract(tokenAbi)
    let voteInstance: any
    let initiativesArray: Initiative[] = []
    voteContract.setProvider(this.web3)
    console.log(voteContract)
    return voteContract.deployed().then((instance: any) => {
      voteInstance = instance
      return voteInstance.initiativesCount()
    }).then((initiativesCount: number) => {
      for (let i = 0; i < initiativesCount; i++) {
        voteInstance.initiatives(i).then((initiative: Initiative) => {
          initiativesArray.push(initiative)
        })
      }
      console.log('LR - ', initiativesArray)
    })
  }
}
