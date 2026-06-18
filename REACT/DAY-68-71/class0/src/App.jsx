import Button from "./components/Button";
import Card from "./components/Card";
import Home from "./components/Home";
import Nav from "./components/Nav";
import './index.css'

const App = () => {

  const users = ["Aryan", "Pratha", "Bixi"]

  return (
    <div className="h-[100vh] w-[100vw] bg-black text-white">
      <Nav />
      <h1>hello, from App</h1>
      {Home(10,7)}

      <Button text="click me" />
      <Button text="Know More" />

      {users.map((user, idx) => {
        return <Card name={user} id={idx} key={idx}/>
      })}

    </div>
  );
};

export default App;