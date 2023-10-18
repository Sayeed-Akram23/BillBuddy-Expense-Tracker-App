import React from "react";
import { Progress } from "antd";
// import transactionModel from "../../../models/transactionModel";

//Total transactions
const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "tip",
    "food",
    "movie",
    "bills",
    "fees",
    "others",
  ];
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  // Total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnOver = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnOver = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnOverPercent =
    (totalIncomeTurnOver / totalTurnover) * 100;
  const totalExpenseTurnOverPercent =
    (totalExpenseTurnOver / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions: {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransactions.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total TurnOver: {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTurnOver.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTurnOver.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnOverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnOverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4">
          <h4>CategoryWise Income</h4>
          {categories.map(category => {
            const amount = allTransaction
              .filter
                (transaction =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount >0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                    percent={((amount/totalIncomeTurnOver)*100).toFixed(0)}/>
                  </div>
                </div>
                )
              );
          })}
        </div>
        <div className="col-md-4">
          <h4>CategoryWise Expense</h4>
          {categories.map(category => {
            const amount = allTransaction
              .filter
                (transaction =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount >0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                    percent={((amount/totalExpenseTurnOver)*100).toFixed(0)}/>
                  </div>
                </div>
                )
              );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
