import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import InputNumberButton from './InputNumberButton';

const buttons = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
]
export default class App extends Component {

  constructor() {
    super()
    this.initialState = {
      displayValue: '0',
      operator: null
    }
    this.state = this.initialState;
  }
  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumberButton 
        value={buttonItems}
        handleOnPress={this.handleInput.bind(this, buttonItems)}
        key={'btn-' + buttonIndex} />
      })
      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });
   return layouts
  }
  handleInput = (input) => {
    const { displayValue, operator } = this.state;
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
          this.setState({ 
            displayValue: (displayValue === '0') ? input : displayValue + input
          })
          break;
      case '+':
      case '-':
      case 'x':
      case '/':
          this.setState({
            operator: input,
            displayValue: (operator !== null ? displayValue.substr(0, displayValue.length-1) : displayValue) + input
          })
      case '.':
          let dot = displayValue.slice(-1)
          this.setState({
            displayValue: dot !== '.' ? displayValue + input : displayValue
          })
          break;
      case 'CLEAR':
          this.setState(this.initialState);
          break;
      case 'DEL':
          let string = displayValue.toString();
          let deletedString = string.substr(0, string.length - 1);
          let length = string.length;
          this.setState({
            displayValue: length == 1 ? '0' : deletedString
          })
      break;
    }
  }
  // handleInput = (input) => {
  //   const { displayValue } = this.state;
  //   this.setState({
  //     displayValue: (displayValue === '0') ? input : displayValue + input
  //   })
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}> 
            {this.state.displayValue}
          </Text>
        </View>

        <View style={styles.inputContainer}>
              {this.renderButtons()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#25292b'
  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#333333'
  },
  resultText: {
    color: '#727f85',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  }
});
