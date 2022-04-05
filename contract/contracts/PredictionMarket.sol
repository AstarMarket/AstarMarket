//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract PredictionMarket {
    struct MarketInfo {
        bool isResolved;
    }

    struct Position {
        uint256 amount;
        Vote vote;
    }

    enum Vote {
        Yes,
        No
    }

    mapping(address => Position) public buyers;

    event Buy(address indexed _from, Vote _vote, uint256 _totalPrice);
    event Sell(address indexed _from, uint256 _price);

    MarketInfo public marketInfo;

    constructor() {}

    function buy(Vote _vote) external payable {
        require(!marketInfo.isResolved);
        require(buyers[msg.sender].amount == 0, "Already bought.");
        buyers[msg.sender].amount = msg.value;
        buyers[msg.sender].vote = _vote;
        emit Buy(msg.sender, _vote, msg.value);
    }

    function getPosition(address _address)
        public
        view
        returns (Position memory)
    {
        return buyers[_address];
    }

    function sell() public {
        require(buyers[msg.sender].amount != 0, "Not bought.");
        (bool success, ) = (msg.sender).call{value: buyers[msg.sender].amount}(
            ""
        );
        require(success, "Failed to sell.");
        emit Sell(msg.sender, buyers[msg.sender].amount);
        delete buyers[msg.sender];
    }
}
