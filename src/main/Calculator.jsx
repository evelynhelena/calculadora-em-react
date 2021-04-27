import React, {Component} from 'react';
import Button from '../components/Button';
import Display from '../components/Display';
import './Calculator.css';

const initialSatate = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0,
}

export default class Calculator extends Component{

    state = { ...initialSatate }


    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory(){
        this.setState({...initialSatate});
    }
    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation,current: 1, clearDisplay: true})
        }else{
           const result = operation === '='
           const currentOperation = this.state.operation;

           const values = [...this.state.values];
           try{
            switch (currentOperation){
                case '+':
                    values[0] = values[0] + values[1];
                break;

                case '-':
                    values[0] = values[0] - values[1];
                break;

                case '*':
                    values[0] = values[0] * values[1];
                break;

                case '/':
                    values[0] = values[0] / values[1];
                break;
            }
           }catch(e){
               values[0] =this.state.values;
           }
           values[1] = 0;
           this.setState({
               displayValue: values[0],
               operation: result ? null :  operation,
               current: result ? 0 : 1,
               clearDisplay: !result,
               values,
           });
        }
    }
    addDigit(n){
        if(n == '.' && this.state.displayValue.includes('.')){
            return //para parar a função aqui
        }
        const clearDisplay = this.state.displayValue === "0" ||
            this.state.clearDisplay;
        const currentValue = clearDisplay ? "" : this.state.displayValue;
        const displayValue = currentValue + n
        this.setState({displayValue,clearDisplay: false});

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values];
            values [i] = newValue;
            this.setState({values});
        }

    }
    render(){
        return(
            <div className='calculadora'>
                <Display value={this.state.displayValue} />
                <Button label='AC' click={this.clearMemory} triple/>
                <Button label='/'  click={this.setOperation} operation/>
                <Button label='7'  click={this.addDigit}/>
                <Button label='8'  click={this.addDigit}/>
                <Button label='9'  click={this.addDigit}/>
                <Button label='*'  click={this.setOperation} operation/>
                <Button label='4'  click={this.addDigit}/>
                <Button label='5'  click={this.addDigit}/>
                <Button label='6'  click={this.addDigit}/>
                <Button label='-'  click={this.setOperation} operation/>
                <Button label='1'  click={this.addDigit}/>
                <Button label='2'  click={this.addDigit}/>
                <Button label='3'  click={this.addDigit}/>
                <Button label='+'  click={this.setOperation} operation/>
                <Button label='0'  click={this.addDigit} double/>
                <Button label='.'  click={this.addDigit}/>
                <Button label='='  click={this.setOperation} operation/>
            </div>
        )
    }
}