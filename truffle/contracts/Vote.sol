pragma solidity ^0.8.17;

contract Vote {

  struct Initiative {
    uint id;
    string title;
    string description;
    uint voteCountYes;
    uint voteCountNo;
  }

  mapping(address => bool) public voters;
  mapping(uint => Initiative) public initiatives;
  uint public initiativesCount;
  event votedEvent (
    uint indexed _initiativeId
  );

  constructor () public {
    addInitiative("Gegen alles\x2C f\xC3\xBCr nichts\x21", "Extrem sinnbefreite Initiative\x2C Annahme empfohlen\x2E");
    addInitiative("Gegen schwarze Schafe in der CH", "Schwarze Schafe sollen bei Annahme sofort weiss gef\xC3\xA4rbt werden\x2E");
    addInitiative("Senslerdeutsch als offizielle Landessprache", "Das Senslerdeutsch soll als einzige und offizielle Amtssprache der Schweiz eingef\xC3\xBChrt werden\x2C hui\x21");
  }

  function addInitiative (string memory title, string memory description) private {
    initiativesCount ++;
    initiatives[initiativesCount] = Initiative(initiativesCount, title, description, 0, 0);
  }

  function vote (uint _initiativeId, bool hasVotedYes) public {
    require(!voters[msg.sender]);
    require(_initiativeId > 0);
    voters[msg.sender] = true;
    if (hasVotedYes == true) {
      initiatives[_initiativeId].voteCountYes ++;
    } else {
      initiatives[_initiativeId].voteCountNo ++;
    }
    emit votedEvent(_initiativeId);
  }
}
