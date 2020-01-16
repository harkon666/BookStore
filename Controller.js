let Model = require("./Model")
let View = require("./View")

class Controller {
    static signup(name,username,password) {
        Model.signup(name,username,password, (err, message) => {
            if (err) {
                console.log(err)
            } else {
                View.signup(message) 
            }
        })
    }

    static login(username,password) {
        Model.login(username,password , (err, message) => {
            if (err) {
                console.log(err)
            } else {
                View.login(message)
            }
        })
    }

    static logout() {
        Model.logout((err, message) => {
            if (err) {
                console.log(err)
            } else {
                View.logout(message)
            }
        })
    }

    static topup(saldo) {
        Model.topup(saldo,(err,message) => {
            if (err) {
                console.log(err)
            } else {
                View.topup(message)
            }
        })
    }

    static showBook(name) {
        Model.showBook(name,(err,message) => {
            if (err) {
                console.log(err)
            } else {
                View.showBook(message)
            }
        })
    }

    static buy(nameOrId, qtt) {
        Model.buy(nameOrId, qtt, (err,message) => {
            if (err) {
                console.log(err)
            } else {
                View.buy(message)
            }
        })
    }

    static help() {
        View.help()
    }
}

module.exports = Controller;