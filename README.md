# FfhsBlkVotingSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Description
This project serves as a proof-of-concept for a e-voting system based on the Ethereum blockchain. It has very basic function, no security or whatsoever but it shows that the possibility to create a secure, transparent and anonymoous e-voting platform, exists.

The project was created as part of a term paper in the module "Blockchain" at the FFHS in the B.Sc. Computer Science program. 

## Prerequisites
1. Install Ganache (https://trufflesuite.com/ganache/)
   1. Create a new Ethereum workspace
      1. Name: be creative :)
      2. Hostname: Choose your localhost (127.0.0.1)
      3. Port: 7545
      4. Others can be left with default values
   2. There should be some test accounts now
2. Install MetaMask extension for your Browser (https://metamask.io)
   1. click on import wallet
   2. copy your 12-word MNEMONIC from Ganache and insert them in Metamask
   3. Choose your password and click "import"
   4. Open Metamask extension and open the networks-dropdown
   5. click on "add network" -> manual
      1. name: choose something
      2. RPC-URL: http://127.0.0.1:7545
      3. Chain ID: enter something, it will tell you the correct ID to enter
      4. Currency symbol: ETH
   6. You should now see your first Account with the same amount of ETH as in Ganache.
3. git clone this project
4. Install Node (https://nodejs.org/en/) and npm if not already installed on your computer 

## Installation
This project runs on Node version 16. Use Node Version Manager (https://github.com/nvm-sh/nvm) to change the version
``nvm install 16.13.2 && nvm use 16.13.2``

cd inside the cloned Repository and run ``npm install`` to install all the dependencies.

Run ``npm run start --open`` to start the application. You find further information on the home-page.

## Troubleshooting
If there are some problems with the contracts, check if the ``/truffle/build/contracts`` folder is not empty.

Try to recompile the contracts:
1. ``cd truffle``
2. ``truffle compile``
3. ``truffle migrate --network development``

## Kudos:
- https://github.com/IamLucif3r/VoteChain
- https://github.com/cliffoo/trufflesuite-reprod/tree/truffle%234618

## Contact
laurent.raemy@students.ffhs.ch
