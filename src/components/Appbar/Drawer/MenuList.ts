import { linkLabels } from '../../../routes/pathNames'

const MENUS = {
  issuer_menus: [
    linkLabels.Dashboard,
    linkLabels.Token_Contract,
    // linkLabels.My_Portfolio,
    linkLabels.Marketplace,
    linkLabels.Wallet,
  ],
  verifier_menus: [linkLabels.Dashboard],
  buyer_menus: [
    linkLabels.Dashboard,
    linkLabels.Marketplace,
    linkLabels.TokenRetirement,
  ],
}

export default MENUS
