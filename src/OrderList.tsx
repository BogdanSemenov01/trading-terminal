import React from 'react'

const OrderList = (props:any) => {

  const column = Object.keys(props.state[0])
  const thData = () => {
    return column.map((data:any) => {
      return <th key={data}>{data.toUpperCase()}</th>
    })
  }
  const tdData = () => {
    return props.state.map((data:any) => {
      return (
        <tr key={data.id}>
          {
            column.map((v:any)=>{
                return <td key={v}>{data[v]}</td>
            })
          }
        </tr>
      )
    })
  }
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>{thData()}</tr>
        </thead>
        <tbody>
          {tdData()}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList
