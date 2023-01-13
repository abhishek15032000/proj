export const ROLES = {
  ISSUER: 'ISSUER',
  VERIFIER: 'VERIFIER',
  BUYER: 'BUYER',
  REGISTRY: 'REGISTRY',
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

export const FILTER_ACTION = {
  APPLY: 'Apply',
  RESET: 'Reset',
}

export const PROJECT_STATUS = [
  {
    key: 0,
    value: 'Created Project',
  },
  {
    key: 1,
    value: 'Submitted for Screening',
  },
  {
    key: 2,
    value: 'Accepted screening internal',
  },
  {
    key: 3,
    value: 'Potential Verifier selected',
  },
  {
    key: 4,
    value: 'Verifier Approved the project',
  },
  {
    key: 5,
    value: 'Issuer Approved the verifier for the project',
  },
  {
    key: 6,
    value: 'Verifier Approves the project and sends it to registry',
  },
  {
    key: 7,
    value: 'Registry verifies and submits the report',
  },
  {
    key: 8,
    value: ' Rejected by the issuer',
  },
  {
    key: 9,
    value: 'Rejected by the verifier',
  },
]

export const PROJECT_ALL_STATUS = {
  CREATED_PROJECT: 0,
  SUBMITTED_FOR_SCREENING: 1,
  ACCEPTED_SCREENING_INTERNAL: 2,
  POTENTIAL_VERIFIER_SELECTED: 3,
  VERIFIER_APPROVED_THE_PROJECT: 4,
  ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT: 5,
  VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY: 6,
  REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT: 7,
  REJECTED_BY_THE_ISSUER: 8,
  REJECTED_BY_THE_VERIFIER: 9,
}
export const filters = [
  {
    filterType: 'Project Type',
    filters: [
      'Registered or Active Project',
      'Provisional Project or Future Project',
    ],
  },
  {
    filterType: 'Credit Type',
    filters: ['Carbon Credit', 'Biodiversity Credit', 'Plastics Credit'],
  },
  {
    filterType: 'Project Categories',
    filters: [
      'Agriculture',
      'Afforestation and reforestation',
      'Bio mass energy',
      'Cement',
      'CO2 Usage',
      'Chemical industries',
      'Construction',
      'Mining/mineral production/ bed CH4',
      'Energy distribution',
      'Energy efficiency: households',
      'Energy efficiency: industry',
      'Energy efficiency: own generation',
      'Energy efficiency: service',
      'Energy efficiency: supply side',
      'Energy demand',
      'Forestry and Other Land Use',
      'Forest conservation (REDD+)',
      'Fossil fuel switch',
      'Fugitive emissions from fuels (solid, oil and gas)',
      'Fugitive emissions from production and consumption of halocarbons and sulphur hexafluoride',
      'Geothermal',
      'HFCs',
      'Hydro',
      'Livestock, enteric fermentation, and manure management',
      'Manufacturing industries',
      'Metal production',
      'Waste handling and disposal',
      'Methane avoidance',
      'N2O',
      'Solar',
      'Solvent use',
      'Blue carbon',
      'Transport',
      'Wind',
      'Other Energy industries (renewable - / non-renewable sources)',
      'Other, please specify',
    ],
  },
  {
    filterType: 'Verification Standard',
    filters: ['Verra Registry', 'Gold Registry', 'BioCarbon Registry'],
  },
]
