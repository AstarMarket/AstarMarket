//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract PredictionMarket {
    struct MarketInfo {
        uint256 yesShares;
        uint256 noShares;
        uint256 yesPrice;
        uint256 noPrice;
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

    function updateMarketInfoByBuy(Vote _vote) private {
        uint256 maxShares = 1000;

        if (marketInfo.yesShares == 0 && marketInfo.noShares == 0) {
            if (_vote == Vote.Yes) {
                marketInfo.yesPrice = msg.value;
                marketInfo.yesShares = maxShares;
            } else {
                marketInfo.noPrice = msg.value;
                marketInfo.noShares = maxShares;
            }
            return;
        }

        if (_vote == Vote.Yes) {
            marketInfo.yesPrice += msg.value;
        } else {
            marketInfo.noPrice += msg.value;
        }

        uint256 totalPrice = marketInfo.yesPrice + marketInfo.noPrice;

        // round off on front end
        marketInfo.yesShares = ((marketInfo.yesPrice * maxShares) / totalPrice);
        marketInfo.noShares = ((marketInfo.noPrice * maxShares) / totalPrice);

        if (marketInfo.yesShares >= (maxShares - 10)) {
            marketInfo.yesShares = maxShares - 10;
            marketInfo.noShares = 10;
        }
        if (marketInfo.noShares >= (maxShares - 10)) {
            marketInfo.noShares = maxShares - 10;
            marketInfo.yesShares = 10;
        }
    }

    function updateMarketInfoBySell(Vote _vote) private {
        if (_vote == Vote.Yes) {
            marketInfo.yesPrice -= buyers[msg.sender].amount;
            uint256 totalPrice = marketInfo.yesPrice + marketInfo.noPrice;
            if (marketInfo.yesPrice == 0) {
                marketInfo.yesShares = 0;
            } else {
                marketInfo.yesShares = (marketInfo.yesPrice / totalPrice) * 100;
            }
        } else {
            marketInfo.noPrice -= buyers[msg.sender].amount;
            uint256 totalPrice = marketInfo.yesPrice + marketInfo.noPrice;
            if (marketInfo.noPrice == 0) {
                marketInfo.noShares = 0;
            } else {
                marketInfo.noShares = (marketInfo.noPrice / totalPrice) * 100;
            }
        }
    }

    function buy(Vote _vote) external payable {
        require(!marketInfo.isResolved);
        require(buyers[msg.sender].amount == 0, "Already bought.");
        buyers[msg.sender].amount = msg.value;
        buyers[msg.sender].vote = _vote;
        emit Buy(msg.sender, _vote, msg.value);
        updateMarketInfoByBuy(_vote);
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
        updateMarketInfoBySell(buyers[msg.sender].vote);
        delete buyers[msg.sender];
    }

    function getMarketShares() public view returns (uint256, uint256) {
        return (marketInfo.yesShares, marketInfo.noShares);
    }
}
