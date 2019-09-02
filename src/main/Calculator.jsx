import React, { Component } from "react";
import "./Calculator.scss";
import "../components/Button.scss";
import "../components/Display.scss";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
};

export default class Calculator extends Component {
  state = { ...initialState };

  addDigit = n => {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay === true;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({displayValue,clearDisplay:false})

    if(n !== '.'){
        const i = this.state.current;
        const values = [...this.state.values];
        const newValue = parseFloat(displayValue);
        values[i] = newValue;
        this.setState({values})
        console.log(values)
    }
  };

  setOperation = operation => {
     if(this.state.current === 0){
        this.setState({operation,current:1,clearDisplay:true})
     } else {
         const equals = operation === '=';
         const currentOperation = this.state.operation;
         const values = [...this.state.values];

         values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)

         values[1] = 0;
         this.setState({
             displayValue:values[0],
             operation: equals ? null : operation,
             current: equals? 0 : 1,
             clearDisplay: !equals,
             values
         })
     }
  }

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  render() {
    return (
      <div className="container calculator">
        <div className="row">
          <div className="col">
            <Display value={this.state.displayValue} />
            <div className="row">
              <Button label="c" classe="clear" click={this.clearMemory} />
              <Button label="/" click={this.setOperation} />
              <Button label="*" click={this.setOperation} />
            </div>
            <div className="row">
              <Button label="7" click={this.addDigit} />
              <Button label="8" click={this.addDigit} />
              <Button label="9" click={this.addDigit} />
              <Button label="-" click={this.setOperation} />
            </div>
            <div className="row">
              <Button label="4" click={this.addDigit} />
              <Button label="5" click={this.addDigit} />
              <Button label="6" click={this.addDigit} />
              <Button label="+" click={this.setOperation} />
            </div>
            <div className="row">
              <Button label="1" click={this.addDigit} />
              <Button label="2" click={this.addDigit} />
              <Button label="3" click={this.addDigit} />
              <Button label="=" classe="enter" click={this.setOperation} />
            </div>
            <div className="row" style={{ marginTop: "-60px" }}>
              <Button label="0" classe="clear" click={this.addDigit} />
              <Button label="." click={this.addDigit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
