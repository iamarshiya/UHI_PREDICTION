function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Average Heat Index</h3>
          <p>42°C</p>
        </div>

        <div className="card">
          <h3>High Risk Zones</h3>
          <p>18 Areas</p>
        </div>

        <div className="card">
          <h3>Population Exposed</h3>
          <p>1.2 Million</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;