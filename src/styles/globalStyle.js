import { StyleSheet } from 'react-native';

const styles = StyleSheet.create(
  {
    button: {
      borderWidth: 2,
      borderColor: 'black',
      padding: '2%',
      borderRadius: 5,
      margin: '5%',
    },
    buttonText: {
      fontFamily: 'monospace',
      textAlign: 'center',
      fontWeight: '400',
    },
    title:
    {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: '500',
      fontFamily: 'monospace',
    },
    text: {
      fontFamily: 'monospace',
    },
    con: {
      backgroundColor: 'ghostwhite',
      height: '100%',
    },
    pages:
    {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: 'red',
    },
    pageText:
    {
      fontFamily: 'monospace',
      textAlign: 'center',
    },
    pageButtons:
    {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      marginHorizontal: '5%',
      marginVertical: '2%',
      backgroundColor: 'ghostwhite',
    },
  },
);

export default styles;
