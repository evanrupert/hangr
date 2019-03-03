import { createStackNavigator } from "react-navigation"
import { CameraScreen } from "../screens/camera-screen/camera-screen"
import { ExampleNavigator } from "./example-navigator"

export const RootNavigator = createStackNavigator(
  {
    exampleStack: { screen: ExampleNavigator },
    cameraScreen: { screen: CameraScreen },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
