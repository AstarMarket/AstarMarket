//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PredictionMarket {
    struct MarketInfo {
        bool isResolved;
    }

    enum Vote {
        Yes,
        No
    }

    event Buy(address indexed _from, Vote _vote, uint256 _totalPrice);

    MarketInfo public marketInfo;

    constructor() {}

    function buy(Vote _vote) external payable {
        require(!marketInfo.isResolved);

        emit Buy(msg.sender, _vote, msg.value);
    }
}
