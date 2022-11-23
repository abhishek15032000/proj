export const ROLES = {
  ISSUER: 'ISSUER',
  VERIFIER: 'VERIFIER',
  BUYER: 'BUYER',
}
export const WalletStats = {
  WALLET_BALANCE: 'Wallet Balance',
  VCO_ON_SALE: 'Number of  VCOT on sale',
  VCO_AVAILABLE_FOR_SALE: 'Number of  VCOT available for sale',
  Balance_on_exchange: '  Balance on exchange',
}
export const SECTION_NAMES = {
  PROJECT_INTRODUCTION: 'Project Introduction',
  SECTION_A: 'Section A',
  SECTION_B: 'Section B',
  SECTION_C: 'Section C',
  SECTION_D: 'Section D(Optional)',
  SECTION_E: 'Section E(Optional)',
  SELECT_DATE: 'Select Date',
}

//Mumbai testnet network/chain id
export const MUMBAI_TESTNET_NETWORK_ID = 80001

export const MARKETPLACE_CALL_TYPES = {
  APPROVE_SELL_FLOW: 'approveSellFlow',
  DEPOSIT_SELL_FLOW: 'depositSellFlow',
  CREATE_SELL_ORDER: 'createSellOrder',
  APPROVE_BUY_FLOW: 'approveBuyFlow',
  DEPOSIT_BUY_FLOW: 'depositBuyFlow',
  CREATE_BUY_ORDER: 'createBuyOrder',
  WITHDRAW_ORDER: 'withdrawOrder',
}

export const LOCAL_STORAGE_VARS = {
  //Sell Flow
  // ON_GOING_DEPOSIT_DATA_SELL_FLOW: 'onGoingDepositSellFlow',
  // DATA_FOR_DEPOSIT_CALL_SELL_FLOW: 'dataForDepositCallSellFlow',
  // DATA_FOR_CREATE_SELL_ORDER_CALL: 'dataForCreateSellOrderCall',
  ON_GOING_APPROVE_DATA_SELL_FLOW: 'onGoingApproveSellFlow',
  ON_GOING_SELL_ORDER_TX_ID: 'onGoingSellOrderData',
  ON_GOING_DEPOSIT_TX_ID_SELL_FLOW: 'onGoingDepositTxIdSellFlow',
  SELL_QUANTITY_FOR_APPROVE: 'sellQuantityForApprove',
  SELL_QUANTITY_FOR_DEPOSIT: 'sellQuantityForDeposit',
  SELL_QUANTITY_FOR_SELL_ORDER: 'sellQuantityForSellOrder',
  //Buy Flow
  ON_GOING_APPROVE_DATA_BUY_FLOW: 'onGoingApproveForBuyFlow',
  ON_GOING_BUY_ORDER_TX_ID: 'onGoingBuyOrderData',
  ON_GOING_DEPOSIT_TX_ID_BUY_FLOW: 'onGoingDepositTxIdBuyFlow',
  BUY_QUANTITY_FOR_APPROVE: 'buyQuantityForApprove',
  BUY_QUANTITY_FOR_DEPOSIT: 'buyQuantityForDeposit',
  BUY_QUANTITY_FOR_BUY_ORDER: 'buyQuantityForBuyOrder',
  // ON_GOING_DEPOSIT_DATA_BUY_FLOW: 'onGoingDepositBuyFlow',
  // DATA_FOR_CREATE_BUY_ORDER_CALL: 'dataForCreateBuyOrderCall',
  // DATA_FOR_DEPOSIT_CALL_BUY_FLOW: 'dataForDepositCallForBuyFlow',
  // DATA_FOR_BUY_CALL: 'dataForBuyCall',
  //Wthdraw flow
  ON_GOING_WITHDRAW_ORDER_TX_ID: 'onGoingWithdrawOrderData',
  WITHDRAW_QUANTITY: 'withdrawQuantity',
}

export const TOKEN_TYPES = {
  VCOT: 'VCOT',
  INR: 'INR',
}
