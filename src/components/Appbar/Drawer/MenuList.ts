import { linkLabels } from '../../../routes/pathNames'

const MENUS = {
  issuer_menus: [
    linkLabels.Dashboard,
    // linkLabels.Token_Contract,
    // linkLabels.My_Portfolio,
    linkLabels.All_Projects,
    linkLabels.Marketplace,
    linkLabels.Wallet,
  ],
  verifier_menus: [linkLabels.Dashboard,  linkLabels.All_Projects, linkLabels.Wallet],
  buyer_menus: [
    linkLabels.Dashboard,
    linkLabels.All_Projects,
    linkLabels.Marketplace,
    linkLabels.TokenRetirement,
    linkLabels.Wallet,
  ],
  registry_menus: [
    linkLabels.Dashboard,
    // linkLabels.Projects,
    linkLabels.All_Projects,
    linkLabels.Wallet,
  ],
}

export default MENUS
