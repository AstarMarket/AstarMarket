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
    it("Should update buyers value", async () => {
      const PredictionMarket = await ethers.getContractFactory(
        "PredictionMarket"
      );
      const market = await PredictionMarket.deploy();
      await market.deployed();
      const boughtValue = ethers.utils.parseEther("123");
      const from = (await market.buy(Vote.Yes, { value: boughtValue })).from;
      expect((await market.buyers(from)).amount).to.be.equal(boughtValue);
    });
  });
  describe("getPosition", () => {
    it("Returns position value correctly", async () => {
      const PredictionMarket = await ethers.getContractFactory(
        "PredictionMarket"
      );
      const market = await PredictionMarket.deploy();
      await market.deployed();
      const [user] = await ethers.getSigners();
      const buyAmount = ethers.utils.parseEther("123");
      await market.buy(Vote.No, {
        from: user.address,
        value: buyAmount,
      });
      const position = await market.getPosition(user.address);
      expect(position.amount).to.be.equal(buyAmount);
      expect(position.vote).to.be.equal(Vote.No);
    });
  });
  describe("sell", () => {
    it("Sell correctly", async () => {
      const PredictionMarket = await ethers.getContractFactory(
        "PredictionMarket"
      );
      const market = await PredictionMarket.deploy();
      await market.deployed();
      const from = (
        await market.buy(Vote.Yes, { value: ethers.utils.parseEther("123") })
      ).from;
      await market.sell();
      expect((await market.buyers(from)).amount).to.be.equal("0");
    });
    it("Cannot sell without buy", async () => {
      const PredictionMarket = await ethers.getContractFactory(
        "PredictionMarket"
      );
      const market = await PredictionMarket.deploy();
      await market.deployed();
      await expect(market.sell()).to.be.revertedWith("Not bought.");
    });
  });
});
