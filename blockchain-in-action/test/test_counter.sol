pragma solidity ^0.6.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Counter.sol";

contract TestCounter {
    function testCounter() public {
        Counter a = new Counter();
        uint init_num = 456;
        a.initialize(init_num);
        Assert.equal(a.get(), init_num, "Init Num is 456.");
    }
}
