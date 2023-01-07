// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/console.sol";
import "./helpers/TestSetup.sol";
import "../src/AccountRecovery.sol";

contract AccountRecoveryTest is TestSetup {
    AccountRecovery internal accountRecovery;

    function setUp() public override {
        super.setUp();

        accountRecovery = new AccountRecovery();
    }

    function testBasicRecovery() public {
        // Test account creates a secret
        uint secretIdx = accountRecovery.createSecret("123");

        // New secret has no contacts yet
        AccountRecovery.Contact[] memory contacts = accountRecovery.contacts(secretIdx);
        assert(contacts.length == 0);

        // Test account adds Alice as a contact
        accountRecovery.addContact(secretIdx, "alice@fake_email.com", address(alice));

        // Test account's secret is not unlockable
        bool unlockable = accountRecovery.unlockable(secretIdx);
        assert(unlockable == false);

        // Test account attempts to unlock
        vm.expectRevert(bytes("Secret locked."));
        bool failedUnlockAttempt = accountRecovery.unlock(secretIdx);
        assert(failedUnlockAttempt == false);

        // Advance a block
        vm.roll(block.number + 1);

        // Alice approves the unlock
        vm.prank(address(alice));
        bool approval = accountRecovery.approve(secretIdx);
        assert(approval == true);

        // Non-owner can't unlock
        vm.prank(address(bob));
        vm.expectRevert(bytes("Only owner may unlock."));
        bool deniedApproval = accountRecovery.unlock(secretIdx);
        assert(deniedApproval == false);

        // Test account unlocks successfully
        bool successUnlockAttempt = accountRecovery.unlock(secretIdx);
        assert(successUnlockAttempt == true);

        // Test account can't unlock anymore
        vm.expectRevert(bytes("Secret locked."));
        bool failedAdvancedUnlockAttempt = accountRecovery.unlock(secretIdx);
        assert(failedAdvancedUnlockAttempt == false);

        // Advance a block
        vm.roll(block.number + 1);

        // Alice approves again
        vm.prank(address(alice));
        bool secondApproval = accountRecovery.approve(secretIdx);
        assert(secondApproval == true);

        // Test account unlocks successfully again
        bool successUnlockAttemptTwo = accountRecovery.unlock(secretIdx);
        assert(successUnlockAttemptTwo == true);
    }
}
