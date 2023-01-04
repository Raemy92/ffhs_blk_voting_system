pragma solidity ^0.8.17;

contract Migrations {
  address public owner;
  uint public lastCompletedMigration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor () public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public {
    lastCompletedMigration = completed;
  }

  function upgrade(address newAddress) public {
    Migrations upgraded = Migrations(newAddress);
    upgraded.setCompleted(lastCompletedMigration);
  }
}
