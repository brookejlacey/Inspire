import { AppState } from "../AppState.js";
import { setHTML } from "../utils/Writer.js";

function _drawAccount() {
  if (!AppState.account) { return }
  setHTML('account-welcome', AppState.account.AccountCardTemplate)
}

export class AccountController {
  constructor() {
    AppState.on('account', _drawAccount)
    _drawAccount()
  }

}
