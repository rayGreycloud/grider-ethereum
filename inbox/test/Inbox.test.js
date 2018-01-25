const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// Create new instance of Web3
const provider = ganache.provider();
const web3 = new Web3(provider);
// Import compiled contract 
const { interface, bytecode } = require('../compile');

// Initialize 
let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // Get a list of all accounts 
  accounts = await web3.eth.getAccounts();

  // Use account to deploy contract 
    // tells web3 contract methods
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // tells web3 to deploy new copy of contract 
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    // tells web3 to send transaction to create contract
    .send({ from: accounts[0], gas: '1000000' }); 
    
    inbox.setProvider(provider); 
});

describe('Inbox', () => {
  it('should deploy a contract', () => {
    assert.ok(inbox.options.address);
  });
  
  it('should have a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  
  it('should change the message', async () => {
    newMessage = 'Hello';
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
