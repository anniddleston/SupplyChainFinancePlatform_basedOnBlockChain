const ReceivableAccounts = artifacts.require("ReceivableAccounts");

module.exports = function(deployer) {
  deployer.deploy(ReceivableAccounts,"admin");
};
