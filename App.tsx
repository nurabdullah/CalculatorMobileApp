import React, {useState} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Button from './components/Button.tsx';

const App = () => {
  const {width} = useWindowDimensions();
  const buttonContainerWidth = width / 4 - 5;
  const [firstValue, setFirstValue] = useState('');
  const [operator, setOperator] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [clearLabel, setClearLabel] = useState('AC');

  const numericAlphabet = [
    'AC',
    '+/-',
    '%',
    '÷',
    '7',
    '8',
    '9',
    'x',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    ',',
    '=',
  ];

  const calculate = (a = '', o = '', b = '') => {
    let result = 0;

    a = a.replace(',', '.');
    b = b.replace(',', '.');

    switch (o) {
      case '%':
        result = parseFloat(a) / 100;
        break;
      case '÷':
        result = parseFloat(a) / parseFloat(b);
        break;
      case 'x':
        result = parseFloat(a) * parseFloat(b);
        break;
      case '-':
        result = parseFloat(a) - parseFloat(b);
        break;
      case '+':
        result = parseFloat(a) + parseFloat(b);
        break;
    }

    result = result.toString().replace('.', ',');

    setFirstValue(result);
    setOperator('');
    setSecondValue('');
  };

  const onKeyPress = (key: string) => {
    switch (key) {
      case 'AC':
        setFirstValue('');
        setOperator('');
        setSecondValue('');
        break;
      case 'C':
        if (secondValue !== '') {
          setSecondValue('');
        } else {
          setFirstValue('');
        }
        setClearLabel('AC');
        break;
      case '+/-':
        if (firstValue !== '' || secondValue !== '') {
          if (firstValue !== '' && secondValue === '') {
            setFirstValue(parseFloat(firstValue * -1).toString());
          } else {
            setSecondValue(parseFloat(secondValue * -1).toString());
          }
        }
        break;
      case '%':
        calculate(firstValue, key, secondValue);
        break;
      case '÷':
      case 'x':
      case '-':
      case '+':
        if (secondValue !== '') {
          calculate(firstValue, operator, secondValue);
        } else {
          setOperator(key);
        }
        break;
      case '=':
        calculate(firstValue, operator, secondValue);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case ',':
        setClearLabel('C');
        if (operator === '') {
          setFirstValue(e => `${e}${key}`);
        } else {
          setSecondValue(e => `${e}${key}`);
        }
        break;
    }
  };

  const getDisplayText = () => {
    if (secondValue !== '') return secondValue;
    if (firstValue === '') return '0';
    return firstValue;
  };

  const getItemColorProperties = value => {
    if (value === 'AC' || value === 'C' || value === '+/-' || value === '%') {
      return {backgroundColor: '#A5A5A5', textColor: '#000'};
    } else if (
      value === '÷' ||
      value === 'x' ||
      value === '+' ||
      value === '-' ||
      value === '='
    ) {
      return {backgroundColor: '#FF9F0A', textColor: 'white'};
    }
    return {backgroundColor: '#333333', textColor: 'white'};
  };

  const calculatorKeyPress = item => {
    if (item === 'AC' || item === 'C') {
      return onKeyPress(clearLabel);
    }
    return onKeyPress(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{getDisplayText()}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          {numericAlphabet.map((item, index) => {
            return (
              <Button
                key={index}
                width={item === '0' ? width / 2 - 10 : buttonContainerWidth}
                h={item === '0' ? buttonContainerWidth : null}
                text={item === 'AC' ? clearLabel : item}
                backgroundColor={getItemColorProperties(item).backgroundColor}
                textColor={getItemColorProperties(item).textColor}
                onPress={() => calculatorKeyPress(item)}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  displayText: {
    fontSize: 70,
    color: 'white',
  },
  buttonsContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
