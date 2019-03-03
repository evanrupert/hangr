import { createStackNavigator } from "react-navigation"
import { Landing } from "../screens/landing"
import { SecondExampleScreen } from "../screens/second-example-screen"

export const ExampleNavigator = createStackNavigator(
  {
    firstExample: { screen: Landing },
    secondExample: { screen: SecondExampleScreen },
  },
  {
    headerMode: "none",
  },
)
