import { AuthController } from './controllers/AuthController.js';
import { router } from './router-config.js';

class App {

  AuthController = new AuthController()
  router = router

}


const app = new App()
// @ts-ignore
window.app = app
