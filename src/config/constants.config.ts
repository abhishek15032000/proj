import { Images } from '../theme'

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
  CARBON: 'CARBON',
  USD: 'USD',
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
    value: '   Project under review in registry',
  },
  {
    key: 8,
    value: 'Registry verifies and submits the report',
  },
  {
    key: 9,
    value: ' Rejected by the issuer',
  },
  {
    key: 10,
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
  PROJECT_UNDER_REVIEW_IN_REGISTRY: 7,
  REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT: 8,
  REJECTED_BY_THE_ISSUER: 9,
  REJECTED_BY_THE_VERIFIER: 10,
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
    // filters: ['Verra Registry', 'Gold Registry', 'BioCarbon Registry'],
    filters: ['ICR'],
  },
]

export const COMMENT_ALIGN = {
  LEFT: 'left',
  RIGHT: 'right',
}

export const PROJECT_TYPES = [
  'Agriculture',
  'Chemical industries',
  'Construction',
  'Energy distribution',
  'Energy demand',
  ' Energy industries (renewable - / non-renewable sources)',
  'Fugitive emissions from fuels (solid, oil and gas)',
  ' Fugitive emissions from production and consumption of halocarbons and sulphur hexafluoride',
  ' Livestock, enteric fermentation, and manure management',
  ' Manufacturing industries',
  ' Metal production',
  'Mining/mineral production',
  'Solvent use',
  'Waste handling and disposal',
  'Afforestation and reforestation',
  'Forestry and Other Land Use',
  'Forest conservation (REDD+)',
  'Bio mass energy',
  'Carbon Capture and Storage / Carbon Dioxide Removal',
  'Cement',
  'CO2 Usage',
  'Mining/mineral production/ bed CH4',
  'Energy efficiency: households',
  'Energy efficiency: industry',
  'Energy efficiency: own generation',
  'Energy efficiency: service',
  'Energy efficiency: supply side',
  'Fossil fuel switch',
  'Geothermal',
  'HFCs',
  'Hydro',
  'Methane avoidance',
  'N2O',
  'Solar',
  'Blue carbon: Others',
  'Blue carbon: mangroves',
  'Blue carbon: salt marshes',
  'Blue carbon: seagrasses',
  'Blue carbon: Tidal marshes',
  'Blue carbon: coastal wetlands',
  'Transport',
  'Wind',
  'Other Energy industries (renewable - / non-renewable sources)',
  'Other, please specify',
]

