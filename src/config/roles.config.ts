export const ROLES = {
  ISSUER: 'ISSUER',
  VERIFIER: 'VERIFIER',
  BUYER: 'BUYER',
}

export const SECTION_NAMES = {
  PROJECT_INTRODUCTION: 'Project Introduction',
  SECTION_A: 'Section A',
  SECTION_B: 'Section B',
  SECTION_C: 'Section C',
  SECTION_D: 'Section D(Optional)',
  SECTION_E: 'Section E(Optional)',
}

export const LOCAL_STORAGE_VARS = {
  //Buy Flow
  ON_GOING_APPROVE_DATA_SELL_FLOW: 'onGoingApproveSellFlow',
  SELL_QUANTITY_FOR_APPROVE: 'sellQuantityForApprove',
  SELL_QUANTITY_FOR_DEPOSIT: 'sellQuantityForDeposit',
  SELL_QUANTITY_FOR_SELL_ORDER: 'sellQuantityForSellOrder',
  DATA_FOR_DEPOSIT_CALL_SELL_FLOW: 'dataForDepositCallSellFlow',
  DATA_FOR_CREATE_SELL_ORDER_CALL: 'dataForCreateSellOrderCall',
  //Sell Flow
  ON_GOING_APPROVE_DATA_BUY_FLOW: 'onGoingApproveForBuyFlow',
  DATA_FOR_DEPOSIT_CALL_BUY_FLOW: 'dataForDepositCallForBuyFlow',
  DATA_FOR_CREATE_BUY_ORDER_CALL: 'dataForCreateBuyOrderCall',
  BUY_QUANTITY_FOR_DEPOSIT: 'buyQuantityForApprove',
  BUY_QUANTITY_FOR_APPROVE: 'buyQuantityForDeposit',
  BUY_QUANTITY_FOR_BUY_ORDER: 'buyQuantityForBuyOrder',
  DATA_FOR_BUY_CALL: 'dataForBuyCall',
}
