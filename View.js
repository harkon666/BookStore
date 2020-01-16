class View {
    static signup(message) {
        console.log(message);
    }

    static login(message) {
        console.log(message);
    }

    static logout(message) {
        console.log(message);
    }

    static topup(message) {
        console.log(message);
    }

    static showBook(message) {
        for (let i = 0; i < message.length; i++) {
            console.log(`${message[i].id}, Nama: ${message[i].name}, Harga: ${message[i].harga} , qtt : ${message[i].qtt}`)
        }
    }

    static help() {
        console.log('hello, welcome to my bookstore')
        console.log('this is may help u for buy our books')
        console.log('1. you must sign in and top up for buy our books')
        console.log('if you havnt account: you can sign up like here :')
        console.log('node index.js signup data <name> <username> <password>')
        console.log('')
        console.log('2. you can login like here :')
        console.log('node.js login data <username> <password>')
        console.log('')
        console.log('3. you can topup like here :')
        console.log('node.js topup <nominal>')
        console.log('')
        console.log('4. you can see what books are available, like here :')
        console.log('node.js show ---- to see all our books')
        console.log('or')
        console.log('node.js show book <name that relate to book that we sell>')
        console.log('')
        console.log('5. if you ready to buy our books, you can buy like here :')
        console.log('node.js buy <name or id> <quantity>')
        console.log('')
        console.log('6. if you want to logout, you can logout like here :')
        console.log('node.js logout')
        console.log('Note: if you have book on chart but didnt want to buy it, the chart will be deleted')
        console.log('')
    }

    static buy(message) {
        console.log(message)
    }
}

module.exports = View;