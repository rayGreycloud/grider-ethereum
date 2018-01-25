const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// Create new instance of Web3
const web3 = new Web3(ganache.provider());
// Import compiled contract 
const { interface, bytecode } = require('../compile');

// Initialize 
let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts 
  accounts = await web3.eth.getAccounts();

  // Use account to deploy contract 
    // tells web3 contract methods
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // tells web3 to deploy new copy of contract 
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    // tells web3 to send transaction to create contract
    .send({ from: accounts[0], gas: '1000000' });  
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
});
