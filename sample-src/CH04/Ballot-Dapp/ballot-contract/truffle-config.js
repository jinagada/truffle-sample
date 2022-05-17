module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      // network_id: "5777", // Error: The network id specified in the truffle config (5777) does not match the one returned by the network (1652771118094).  Ensure that both the network and the provider are properly configured.
      network_id: "1337",
      gas: 4600000
    }
  },
  compilers: {
    solc: {
      version: "^0.6.2"
    }
  },
};
