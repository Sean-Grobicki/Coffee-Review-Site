import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { post } from '../../api/apiRequests';
import { getToken } from '../../api/asyncStorage';

class Camera extends Component {

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      await this.addPicture(data);
    }
  }

  async addPicture(data) {
    const locID = this.props.route.params.locID;
    const revID = this.props.route.params.revID;
    const route = '/location/'+ locID + '/review/' + revID + '/photo';
    const token = await getToken();
    let headers = {};
    headers = { 'X-Authorization': token, 'Content-Type': 'image/jpeg' };
    const body = data;
    const response = await post(route, headers, body);
    if (response.code === 200) {
      this.props.navigation.goBack();
    } else if (response.code === 400) {
      Alert.alert('A bad request was sent to the server');
    } else if (response.code === 401) {
      Alert.alert('You are unauthorised to add this photo');
    } else if (response.code === 404) {
      Alert.alert('The review trying to be edited cannot be found');
    } else {
      Alert.alert('Server Error');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio={false}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => this.takePicture()}
            style={styles.capture}
          >
            <Text style={{ fontSize: 16 }}>
              CAPTURE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1,
      flexDirection: 'column',
    },
    preview:
    {
      flex: 7,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture:
    {
      flex: 1,
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  },
);

export default Camera;
