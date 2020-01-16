let args = process.argv.splice(2,7)

let command = args[0]

let Controller = require('./Controller')

console.log('==================== BOOK STORE =======================')
switch(command) {
    case "login":
        Controller.login(args[2],args[3])
        break;
    case "signup":
        Controller.signup(args[2],args[3],args[4])
        break;
    case "logout":
        Controller.logout()
        break;
    case "topup":
        Controller.topup(args[1])
        break;
    case "show":
        Controller.showBook(args[2])
        break;
    case "buy":
        Controller.buy(args[2],args[3])
        break;
    case "help":
        Controller.help()
        break;
    default:
        console.log('input true command')
        break;
}