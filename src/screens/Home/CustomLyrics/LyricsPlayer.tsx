import {Picker} from '@react-native-picker/picker';
import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, TextInput, View} from 'react-native';

const programmingLanguages = [
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'JavaScript',
    value: 'js',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'Ruby',
    value: 'ruby',
  },
  {
    label: 'C#',
    value: 'csharp',
  },
  {
    label: 'C++',
    value: 'cpp',
  },
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'Go',
    value: 'go',
  },
];

export default class LyricsPlayer extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text1: '',
      text2: '',
      language: '',
      isTextInputVisible: false,
    };
  }

  render() {
    const {language} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Picker
            selectedValue={language}
            onValueChange={itemValue => this.setState({language: itemValue})}>
            {programmingLanguages.map((i, index) => (
              <Picker.Item key={index} label={i.label} value={i.value} />
            ))}
          </Picker>
          {language && (
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              onChangeText={text => this.setState({text1: text})}
              //   value={text1}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputContainer: {
    ...Platform.select({
      ios: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
      },
    }),
  },
  input: {
    height: 40,
  },
});
