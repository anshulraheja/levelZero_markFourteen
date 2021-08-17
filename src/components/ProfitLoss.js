import { useState } from "react";

const initialValues = {
  purchasePrice: "",
  quantity: "",
  currentPrice: ""
};

const initialOutput = {
  percentChange: "",
  amountChange: ""
};
export default function ProfitLoss() {
  const [values, setValues] = useState(initialValues);
  const [output, setOutput] = useState(initialOutput);

  function inputHandler(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function checkProfitLoss() {
    const oldPrice = Number(values.purchasePrice);
    const quant = Number(values.quantity);
    const newPrice = Number(values.currentPrice);

    if (oldPrice > 0 && quant > 0 && newPrice > 0) {
      //loss
      if (oldPrice > newPrice) {
        const loss = (oldPrice - newPrice) * quant;
        const lossPercent = (loss / oldPrice) * 100;
        setOutput({
          percentChange: lossPercent,
          amountChange: loss
        });
        console.log("loss");
      }
      //profit
      else if (newPrice > oldPrice) {
        const profit = (newPrice - oldPrice) * quant;
        const profitPercent = (profit / oldPrice) * 100;
        setOutput({
          percentChange: profitPercent,
          amountChange: profit
        });
        console.log("profit");
      } else {
        console.log("nil");
      }
    } else {
      console.log("values should be greater than zero");
    }
  }
  return (
    <>
      <div>
        <input
          type="number"
          name="purchasePrice"
          value={values.purchasePrice}
          onChange={inputHandler}
          placeholder="Enter purchase price"
        />
        <input
          type="number"
          name="quantity"
          value={values.quantity}
          onChange={inputHandler}
          placeholder="Enter quantity"
        />
        <input
          type="number"
          name="currentPrice"
          value={values.currentPrice}
          onChange={inputHandler}
          placeholder="Enter current price"
        />
      </div>
      <button onClick={checkProfitLoss}>check</button>
      <div>
        <h1>%: {output.percentChange}</h1>
        <h2>Amount:{output.amountChange}</h2>
      </div>
    </>
  );
}
