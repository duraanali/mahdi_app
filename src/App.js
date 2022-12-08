import "./styles.css";
import UserLocator from "./UserLocator";
export default function App() {
  return (
    <div className="App">
      <h1>Mahdi's App</h1>
      <div className="location">
        <UserLocator />
      </div>
    </div>
  );
}
