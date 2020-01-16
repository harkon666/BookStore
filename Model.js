let fs = require('fs')
class Model {
    static readUsers(cb) {
        fs.readFile("./users.json","utf8", (err,data) => {
            if (err) {
                cb(err)
            } else {
                cb(err,JSON.parse(data))
            }
        })
    }

    static readUser(cb) {
        fs.readFile("./user.json", "utf8", (err,data) => {
            if (err) {
                cb(err)
            } else {
                cb(err, JSON.parse(data))
            }
        })
    }

    static readData(cb) {
        fs.readFile("./data.json","utf8", (err,data) => {
            if (err) {
                cb(err)
            } else {
                cb(err, JSON.parse(data))
            }
        })
    }

    static readChart(cb) {
        fs.readFile("./chart.json","utf8", (err,data) => {
            if (err) {
                cb(err)
            } else {
                cb(err, JSON.parse(data))
            }
        })
    }

    static signup(name,username,password,cb) {
        this.readUsers((err,data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data

                newData.push({
                    name: name,
                    username: username,
                    password: password,
                    saldo: 0
                })

                fs.writeFile("./users.json", JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cb(err,"your account has been created")
                    }
                })
            }
        })
    }

    static login(username,password,cb) {
        let dataLogin = {}
        let signin = false
        this.readUsers((err,data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                for (let i = 0; i < newData.length; i++) {
                    if (newData[i].username === username && newData[i].password === password) {
                        dataLogin.username = username
                        dataLogin.login = true
                        signin = true
                    }
                }
            }
        })

        this.readUser((err, data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                let show  = ''
            
                if (signin === true) {
                    show = 'Login Success'
                    newData.push(dataLogin)
                } else {
                    show = 'Wrong Username or Password'
                }
                fs.writeFile("./user.json", JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cb(err, show)
                    }
                })
            }
        })

    }

    static logout(cb) {
        let check = false
        this.readUser((err,data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                let show = ''
                
                if (newData.length === 1) {
                    newData = []
                    show = 'logout success'
                    check = true
                } else {
                    show = 'you havent login yet'
                }

                fs.writeFile("./user.json",JSON.stringify(newData), (err) => {
                    if (err){
                        console.log(err)
                    } else {
                        cb(err, show)
                    }
                })
            }
        })
        
        this.readChart((err,data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data

                if (check === true) {
                    newData = []
                }
                
                fs.writeFile("./chart.json", JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cb(err, '')
                    }
                })
            }
        })
    }

    static topup(saldo,cb) {
        let info = ''
        this.readUser((err,data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                info = newData[0].username
            }
        })

        this.readUsers((err, data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                for (let i = 0; i < newData.length; i++) {
                    if (newData[i].username === info) {
                        newData[i].saldo += Number(saldo)
                    }
                }

                fs.writeFile("./users.json", JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cb (err, 'Top-up Success')
                    }
                })
            }
        })
    }

    static showBook(name,cb) {
        this.readData((err,data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                let show
                if (name != undefined) {
                    show = newData.filter(value => value.name.toLowerCase().includes(name.toLowerCase()))
                } else {
                    show = newData
                }

                fs.writeFile("./data.json",JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cb(err, show)
                    }
                })
            }
        })
    }

    static buy(nameOrId, qtt, cb) {
        let show = []
        let info = ''
        let infoUser = '';
        let check = false
        let saldo = 0
        let checkSaldo = false
        let price = 0
        let success = false

        this.readUser((err, data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data

                if (newData[0] != undefined) {
                    check = true
                    infoUser = newData[0].username
                }
            }
        })

        this.readUsers((err,data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                
                if (check === true) {
                    for (let i = 0; i < newData.length; i++) {
                        if (infoUser === newData[i].username) {
                            saldo += newData[i].saldo
                        }
                    }
                }
            }
        })
        
        this.readData((err, data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                
                for(let i = 0; i < newData.length; i++) {
                    console.log(newData[i])
                    if (nameOrId === newData[i].name || Number(nameOrId) === newData[i].id) {
                        price = newData[i].harga * qtt
                        if (newData[i].qtt - Number(qtt) >= 0) {
                            if (check === true && saldo - (newData[i].harga * qtt) >= 0) {
                                newData[i].qtt -= qtt
                                saldo -= (newData[i] * qtt)
                                checkSaldo = true
                            }
                            show.push(newData[i])
                        }
                    }
                }

                fs.writeFile("./data.json",JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cb(err, '')
                    }
                })
            }
        })

        
        this.readChart((err, data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                if (show[0].qtt - Number(qtt) < 0) {
                    info = 'quantity is less than you want'
                } else if (check === false) {
                    info = 'You must login first'
                } else if (checkSaldo === false) {
                    info = 'Saldo mu tidak cukup'
                } else {
                    success = true
                    info = 'buy success'
                    show[0].qtt = qtt
                    newData.push(show[0])
                }

                fs.writeFile("./chart.json", JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cb(err, info)
                    }
                })
            }
        })

        this.readUsers((err,data) => {
            if (err) {
                console.log(err)
            } else {
                let newData = data
                if (success === true) {
                    for (let i = 0; i < newData.length; i++) {
                        if(infoUser === newData[i].username){
                            newData[i].saldo -= price
                        }
                    }
                }
                fs.writeFile("./users.json",JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cb(err, '')
                    }
                })
            }
        })
    }
}

module.exports = Model;