const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ port: 8080 })

wss.on("connection", onConnect);

const state = {
    instruments: [
        {id: 0, sellPrice: 10, buyPrice: 15},
        {id: 1, sellPrice: 20, buyPrice: 35},
        {id: 2, sellPrice: 30, buyPrice: 45},
    ]
}

const subscriber = {
    subscribeId: 0,
    isSubscribe: false,
    instrument: 0,
}

setInterval(() => {
    state.instruments[0].sellPrice++
    state.instruments[0].buyPrice++
    state.instruments[1].sellPrice++
    state.instruments[1].buyPrice++
    state.instruments[2].sellPrice++
    state.instruments[2].buyPrice++
}, 1000);


function onConnect(wsClient) {
    wsClient.on('message', function(message) {
        message = JSON.parse(message.toString('utf-8'))
        switch (message.messageType) {
            case 1:
                state.instruments.map(i => {
                    if (i.id === message.message.instrument) {
                        wsClient.send(JSON.stringify({messageType: 1, message: {subscriptionId: 1}}))
                        subscriber.subscribeId = i.id
                        subscriber.isSubscribe = true
                        subscriber.instrument = i.id
                    }
                })
            break;
            case 2:
                
            break;
            case 3:
                
            break;
        
            default:
                break;
        }
    })
    wsClient.on('close', function() {
        console.log('Пользователь отключился');
        subscriber.subscribeId = 0
        subscriber.isSubscribe = false
        subscriber.instrument = 0
        })

        setInterval(() => {
            if (subscriber.isSubscribe) {
                wsClient.send(JSON.stringify({messageType: 4, message: {subscriptionId: subscriber.subscribeId, instrument: subscriber.instrument, quotes: {bid: state.instruments[subscriber.subscribeId].sellPrice, offer: state.instruments[subscriber.subscribeId].buyPrice, minAmount: 1, maxAmount: 100}}}))
            }
        }, 1000);
  }