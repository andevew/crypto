import {Card} from "antd";
import '../css/CurrencyCard.css';

export default function CurrencyCard(props) {
  
  const {currency} = props;
  
  return (

    <Card className="card"
      title={
        <div className="card-header">
           <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt='logo'/>
           <span>{currency.name}</span>
        </div>
      }
      extra={<a href="#">More</a>}
      style={{
        width: 300,
      }}
    >
      <p>Price: {parseFloat(currency.quote.USD.price.toPrecision(6))}$</p>
    </Card>

  )
}


