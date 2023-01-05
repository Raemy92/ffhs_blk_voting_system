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

  constructor() {
    if (window.ethereum === undefined) {
      alert('Please install MetaMask')
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:7545')
      }
      window.web3 = new Web3(window.ethereum)
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
    if (!this.account) {
      this.account = await new Promise((resolve, reject) => {
        window.web3.eth.getAccounts((err: any, retAccount: any) => {
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
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function(err: any, balance: any) {
        if (!err) {
          const retVal = {
            account: account,
            balance: balance
          }
          resolve(retVal)
        } else {
          reject({ account: 'error', balance: 0 })
        }
      })
    }) as Promise<any>
  }

  public async fetchInitiatives(): Promise<Initiative[]> {
    const contract = require('@truffle/contract')
    const voteContract = contract(tokenAbi)
    let voteInstance: any
    let initiativesArray: Initiative[] = []

    voteContract.setProvider(this.web3)
    return voteContract.deployed().then((instance: any) => {
      voteInstance = instance
      return voteInstance.initiativesCount()
    }).then((initiativesCount: number) => {
      for (let i = 1; i <= initiativesCount; i++) {
        voteInstance.initiatives(i).then((initiative: any) => {
          initiative.voteCountYes = initiative.voteCountYes.words[0]
          initiative.voteCountNo = initiative.voteCountNo.words[0]
          initiative.id = initiative.id.words[0]
          initiativesArray.push(initiative)
        })
      }
      return initiativesArray
    })
  }

  async vote(initiativeId: number, value: boolean) {
    const account = await this.getAccount()
    return new Promise((resolve, reject) => {
      const contract = require('@truffle/contract')
      const voteContract = contract(tokenAbi)

      voteContract.setProvider(this.web3)

      voteContract.deployed().then((instance: any) => {
        return instance.vote(
          initiativeId,
          value,
          { from: account }
        )
      }).then((status: any) => {
        if (status) {
          return resolve({ status: true })
        }
      }).catch((error: any) => {
        return reject(`vote.service error: ${error}`)
      })
    })
  }

}
