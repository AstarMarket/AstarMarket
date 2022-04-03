import { expect } from "chai";
import { ethers } from "hardhat";

describe("PredictionMarket", function () {
  it("Should return the new greeting once it's changed", async function () {
    const PredictionMarket = await ethers.getContractFactory("PredictionMarket");
    const market = await PredictionMarket.deploy("Hello, world!");
    await market.deployed();

    expect(await market.greet()).to.equal("Hello, world!");

    const setGreetingTx = await market.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await market.greet()).to.equal("Hola, mundo!");
  });
});
