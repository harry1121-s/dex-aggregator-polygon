import { BigInt } from "@graphprotocol/graph-ts"
import { MMFinance, PairCreated as MMPairCreated} from "../generated/MMFinance/MMFinance";
import { PairCreated as QuickSwapCreated } from "../generated/Quickswap/Quickswap";
import { Quickswap } from "../generated/Quickswap/Quickswap"
import { Pair,Token, Reserve } from "../generated/schema"
import {
  ERC20
} from "../generated/MMFinance/ERC20"
import { log } from '@graphprotocol/graph-ts'

const MM_Finance = "0x7cFB780010e9C861e03bCbC7AC12E013137D47A5";

export function handlePairCreated(event: MMPairCreated): void {
    let _id = event.params.pair;
    let _tokenA = event.params.token0;
    let _tokenB = event.params.token1;
    let _exchange = "MM Finance";
    let _router = "0x51aba405de2b25e5506dea32a6697f450ceb1a17";
    let _pairId = event.params.param3;
    log.debug("PE - ID: {}\nTokenA: {}\nTokenB: {}\nPairID: {}", [_id.toHexString(),_tokenA.toHexString(),_tokenB.toHexString(),_pairId.toString()]);

    // Create Token Instance A
    let _erc20A = ERC20.bind(_tokenA);
    let _namecallA = _erc20A.try_name();
    let _symbolcallA = _erc20A.try_symbol();
    let _decimalcallA = _erc20A.try_decimals();
    
    // Create Token A instance
    let tokenA =  Token.load(_tokenA.toHex());
    if(tokenA === null) {
      tokenA = new Token(_tokenA.toHex());
      if(_namecallA.reverted){
        tokenA.name = "N/A";
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.name = _namecallA.value;
      }
      if(_symbolcallA.reverted){
        tokenA.symbol = "N/A";
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.symbol = _symbolcallA.value;
      }
      if(_decimalcallA.reverted){
        tokenA.decimal = BigInt.fromI32(0);
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.decimal = BigInt.fromI32(_decimalcallA.value);
      }
      // tokenA.tokenId = _tokenB.toHexString();
    }
    tokenA.save();

    // Create Token Instance B
    let _erc20B = ERC20.bind(_tokenB);
    let _namecallB = _erc20B.try_name();
    let _symbolcallB = _erc20B.try_symbol();
    let _decimalcallB = _erc20B.try_decimals();
    
    // Create Token A instance
    let tokenB =  Token.load(_tokenB.toHex());
    if(tokenB === null) {
      tokenB = new Token(_tokenB.toHex());
      if(_namecallB.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
        tokenB.name = "N/A";
      } else {
        tokenB.name = _namecallB.value;
      }
      if(_symbolcallB.reverted){
        tokenB.symbol = "N/A";
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenB.symbol = _symbolcallB.value;
      }
      if(_decimalcallB.reverted){
        tokenB.decimal = BigInt.fromI32(0);
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenB.decimal = BigInt.fromI32(_decimalcallB.value);
      }
      // tokenB.tokenId = tokenA.id;
    }
    tokenB.save();

    // Create Token Pair
    let pair = Pair.load(_id.toHex());
    if(pair === null) {
      pair = new Pair(_id.toHex());
      pair.tokenA = _tokenA.toHexString();
      pair.tokenAEntity = tokenA.id;
      pair.tokenB = _tokenB.toHexString()
      pair.tokenBEntity = tokenB.id;
      pair.exchange = _exchange;
      pair.router = _router;
    }
    pair.save();
}

export function handlePairCreatedQuickswap(event: QuickSwapCreated): void {
    let _id = event.params.pair;
    let _tokenA = event.params.token0;
    let _tokenB = event.params.token1;
    let _exchange = "Quickswap";
    let _router = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
    let _pairId = event.params.param3;
    log.debug("PE - ID: {}\nTokenA: {}\nTokenB: {}\nPairID: {}", [_id.toHexString(),_tokenA.toHexString(),_tokenB.toHexString(),_pairId.toString()]);

    // Create Token Instance A
    let _erc20A = ERC20.bind(_tokenA);
    let _namecallA = _erc20A.try_name();
    let _symbolcallA = _erc20A.try_symbol();
    let _decimalcallA = _erc20A.try_decimals();
    
    // Create Token A instance
    let tokenA =  Token.load(_tokenA.toHex());
    if(tokenA === null) {
      tokenA = new Token(_tokenA.toHex());
      if(_namecallA.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.name = _namecallA.value;
      }
      if(_symbolcallA.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.symbol = _symbolcallA.value;
      }
      if(_decimalcallA.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenA.decimal = BigInt.fromI64(_decimalcallA.value);
      }
      // tokenA.tokenId = _tokenB.toHexString();
    }
    tokenA.save();

    // Create Token Instance B
    let _erc20B = ERC20.bind(_tokenB);
    let _namecallB = _erc20B.try_name();
    let _symbolcallB = _erc20B.try_symbol();
    let _decimalcallB = _erc20B.try_decimals();
    
    // Create Token A instance
    let tokenB =  Token.load(_tokenB.toHex());
    if(tokenB === null) {
      tokenB = new Token(_tokenB.toHex());
      if(_namecallB.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenB.name = _namecallB.value;
      }
      if(_symbolcallB.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenB.symbol = _symbolcallB.value;
      }
      if(_decimalcallB.reverted){
        log.error("PE - Bind Call Error: Function Name for Token: {}",[_tokenA.toHexString()]);
      } else {
        tokenB.decimal = BigInt.fromI64(_decimalcallB.value);
      }
      // tokenB.tokenId = tokenA.id;
    }
    tokenB.save();

    // Create Token Pair
    let pair = Pair.load(_id.toHex());
    if(pair === null) {
      pair = new Pair(_id.toHex());
      pair.tokenA = _tokenA.toHexString();
      pair.tokenAEntity = tokenA.id;
      pair.tokenB = _tokenB.toHexString()
      pair.tokenBEntity = tokenB.id;
      pair.exchange = _exchange;
      pair.router = _router;
    }
    pair.save();
}

