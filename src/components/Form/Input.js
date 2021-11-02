import React, {Children} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
//import {t} from 'react-native-tailwindcss';
import jsHelper from '../../../utilities';

export default function Input(props) {
  const [value, setValue] = React.useState(
    props.isCurrency
      ? jsHelper.getCurrencyFormat(
          jsHelper.getEnglishDigit(props.value, true, false, props.isSigned),
        )
      : props.value,
  );

  const onChangeText = text => {
    if (props.isCurrency) {
      text = jsHelper.getCurrencyFormat(
        jsHelper.getEnglishDigit(text, true, false, props.isSigned),
      );
    }
    props.onChangeText(text);
    setValue(text);
  };

  React.useEffect(() => {
    if (props.isCurrency) {
      setValue(v =>
        jsHelper.getCurrencyFormat(
          jsHelper.getEnglishDigit(props.value, true, false, props.isSigned),
        ),
      );
    }
  }, [props.value]);

  return (
    <View
      style={[
        styles.wrapper,
        {width: props.wrapWidth || '100%'},
        props.wrapperStyle && props.wrapperStyle,
      ]}>
      {props.label && (
        <Text style={[styles.label, props.labelStyle && props.labelStyle]}>
          {props.label}
        </Text>
      )}
      {!props.children ? (
        <TextInput
          style={[
            styles.input,
            props.multiline && styles.inputMultiline,
            props.error && t.borderRed500,
            props.style,
          ]}
          {...props}
          onChangeText={onChangeText}
          value={value}
        />
      ) : (
        props.children
      )}
      {props.errorText && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    marginBottom: 1,
    marginTop: 1,
    paddingHorizontal: 1,
    alignSelf: 'flex-start',
  },
  input: {
    fontFamily: 'IRANSans',
    height: 35,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderColor: '#444',
  },
  inputMultiline: [{textAlignVertical: 'top', height: 'auto'}],
  label: {
    fontFamily: 'IRANSans',
    fontSize: 17,
    paddingHorizontal: 7,
    color: '#777',
  },
  errorText: {
    fontFamily: 'IRANSans',
    alignSelf: 'flex-end',
    paddingHorizontal: 7,
    position: 'absolute',
    bottom: -15,
    color: 'red',
  },
});
