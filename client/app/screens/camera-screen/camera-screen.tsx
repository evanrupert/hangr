import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle, View, TouchableOpacity, StyleSheet } from "react-native"
import { RNCamera } from "react-native-camera"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { Api } from "../../services/api"

export interface CameraScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

// @inject("mobxstuff")
// @observer
export class CameraScreen extends React.Component<CameraScreenProps, {}> {
  constructor(props, context) {
    super(props, context)
    this.camera = null
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, orientation: "portrait" }
      const data = await this.camera.takePictureAsync(options)

      const api = new Api()

      let url
      try {
        url = await api.uploadImage(data.uri)
      } catch (err) {
        console.warn(err)
      }
    }
  }

  render() {
    return (
      <Screen style={ROOT} preset="fixedCenter">
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={"We need your permission to use your camera phone"}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
          />
          <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
})
