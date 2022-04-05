import { expect } from "chai";
import { ethers } from "hardhat";
import { Vote } from "../types/vote";

describe("PredictionMarket", function () {
  describe("buy", () => {
    it("Should emit Buy", async () => {
      const PredictionMarket = await ethers.getContractFactory(
        "PredictionMarket"
      );
      const market = await PredictionMarket.deploy();
      await market.deployed();

      expect(await market.buy(Vote.Yes))
        .to.emit(market, "Buy")
        .withArgs(Vote.Yes);
    });
  });
});