export const METHODOLOGIES = [
  'ACM0001 Flaring or use of landfill gas',
  'ACM0002 Grid-connected electricity generation from renewable sources',
  'ACM0003 Partial substitution of fossil fuels in cement or quicklime manufacture',
  'ACM0006 Electricity and heat generation from biomass',
  'ACM0007 Conversion from single cycle to combined cycle power generation',
  'ACM0008 Abatement of methane from coal mines',
  'ACM0009 Fuel switching from coal or petroleum fuel to natural gas',
  'ACM0011 Fuel switching from coal and/or petroleum fuels to natural gas in existing power plants for electricity generation',
  'ACM0012 Waste energy recovery',
  'ACM0013 Construction and operation of new grid connected fossil fuel fired power plants using a less GHG intensive technology',
  'ACM0014 Treatment of wastewater',
  'ACM0017 Production of Biofuel',
  'ACM0018 Electricity generation from biomass in power-only plants',
  'ACM0020  Co-firing of biomass residues for heat generation and/or electricity generation in grid connected power plants',
  'ACM0022 Alternative waste treatment processes',
  'ACM0023 Introduction of an efficiency improvement technology in a boiler',
  'ACM0024 Natural gas substitution by biogenic methane produced from the anaerobic digestion of organic waste',
  'ACM0025 Construction of a new natural gas power plant',
  'ACM0026 Fossil fuel based cogeneration for identified recipient facility(ies)',
  'AM0007 Analysis of the least-cost fuel option for seasonally-operating biomass cogeneration plants',
  'AM0009 Recovery and utilization of gas from oil fields that would otherwise be flared or vented',
  'AM0019  Renewable energy projects replacing part of the electricity production of one single fossil fuel fired power plant that stands alone or supplies to a grid, excluding biomass projects',
  'AM0026 Methodology for zero-emissions grid-connected electricity generation from renewable sources in Chile or in countries with merit order based dispatch grid',
  'AM0036 Use of biomass in heat generation equipment',
  'AM0044  Energy efficiency improvement projects - boiler rehabilitation or replacement in industrial and district heating sectors',
  'AM0045 Grid connection of isolated electricity systems',
  'AM0048 New cogeneration project activities supplying electricity and heat to multiple costumers',
  'AM0049 Methodology for gas based energy generation in an industrial facility',
  'AM0052  Increased electricity generation from existing hydropower stations through Decision Support System optimization',
  'AM0053 Biogenic methane injection to a natural gas distribution grid',
  'AM0055 Recovery and utilization of waste gas in refinery or gas plant',
  'AM0056  Efficiency improvement by boiler replacement or rehabilitation and optional fuel switch in fossil fuel-fired steam boiler systems',
  'AM0058 Introduction of a new primary district heating system',
  'AM0061 Methodology for rehabilitation and/or energy efficiency improvement in existing power plants',
  'AM0062 Energy efficiency improvements of a power plant through retrofitting turbines',
  'AM0064 Capture and utilization or destruction of mine methane (excluding coal mines) or non mine methane',
  'AM0072 Fossil Fuel Displacement by Geothermal Resources for Space Heating',
  'AM0074 Methodology for new grid connected power plants using permeate gas previously flared and/or vented',
  'AM0075 Methodology for collection, processing and supply of biogas to end-users for production of heat',
  'AM0076 Implementation of fossil fuel trigeneration systems in existing industrial facilities',
  'AM0077 Recovery of gas from oil wells that would otherwise be vented or flared and its delivery to specific end-users',
  'AM0081 Flare or vent reduction at coke plants through the conversion of their waste gas into dimethyl ether for use as a fuel',
  'AM0084 Installation of cogeneration system supplying electricity and chilled water to new and existing consumers',
  'AM0091 Energy efficiency technologies and fuel switching in new buildings',
  'AM0094 Distribution of biomass based stove and/or heater for household or institutional use',
  'AM0095 Waste gas based combined cycle power plant in a Greenfield iron and steel plant',
  'AM0098 Utilization of ammonia-plant off gas for steam generation',
  'AM0099 Installation of a new natural gas fired gas turbine to an existing CHP plant',
  'AM0100 Integrated Solar Combined Cycle (ISCC) projects',
  'AM0103 Renewable energy power generation in isolated grids',
  'AM0104 Interconnection of electricity grids in countries with economic merit order dispatch',
  'AM0107 New natural gas based cogeneration plant',
  'AM0108 Interconnection between electricity systems for energy exchange',
  'AM0112 Less carbon intensive power generation through continuous reductive distillation of waste',
  'AM0117 Introduction of a new district cooling system',
  'AMS-I.A. Electricity generation by the user',
  'AMS-I.B. Mechanical energy for the user with or without electrical energy',
  'AMS-I.C. Thermal energy production with or without electricity',
  'AMS-I.D. Grid connected renewable electricity generation',
  'AMS-I.F. Renewable electricity generation for captive use and mini-grid',
  'AMS-I.G. Plant oil production and use for energy generation in stationary applications',
  'AMS-I.H. Biodiesel production and use for energy generation in stationary applications',
  'AMS-I.I. Biogas/biomass thermal applications for households/small users',
  'AMS-I.J. Solar water heating systems (SWH)',
  'AMS-I.K. Solar cookers for households',
  'AMS-I.L. Electrification of rural communities using renewable energy',
  'AMS-I.M Solar power for domestic aircraft at-gate operations',
  'AMS-II.B. Supply side energy efficiency improvements – generation',
  'AMS-II.H. Energy efficiency measures through centralization of utility provisions of an industrial facility',
  'AMS-II.K. Installation of co-generation or tri-generation systems supplying energy to commercial building',
  'AMS-II.Q. Energy efficiency and/or energy supply projects in commercial buildings',
  'AMS-III.AC. Electricity and/or heat generation using fuel cell',
  'AMS-III.AE. Energy efficiency and renewable energy measures in new residential buildings',
  'AMS-III.AG. Switching from high carbon intensive grid electricity to low carbon intensive fossil fuel',
  'AMS-III.AH. Shift from high carbon intensive fuel mix ratio to low carbon-intensive fuel mix ratio',
  'AMS-III.AL. Conversion from single cycle to combined cycle power generation',
  'AMS-III.AM. Fossil fuel switch in a cogeneration/trigeneration system',
  'AMS-III.AR. Substituting fossil fuel based lighting with LED/CFL lighting systems',
  'AMS-III.B. Switching fossil fuels',
  'AMS-III.BI. Flare gas recovery in gas treating facilities',
  'AMS-III.BJ. Destruction of hazardous waste using plasma technology including energy recovery',
  'AMS-III.BL. Integrated methodology for electrification of communities',
  'AMS-III.H. Methane recovery in wastewater treatment',
  'AMS-III.P. Recovery and utilization of waste gas in refinery facilities',
  'AMS-III.W. Methane capture and destruction in non-hydrocarbon mining activities',
  'AM0035 SF6 emission reductions in electrical grids',
  'AM0067 Methodology for installation of energy efficient transformers in a power distribution grid',
  'AM0097 Installation of high voltage direct current power transmission line',
  'AM0118 Introduction of low resistivity power transmission line',
  'AMS-II.A. Supply side energy efficiency improvements – transmission and distribution',
  'AMS-II.T Emission reduction through reactive power compensation in power distribution network',
  'AMS-III.AS. Switch from fossil fuel to biomass in existing manufacturing facilities for non-energy applications',
  'AMS-III.AW. Electrification of rural communities by grid extension',
  'AMS-III.BB. Electrification of communities through grid extension or construction of new mini-grids',
  'AM0017 Steam system efficiency improvements by replacing steam traps and returning condensate',
  'AM0018 Baseline methodology for steam optimization systems',
  'AM0020 Baseline methodology for water pumping efficiency improvements',
  'AM0046 Distribution of efficient light bulbs to households',
  'AM0060 Power saving through replacement by energy efficient chillers',
  'AM0070 Manufacturing of energy efficient domestic refrigerators',
  'AM0086 Distribution of low greenhouse gas emitting water purification systems for safe drinking water',
  'AM0091 Energy efficiency technologies and fuel switching in new buildings',
  'AM0105 Energy efficiency in data centers through dynamic power management',
  'AM0113 Distribution of compact fluorescent lamps (CFL) and light-emitting diode (LED) lamps to households',
  'AM0120 Energy-efficient refrigerators and air-conditioners',
  'AMS-II.C. Demand-side energy efficiency activities for specific technologies',
  'AMS-II.D. Energy efficiency and fuel switching measures for industrial facilities',
  'AMS-II.E. Energy efficiency and fuel switching measures for buildings',
  'AMS-II.F. Energy efficiency and fuel switching measures for agricultural facilities and activities',
  'AMS-II.G. Energy efficiency measures in thermal applications of non-renewable biomass',
  'AMS-II.J. Demand-side activities for efficient lighting technologies',
  'AMS-II.L. Demand-side activities for efficient outdoor and street lighting technologies',
  'AMS-II.M. Demand-side energy efficiency activities for installation of low-flow hot water savings devices',
  'AMS-II.N. Demand-side energy efficiency activities for installation of energy efficient lighting and/or controls in buildings',
  'AMS-II.O. Dissemination of energy efficient household appliances',
  'AMS-II.P. Energy efficient pump-set for agriculture use',
  'AMS-II.Q. Energy efficiency and/or energy supply projects in commercial buildings',
  'AMS-II.R. Energy efficiency space heating measures for residential buildings',
  'AMS-II.S. Energy efficiency in motor systems',
  'AMS-III.AE. Energy efficiency and renewable energy measures in new residential buildings',
  'AMS-III.AV. Low greenhouse gas emitting safe drinking water production systems',
  'AMS-III.V. Decrease of coke consumption in blast furnace by installing dust/sludge recycling system in steel works',
  'AMS-III.X. Energy Efficiency and HFC-134a Recovery in Residential Refrigerators',
  'ACM0003 Partial substitution of fossil fuels in cement or quicklime manufacture',
  'ACM0005 Increasing the blend in cement production',
  'ACM0009 Fuel switching from coal or petroleum fuel to natural gas',
  'ACM0012 Waste energy recovery',
  'ACM0015 Emission reductions from raw material switch in clinker production',
  'ACM0021  Reduction of emissions from charcoal production by improved kiln design and/or abatement of methane',
  'AM0036 Use of biomass in heat generation equipment',
  'AM0106 Energy efficiency improvements of a lime production facility through installation of new kilns',
  'AM0121 Emission reduction from partial switching of raw materials and increasing the share of additives in the production of blended cement',
  'AMS-II.D. Energy efficiency and fuel switching measures for industrial facilities',
  'AMS-II.I. Efficient utilization of waste energy in industrial facilities',
  'AMS-III.AD. Emission reductions in hydraulic lime production',
  'AMS-III.AN. Fossil fuel switch in existing manufacturing industries',
  'AMS-III.BD. GHG emission reduction due to supply of molten metal instead of ingots for aluminium castings',
  'AMS-III.BG. Emission reduction through sustainable charcoal production and consumption',
  'AMS-III.Q. Waste energy recovery',
  'AMS-III.Z. Fuel Switch, process improvement and energy efficiency in brick manufacture',
  'ACM0017 Production of biofuel',
  'ACM0019 N2O abatement from nitric acid production',
  'AM0021 Baseline Methodology for decomposition of N2O from existing adipic acid production plants',
  'AM0027 Substitution of CO2 from fossil or mineral origin by CO2 from renewable sources in the production of inorganic compounds',
  'AM0028 N2O destruction in the tail gas of Caprolactam production plants',
  'AM0050 Feed switch in integrated Ammonia-urea manufacturing industry',
  'AM0057 Avoided emissions from biomass wastes through use as feed stock in pulp and paper, cardboard, fiberboard or bio-oil production',
  'AM0063 Recovery of CO2 from tail gas in industrial facilities to substitute the use of fossil fuels for production of CO2',
  'AM0069 Biogenic methane use as feedstock and fuel for town gas production',
  'AM0081 Flare or vent reduction at coke plants through the conversion of their waste gas into dimethyl ether for use as a fuel',
  'AM0098 Utilization of ammonia-plant off gas for steam generation',
  'AM0114 Shift from electrolytic to catalytic process for recycling of chlorine from hydrogen chloride gas in isocyanate plants',
  'AM0115 Recovery and utilization of coke oven gas from coke plants for LNG production',
  'AMS-I.H. Biodiesel production and use for energy generation in stationary applications',
  'AMS-III.AC. Electricity and/or heat generation using fuel cell',
  'AMS-III.AI. Emission reductions through recovery of spent sulphuric acid',
  'AMS-III.AK. Biodiesel production and use for transport applications',
  'AMS-III.J. Avoidance of fossil fuel combustion for carbon dioxide production to be used as raw material for industrial processes',
  'AMS-III.K. Avoidance of methane release from charcoal production',
  'AMS-III.M. Reduction in consumption of electricity by recovering soda from paper manufacturing process',
  'AMS-III.O. Hydrogen production using methane extracted from biogas',
  'AMS-III.BH. Displacement of production of brick and cement by manufacture and installation of gypsum concrete wall panels',
  'ACM0016 Mass Rapid Transit Projects',
  'AM0031 Bus rapid transit projects',
  'AM0090 Modal shift in transportation of cargo from road transportation to water or rail transportation',
  'AM0101 High speed passenger rail systems',
  'AM0110 Modal shift in transportation of liquid fuels',
  'AM0116 Electric taxiing systems for airplanes',
  'AMS-I.M Solar power for domestic aircraft at-gate operations',
  'AMS-III.AA. Transportation Energy Efficiency Activities using Retrofit Technologies',
  'AMS-III.AK. Biodiesel production and use for transport applications',
  'AMS-III.AP. Transport energy efficiency activities using post - fit Idling Stop device',
  'AMS-III.AQ. Introduction of Bio-CNG in transportation applications',
  'AMS-III.AT. Transportation energy efficiency activities installing digital tachograph systems to commercial freight transport fleets',
  'AMS-III.AY. Introduction of LNG buses to existing and new bus routes',
  'AMS-III.BC. Emission reductions through improved efficiency of vehicle fleets',
  'AMS-III.BM. Lightweight two and three wheeled personal transportation',
  'AMS-III.BN. Efficient operation of public transportation',
  'AMS-III.BO. Trip avoidance through equipment improvement of freight transport',
  'AMS-III.BP. Emission reduction by shore-side electricity supply system',
  'AMS-III.C. Emission reductions by electric and hybrid vehicles',
  'AMS-III.S. Introduction of low-emission vehicles/technologies to commercial vehicle fleets',
  'AMS-III.T. Plant oil production and use for transport applications',
  'AMS-III.U. Cable Cars for Mass Rapid Transit System (MRTS)',
  'ACM0008 Abatement of methane from coal mines',
  'ACM0017 Production of biofuel',
  'AM0064 Capture and utilization or destruction of mine methane (excluding coal mines) or non mine methane',
  'AMS-III.W. Methane capture and destruction in non-hydrocarbon mining activities',
  'AM0030 PFC emission reductions from anode effect mitigation at primary aluminum smelting facilities',
  'AM0038 Methodology for improved electrical energy efficiency of an existing submerged electric arc furnace used for the production of silicon and ferro alloys',
  'AM0059 Reduction in GHGs emission from primary aluminum smelters',
  'AM0065 Replacement of SF6 with alternate cover gas in the magnesium industry',
  'AM0066 GHG emission reductions through waste heat utilization for pre-heating of raw materials in sponge iron manufacturing process',
  'AM0068 Methodology for improved energy efficiency by modifying ferroalloy production facility',
  'AM0082 Use of charcoal from planted renewable biomass in a new iron ore reduction system',
  'AM0095 Waste gas based combined cycle power plant in a Greenfield iron and steel plant',
  'AM0109 Introduction of hot supply of Direct Reduced Iron in Electric Arc Furnaces',
  'AMS-III.V. Decrease of coke consumption in blast furnace by installing dust/sludge recycling system in steel works',
  'AM0009 Recovery and utilization of gas from oil fields that would otherwise be flared or vented',
  'AM0023 Leak detection and repair in gas production, processing, transmission, storage and distribution systems and in refinery facilities',
  'AM0037 Flare (or vent) reduction and utilization of gas from oil wells as a feedstock',
  'AM0043 Leak reduction from a natural gas distribution grid by replacing old cast iron pipes or steel pipes without cathodic protection with polyethylene pipes',
  'AM0055 Recovery and utilization of waste gas in refinery or gas plant',
  'AM0074 Methodology for new grid connected power plants using permeate gas previously flared and/or vented',
  'AM0077 Recovery of gas from oil wells that would otherwise be vented or flared and its delivery to specific end- users',
  'AM0088 Air separation using cryogenic energy recovered from the vaporization of LNG',
  'AM0089 Production of diesel using a mixed feedstock of gasoil and vegetable oil',
  'AM0115 Recovery and utilization of coke oven gas from coke plants for LNG production',
  'AMS-III.BI. Flare gas recovery in gas treating facilities',
  'AMS-III.P. Recovery and utilization of waste gas in refinery facilities',
  'AM0001 Decomposition of fluoroform (HFC-23) waste streams',
  'AM0035 SF6 emission reductions in electrical grids',
  'AM0071 Manufacturing and servicing of domestic refrigeration appliances using a low GWP refrigerant',
  'AM0078 Point of Use Abatement Device to Reduce SF6 emissions in LCD Manufacturing Operations',
  'AM0079 Recovery of SF6 from Gas insulated electrical equipment in testing facilities',
  'AM0092 Substitution of PFC gases for cleaning Chemical Vapor Deposition (CVD) reactors in the semiconductor industry',
  'AM0096 CF4 emission reduction from installation of an abatement system in a semiconductor manufacturing facility',
  'AM0111 Abatement of fluorinated greenhouse gases in semiconductor manufacturing',
  'AM0119 SF6 emission reductions in gas insulated metal enclosed switchgear',
  'AMS-III.AB. Avoidance of HFC emissions in Standalone Commercial Refrigeration Cabinets',
  'AMS-III.N. Avoidance of HFC emissions in rigid Poly Urethane Foam (PUF) manufacturing',
  'AMS-III.X. Energy Efficiency and HFC-134a Recovery in Residential Refrigerators',
  'ACM0010 GHG emission reductions from manure management systems',
  'ACM0014 Treatment of wastewater',
  'ACM0022 Alternative waste treatment processes',
  'ACM0024 Natural gas substitution by biogenic methane produced from the anaerobic digestion of organic waste',
  'AM0053 Biogenic methane injection to a natural gas distribution grid',
  'AM0057 Avoided emissions from biomass wastes through use as feed stock in pulp and paper, cardboard, fiberboard or bio-oil production',
  'AM0073 GHG emission reductions through multi-site manure collection and treatment in a central plant',
  'AM0075 Methodology for collection, processing and supply of biogas to end-users for production of heat',
  'AM0080 Mitigation of greenhouse gases emissions with treatment of wastewater in aerobic wastewater treatment plants',
  'AM0083 Avoidance of landfill gas emissions by in-situ aeration of landfills',
  'AM0093 Avoidance of landfill gas emissions by passive aeration of landfills',
  'AM0112 Less carbon intensive power generation through continuous reductive distillation of waste',
  'AMS-III.AF. Avoidance of methane emissions through excavating and composting of partially decayed municipalsolid waste (MSW)',
  'AMS-III.AJ. Recovery and recycling of materials from solid wastes',
  'AMS-III.AO. Methane recovery through controlled anaerobic digestion',
  'AMS-III.AQ. Introduction of Bio-CNG in transportation applications',
  'AMS-III.AX. Methane oxidation layer (MOL) for solid waste disposal sites',
  'AMS-III.BA. Recovery and recycling of materials from E-waste',
  'AMS-III.BJ. Destruction of hazardous waste using plasma technology including energy recovery',
  'AMS-III.D. Methane recovery in animal manure management systems',
  'AMS-III.E. Avoidance of methane production from decay of biomass through controlled combustion, gasification or mechanical/thermal treatment',
  'AMS-III.F. Avoidance of methane emissions through composting',
  'AMS-III.G. Landfill methane recovery',
  'AMS-III.H. Methane recovery in wastewater treatment',
  'AMS-III.I. Avoidance of methane production in wastewater treatment through replacement of anaerobic systems by aerobic systems',
  'AMS-III.L. Avoidance of methane production from biomass decay through controlled pyrolysis',
  'AMS-III.O. Hydrogen production using methane extracted from biogas',
  'AMS-III.Y. Methane avoidance through separation of solids from wastewater or manure treatment systems',
  'AR-ACM0003 Afforestation and reforestation of lands except wetlands',
  'AR-AM0014 Afforestation and reforestation of degraded mangrove habitats',
  'AR-AMS0003 Afforestation and reforestation project activities implemented on wetlands',
  'AR-AMS0007 Afforestation and reforestation project activities implemented on lands other than wetlands',
  'FCC Forest Carbon Code (Skógarkolefni)',
  'ACM0010 GHG emission reductions from manure management systems',
  'ACM0017 Production of biofuel',
  'AM0073 GHG emission reductions through multi-site manure collection and treatment in a central plant',
  'AM0089 Production of diesel using a mixed feedstock of gasoil and vegetable oil',
  'AMS-I.G. Plant oil production and use for energy generation in stationary applications',
  'AMS-I.H. Biodiesel production and use for energy generation in stationary applications',
  'AMS-II.F. Energy efficiency and fuel switching measures for agricultural facilities and activities',
  'AMS-III.A. Offsetting of synthetic nitrogen fertilizers by inoculant application in legumes-grass rotations on acidic soils on existing cropland',
  'AMS-III.AK. Biodiesel production and use for transport applications',
  'AMS-III.AU. Methane emission reduction by adjusted water management practice in rice cultivation',
  'AMS-III.BE. Avoidance of methane and nitrous oxide emissions from sugarcane pre-harvest open burning through mulching',
  'AMS-III.BF. Reduction of N2O emissions from use of Nitrogen Use Efficient (NUE) seeds that require less fertilizer application',
  'AMS-III.BK. Strategic feed supplementation in smallholder dairy sector to increase productivity',
]

