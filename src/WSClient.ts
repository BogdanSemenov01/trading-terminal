import {ClientMessage} from "./Models/ClientMessages";
import {ClientMessageType, Instrument, OrderSide, ServerMessageType} from "./Enums";
import Decimal from "decimal.js";
import {ServerEnvelope} from "./Models/ServerMessages";

export default class WSConnector {

  connection: WebSocket | undefined;

  constructor() {
    this.connection = undefined;
  }

  connect = (callback:any) => {
    this.connection = new WebSocket("ws://localhost:8080");
    this.connection.onclose = () => {
      this.connection = undefined;
    };

    this.connection.onerror = () => {
    };

    this.connection.onopen = () => {
    };

    this.connection.onmessage = (event) => {
      const message: ServerEnvelope = JSON.parse(event.data);
      switch (message.messageType) {
        case ServerMessageType.success:
          break;
        case ServerMessageType.error:

          break;
        case ServerMessageType.executionReport:

          break;
        case ServerMessageType.marketDataUpdate:
          callback(message)
          break;
      }
    };
  }

  disconnect = () => {
    this.connection?.close();
  }

  send = (message: ClientMessage) => {
    this.connection?.send(JSON.stringify(message));
  }

  subscribeMarketData = (instrument: Instrument) => {
    this.send({
      messageType: ClientMessageType.subscribeMarketData,
      message: {
        instrument,
      }
    });
  }

  unsubscribeMarketData = (subscriptionId: string) => {
    this.send({
      messageType: ClientMessageType.unsubscribeMarketData,
      message: {
        subscriptionId,
      }
    });
  }

  placeOrder = (instrument: Instrument, side: OrderSide, amount: number, price: number) => {
    this.send({
      messageType: ClientMessageType.placeOrder,
      message: {
        instrument,
        side,
        amount,
        price,
      }
    });
  }
}
