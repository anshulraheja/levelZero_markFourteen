import { useState } from "react";
import "./ProfitLoss.css";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
const initialValues = {
  purchasePrice: "",
  quantity: "",
  currentPrice: ""
};

const initialOutput = {
  percentChange: "",
  amountChange: ""
};

const year = new Date().getFullYear();

export default function ProfitLoss() {
  const [values, setValues] = useState(initialValues);
  const [output, setOutput] = useState(initialOutput);
  const [message, setMessage] = useState();
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
        setMessage("loss");
      }
      //profit
      else if (newPrice > oldPrice) {
        const profit = (newPrice - oldPrice) * quant;
        const profitPercent = (profit / oldPrice) * 100;
        setOutput({
          percentChange: profitPercent,
          amountChange: profit
        });
        setMessage("profit");
      } else {
        setOutput({
          percentChange: 0,
          amountChange: 0
        });
        setMessage("Neither profit nor loss");
      }
    } else {
      setMessage("values should be greater than zero");
    }
  }
  return (
    <>
      <div className="container">
        <div className="left-section">
          <div className="header">
            <p className="header-title">
              Stock App
              <span>
                <i>
                  <BsGraphUp />
                </i>
              </span>
            </p>
            <p className="header-text">Check your profit & loss</p>
          </div>
          <div className="footer">
            <p className="footer-text">© | {year} | anshulraheja</p>
            <div className="footer-social-wrapper">
              <a href="/">
                <AiOutlineTwitter />
              </a>
              <a href="/">
                <FaLinkedin />
              </a>
              <a href="/">
                <FaGithubSquare />
              </a>
            </div>
          </div>
        </div>
        <div className="right-section">
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
          <button onClick={checkProfitLoss} className="btn">
            check
          </button>
          <div className="ouput-container">
            {output.percentChange > 0 && (
              <p>
                The total {message} percent is {output.percentChange}%
              </p>
            )}
            {output.amountChange > 0 && (
              <p>
                The amount {message === "loss" ? "lost" : "gained"} is Rs{" "}
                {output.amountChange}
              </p>
            )}
            {output.percentChange === 0 && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
