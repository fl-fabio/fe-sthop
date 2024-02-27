import React, { useState, ChangeEvent } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import ContainerFluid from "./components/ContainerFluid/ContainerFluid";


function App() {

  const [padding, setPadding] = useState<number>(0)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPadding(Number(event.target.value));
    }
  return (
    <ContainerFluid>
              <Button>primary</Button>
              <Button backColor="secondary" padding="12">secondary</Button>
              <Button backColor="danger" padding="14">danger</Button>
              <br />
              <br />
              <br />
              <div className="d-flex align-items-baseline">
                <div style={{lineHeight: '17px'}}>Change padding</div>
                <input type="range" min="0" max="100" onChange={handleChange} style={{marginLeft: '10px' }}/>
              </div>
              <br />
              <div>
              <Button backColor="primary" padding={padding.toString()}>Padding</Button>
              </div>
    </ContainerFluid>
        


  );
}

export default App;