export const TX_TYPE = {
  CREATE_PROJECT: 0,
  UPDATE_PROJECT: 1,
  CONFIRM_VERIFIER: 2,
  VERIFIER_VERIFIES_REPORT: 4,
  //Registry is assigned to the project(Currently happening automatically from BE)
  REGISTRY_GETS_UPDATED: 3,
  REGISTRY_VERIFIES_REPORT: 6,
}

export const SDGSLIST = [
  {
    key: 1,
    name: ' No Poverty',
    image: Images.one,
  },
  {
    key: 2,
    name: 'Zero Hunger',
    image: Images.two,
  },
  {
    key: 3,
    name: 'Good Health and Well-being',
    image: Images.three,
  },
  {
    key: 4,
    name: 'Quality Education',
    image: Images.four,
  },
  {
    key: 5,
    name: 'Gender Equality',
    image: Images.five,
  },
  {
    key: 6,
    name: 'Clean Water and Sanitation',
    image: Images.six,
  },
  {
    key: 7,
    name: 'Affordable and Clean Energy',
    image: Images.seven,
  },
  {
    key: 8,
    name: 'Decent Work and Economic Growth',
    image: Images.eight,
  },
  {
    key: 9,
    name: 'Industry, Innovation and Infrastructure',
    image: Images.nine,
  },
  {
    key: 10,
    name: 'Reduced Inequality',
    image: Images.ten,
  },
  {
    key: 11,
    name: 'Sustainable Cities and Communities',
    image: Images.eleven,
  },
  {
    key: 12,
    name: 'Responsible Consumption and Production',
    image: Images.twelve,
  },
  {
    key: 13,
    name: 'Climate Action',
    image: Images.thirteen,
  },
  {
    key: 14,
    name: 'Life Below Water',
    image: Images.forteen,
  },
  {
    key: 15,
    name: 'Life on Land',
    image: Images.fifteen,
  },
  {
    key: 16,
    name: 'Peace and Justice Strong Institutions',
    image: Images.sixteen,
  },
  {
    key: 17,
    name: 'Partnerships to achieve the Goal',
    image: Images.seventeen,
  },
]
export const availableFilters: any = {
  // 'Project Type': [
  //   'Registered or Active Project',
  //   'Provisional Project or Future Project',
  // ],

  'Credit Type': ['Carbon Credit', 'Biodiversity Credit', 'Plastics Credit'],

  'Project Categories': [
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

  'Verification Standard': [
    // 'Verra Registry',
    // 'Gold Registry',
    // 'BioCarbon Registry',
    'ICR',
  ],
}

export const DASHBOARDTABLIST = [
  {
    status: 1,
    TabName: 'New',
  },
  {
    status: 2,
    TabName: 'Verification',
  },
  {
    status: 3,
    TabName: 'Registered',
  },
]

export const TRACEABILITY_TAB_NAMES = {
  CREATE_PROJECT: { type: 'createProject', tabName: 'Project Created' },
  VERIFIER_REQUEST: {
    type: 'verifierRequest',
    tabName: 'Request sent to Potential Verifiers',
  },
  VERIFIER_ACCEPTED: {
    type: 'verifierAccepted',
    tabName: 'Verifier Accepted Project Request',
  },
  VERIFIER_ASSIGN: {
    type: 'verifierAssign',
    tabName: 'Verifier Finalised for the Project',
  },
  UPDATE_PROJECT_FINAL_PDF: {
    type: 'updateProjectGenerateFinalPdf',
    tabName: 'PDF generated for the Project',
  },
  PROJECT_VERIFIED: {
    type: 'projectVerified',
    tabName: 'Verifier verified the Project',
  },
  DEPLOY_TOKEN: { type: 'deployToken', tabName: 'Carbon Token Deployed' },
  PROJECT_MINTED: {
    type: 'projectMinted',
    tabName: 'Carbon Tokens Minted for the Project',
  },
  REGISTRY_UPLOADS_REPORT: {
    type: 'registry_uploads_report',
    tabName: 'Registry Uploads Report',
  },
}

export const IMAGE_SIZE_PREFIXES = {
  THUMBNAIL: 'thumbnail-',
  SMALL: 'small-',
  LARGE: 'large-',
  HD: 'hd-',
}

export const REGISTRYDASHBOARDTABLIST = [
  {
    status: 1,
    TabName: 'New',
  },
  {
    status: 2,
    TabName: 'Reviewed',
  },
]
