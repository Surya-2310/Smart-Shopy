import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";

function Dashboard() {


  const [chartData, setChartData] = useState("");

  const [totalProducts, setTotalProducts] = useState(0);

const [Totalsalesamount,setTotalsalesamount] = useState(0);

  const [TotalOrders, setTotalOrders] = useState(0);


  const navigate =useNavigate();
  
  useEffect(() => {

    axios.get("http://localhost:3000/orders")
      .then((res) => {

        const data = res.data;

        setTotalOrders(data.length);


        let total =0;

        
        const chart = [["Customer", "Amount"]];

      
        data.forEach((order) => {

          chart.push([order.name,order.price]);

    setChartData(chart);

           total += order.price;

        });


        setTotalsalesamount(total);
        console.log(total)
        setChartData(chart);

      })
  }, []);

  useEffect(() => {

  axios.get("http://localhost:3000/product")


    .then((res) => {

      const product = res.data;

      setTotalProducts(product.length);

    })
    .catch((err) => console.log(err));

}, []);

  return (
   <div className="dashboard-container">

  <div className="dashboard-cards">

    <h3 className="chart-product">Total Products: {totalProducts}</h3>

    <h3 className="chart-order"> Total Orders: {TotalOrders}</h3>

    <h3 className="chart-amount">Sales Amount: ₹{Totalsalesamount}</h3>

  </div>

  <h2 className="chart-title">Orders with customer</h2>

<div className="charts-container">
  <>
  <Chart className="charts"
    chartType="PieChart"
     width="600px"
    height="500px"
    data={chartData}
  />
 <Chart className="columcharts"
    chartType="ColumnChart"
     width="600px"
    height="500px"
    data={chartData}
  />

  </>

</div>

 <button className="Dash-btn" onClick={() => navigate("/AddProduct")}>Add Product</button>
  
</div>
  );
}

export default Dashboard;