pragma solidity ^0.5.4;

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
    addInitiative("Gegen alles, für nichts!", "Extrem sinnbefreite Initiative, Annahme empfohlen.");
    addInitiative("Gegen schwarze Schafe in der CH", "Schwarze Schafe sollen bei Annahme sofort weiss gefärbt werden.");
    addInitiative("Senslerdeutsch als offizielle Landessprache", "Das Senslerdeutsch soll als einzige und offizielle Amtssprache der Schweiz eingeführt werden, hui!");
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
