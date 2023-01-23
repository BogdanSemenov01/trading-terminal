import React, { useEffect, useState } from 'react'
import { Instrument } from './Enums';




const Ticker = (props:any) => {
  let ws = props.ws
  
  const [isInstrumentOpen, setIsInstrumentOpen] = useState(false)
  const [isInstrument, setIsInstrument] = useState('')
  
  const toggleDropBox = () => {
    setIsInstrumentOpen(!isInstrumentOpen)
  }
  const changePrices = (message: any) => {
    let quotes = message.message.quotes
    let sell = quotes.bid
    let buy = quotes.offer
    setSellPrice(sell)
    setBuyPrice(buy)
  }

  
  const subscribeMarketData = (instrument:string, instrumentNumber: number) => {
    setIsInstrument(instrument)
    setIsInstrumentOpen(false)
    ws.subscribeMarketData(instrumentNumber)
  }

  const [id, setId] = useState(5)
  const makeSellOrder = () => {
    ws.placeOrder(1, 2, amount, sellPrice)
    const newOrder = {
      id: id, 
      creationTime: new Date().toJSON().slice(0, 10), 
      changeTime: new Date().toJSON().slice(11, 19), 
      status: 'active', 
      side: 'sell', 
      price: buyPrice, 
      amount: amount, 
      instrument: isInstrument
    }
    setId(prevState => prevState + 1)
    props.placeOrder((prevState:any) => [...prevState,newOrder])
  }

  const makeBuyOrder = () => {
    ws.placeOrder(1, 1, amount, buyPrice)
    const newOrder = {
      id: id, 
      creationTime: new Date().toJSON().slice(0, 10), 
      changeTime: new Date().toJSON().slice(11, 19), 
      status: 'active', 
      side: 'buy', 
      price: buyPrice, 
      amount: amount, 
      instrument: isInstrument
    }
    setId(prevState => prevState + 1)
    props.placeOrder((prevState:any) => [...prevState,newOrder])
  }

  const [sellPrice, setSellPrice] = useState(0)
  const [buyPrice, setBuyPrice] = useState(0)
  const [amount, setAmount] = useState(1)
  const onChangeInput = (e:any) => {
    setAmount(e.target.value)
  }

    useEffect(() => {
      ws.connect(changePrices)
      
    
      return () => {
        ws.disconnect()
      }
    }, [])
  
  return (
    <div className='tickerWrapper'>
      <div className='instrument input' onClick={toggleDropBox}>
      {!isInstrumentOpen ? (
        isInstrument || 'Choose instrument'
      ) : (<InstrumentDropBox chooseInstrument={subscribeMarketData}/>)}
        </div>
      <input className='amount input' value={amount} onChange={onChangeInput}/>
      <div className='actionSides'>
        <div className='sellSide'>
          <div className='price'>{sellPrice || '--'}</div>
          <button className='button' onClick={makeSellOrder} disabled={!isInstrument}>Sell</button>
        </div>
        <div className='buySide'>
          <div className='price'>{buyPrice || '--'}</div>
          <button className='button' onClick={makeBuyOrder} disabled={!isInstrument}>Buy</button>
        </div>
      </div>
    </div>
  )
}


const InstrumentDropBox = (props:any) => {
  return (
    <div className='dropbox'>
      <InstrumentComponent 
        instrument={Instrument[1]}
        instrumentNumber={1} 
        chooseInstrument={props.chooseInstrument}
      />
      <InstrumentComponent 
        instrument={Instrument[2]} 
        instrumentNumber={2} 
        chooseInstrument={props.chooseInstrument}
      />
      <InstrumentComponent 
        instrument={Instrument[3]} 
        instrumentNumber={3} 
        chooseInstrument={props.chooseInstrument}
      />
    </div>
  )
}

const InstrumentComponent = (props:any) => {
  const onClickAction = () => {
    props.chooseInstrument(props.instrument, props.instrumentNumber)
  }
  return (
    <div>
      <div onClick={onClickAction}>{props.instrument}</div>
    </div>
  )
}
export default Ticker