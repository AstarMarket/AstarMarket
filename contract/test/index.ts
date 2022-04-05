import { expect } from "chai";
import { ethers } from "hardhat";
import { Vote } from "../types/vote";
import { PredictionMarket } from "../typechain";

describe("PredictionMarket", function () {
  let market: PredictionMarket;
  beforeEach(async () => {
    const PredictionMarket = await ethers.getContractFactory(
      "PredictionMarket"
    );
    market = await PredictionMarket.deploy();
    await market.deployed();
  });
  describe("buy", () => {
    it("Should emit Buy", async () => {
      expect(await market.buy(Vote.Yes))
        .to.emit(market, "Buy")
        .withArgs(Vote.Yes);
    });
    it("Should update buyers value", async () => {
      const boughtValue = ethers.utils.parseEther("123");
      const from = (await market.buy(Vote.Yes, { value: boughtValue })).from;
      expect((await market.buyers(from)).amount).to.be.equal(boughtValue);
    });
    it("Only one position", async () => {
      const boughtValue = ethers.utils.parseEther("123");
      await market.buy(Vote.Yes, { value: boughtValue });
      await expect(
        market.buy(Vote.No, { value: boughtValue })
      ).to.be.revertedWith("Already bought.");
    });
  });
  describe("getPosition", () => {
    it("Returns position value correctly", async () => {
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
      const from = (
        await market.buy(Vote.Yes, { value: ethers.utils.parseEther("123") })
      ).from;
      await market.sell();
      expect((await market.buyers(from)).amount).to.be.equal("0");
    });
    it("Cannot sell without buy", async () => {
      await expect(market.sell()).to.be.revertedWith("Not bought.");
    });
    it("Work correctly when using multiple markets", async () => {
      const PredictionMarket = await ethers.getContractFactory(
        "PredictionMarket"
      );
      const market1 = await PredictionMarket.deploy();
      await market1.deployed();
      const market2 = await PredictionMarket.deploy();
      await market2.deployed();
      const [user] = await ethers.getSigners();
      const buyAmount1 = ethers.utils.parseEther("111");
      const buyAmount2 = ethers.utils.parseEther("222");
      await market1.buy(Vote.Yes, { from: user.address, value: buyAmount1 });
      await market2.buy(Vote.No, { from: user.address, value: buyAmount2 });
      const position1 = await market1.getPosition(user.address);
      const position2 = await market2.getPosition(user.address);
      expect(position1.amount.toString()).to.be.equal(buyAmount1.toString());
      expect(position2.amount.toString()).to.be.equal(buyAmount2.toString());
      await market1.sell();
      const afterSellPosition1 = await market1.getPosition(user.address);
      const afterSellPosition2 = await market2.getPosition(user.address);
      expect(afterSellPosition1.amount.toString()).to.be.equal("0");
      expect(afterSellPosition2.amount.toString()).to.be.equal(
        buyAmount2.toString()
      );
    });
  });
});
