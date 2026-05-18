import { useEffect, useState } from "react";

export default function Dashboard() {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleCount((prev) => prev + Math.floor(Math.random() * 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sendAlert = () => {
    const alert = {
      message: "Manual Emergency Alert Triggered",
      time: new Date().toLocaleTimeString(),
    };

    setAlerts((prev) => [alert, ...prev]);
    alert("Emergency alert sent!");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>AI CCTV Accident Detection Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <h2>Vehicle Count: {vehicleCount}</h2>
      </div>

      <div
        style={{
          background: "#000",
          color: "#fff",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        CCTV Feed Placeholder
      </div>

      <button
        onClick={sendAlert}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "red",
          color: "#fff",
          border: "none",
        }}
      >
        Send Manual Alert
      </button>

      <div style={{ marginTop: "20px" }}>
        <h2>Alerts</h2>

        {alerts.map((a, i) => (
          <div key={i}>
            {a.message} - {a.time}
          </div>
        ))}
      </div>
    </div>
  );
}
