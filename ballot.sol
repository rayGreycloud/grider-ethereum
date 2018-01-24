pragma solidity ^0.4.17;

contract Inbox {
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    // Duplicates message() function automatically generated
    // by public variable declaration 
    function getMessage() public view returns (string) {
        return message;
    }
}