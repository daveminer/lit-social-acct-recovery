// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/console.sol";
import "forge-std/Test.sol";

abstract contract TestSetup is Test {
    address payable[] internal users;
    address internal owner;
    address internal alice;
    address internal bob;
    address internal carol;

    // Used to build test user wallet addresses
    bytes32 internal nextUser = keccak256(abi.encodePacked("user address"));

    function setUp() public virtual {
        // Account setup
        users = createUsers(3);

        alice = users[0];
        vm.label(alice, "Alice");

        bob = users[1];
        vm.label(bob, "Bob");

        carol = users[2];
        vm.label(carol, "Carol");
    }

    function getNextUserAddress() external returns (address payable) {
        address payable user = payable(address(uint160(uint256(nextUser))));
        nextUser = keccak256(abi.encodePacked(nextUser));
        return user;
    }

    // create users with 100 ETH balance each
    function createUsers(uint256 userNum)
        internal
        returns (address payable[] memory)
    {
        address payable[] memory testUsers = new address payable[](userNum);
        for (uint256 i = 0; i < userNum; i++) {
            address payable user = this.getNextUserAddress();
            vm.deal(user, 100 ether);
            testUsers[i] = user;
        }

        return testUsers;
    }
}
