// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/console.sol";

contract AccountRecovery {
    struct Secret {
        address owner;
        string cid;
        uint lastUnlockedAtBlock;
        Contact[] contacts;
    }

    struct Contact {
        address account;
        string email;
        uint lastApprovalBlock;
    }

    //event SecretCreated(uint indexed id)
    //event SecretUnlocked(uint indexed id);

    // Mapping of addresses to their balances from fallback function
    mapping(address => uint) balance;

    mapping(address => uint[]) public secretOwners;

    Secret[] public secrets;

    function createSecret(string memory _secretCid) public  returns (uint) {
        secretOwners[msg.sender].push(secrets.length);

        Secret storage secret = secrets.push();
        secret.owner = msg.sender;
        secret.cid = _secretCid;
        secret.lastUnlockedAtBlock = 0;

        return secrets.length - 1;
    }

    function addContact(uint _secretIndex, string memory _email, address _account) public {
        Secret storage secret = secrets[_secretIndex];

        require(secret.owner == msg.sender, "Only secret owner may update.");
        require(secret.contacts.length < 3, "Maximum contacts reached.");

        Contact memory new_contact = Contact({
            account: _account,
            email: _email,
            lastApprovalBlock: 0
        });
        secret.contacts.push(new_contact);
    }

    function contacts(uint _secretIndex) public view returns (Contact[] memory) {
        Secret memory secret = secrets[_secretIndex];
        return secret.contacts;
    }

    function removeContact(uint _secretIndex, string memory _email) public {
        Secret storage secret = secrets[_secretIndex];

        require(secret.owner == msg.sender, "Only secret owner may update.");

        bool contactDeleted = false;
        for (uint i = 0; i < secret.contacts.length; i++) {
            if (contactDeleted == true) {
                secret.contacts[i-1] = secret.contacts[i];
            }

            if (strEq(secret.contacts[i].email, _email)) {
                delete secret.contacts[i];
                contactDeleted = true;
            }
        }

        secret.contacts.pop();
    }


    function approve(uint _secretIndex) public returns (bool) {
        Secret storage secret = secrets[_secretIndex];

        bool approved = false;
        for (uint i = 0; i < secret.contacts.length; i++) {
            if (secret.contacts[i].account == msg.sender) {
                secret.contacts[i].lastApprovalBlock = block.number;
                approved = true;
            }
        }

        return true;
    }

    function unlock(uint _secretIndex) public returns (bool) {
        Secret storage secret = secrets[_secretIndex];

        if (msg.sender != secret.owner) {
            revert("Only owner may unlock.");
        }

        if (unlockable(_secretIndex) == true) {
            secret.lastUnlockedAtBlock = block.number;

            return true;
        }

        revert("Secret locked.");
    }

    function unlockable(uint _secretIndex) public view returns (bool) {
        Secret memory secret = secrets[_secretIndex];

        uint approved = 0;

        for (uint i = 0; i < secret.contacts.length; i++) {
            if (secret.contacts[i].lastApprovalBlock > secret.lastUnlockedAtBlock) {
                approved += 1;
            }
        }

        if (approved == secret.contacts.length) {
            return true;
        }

        return false;
    }

    function strEq(string memory _left, string memory _right) private pure returns (bool) {
        return keccak256(bytes(_left)) == keccak256(bytes(_right));
    }

        fallback() external payable {
        balance[msg.sender] += msg.value;
    }

    receive() external payable {
        balance[msg.sender] += msg.value;
    }
}
