var Counter = artifacts.require("Counter");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
    _deployer.deploy(Counter);
};
