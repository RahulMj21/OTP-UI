import OTP from "./components/OTP";

function App() {
  return (
    <main>
      <div className="container">
        <h1>Enter OTP</h1>
        <OTP length={4} />
      </div>
    </main>
  );
}

export default App;
