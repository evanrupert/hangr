import * as React from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import Masonry from "react-native-masonry"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"
import { logoIgnite, heart } from "./"
import { BulletItem } from "../../components/bullet-item"
import { Api, Item } from "../../services/api"
import { save } from "../../utils/storage"
import { add, confirm } from "./"

const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.white,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  flex: 1,
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 14,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: "#000000",
}
const HOTBAR: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  borderColor: color.palette.lighterGrey,
  borderWidth: 1,
  backgroundColor: color.palette.offWhite,
  height: 80,
  flex: 1,
}
const HEADER_ITEM = {
  borderRadius: 50,
  width: 55,
  height: 55,
  margin: 10,
}
const ITEM: ImageStyle = {
  borderRadius: 10,
  height: 200,
  width: 150,
  margin: 6,
}

export interface SecondExampleScreenProps extends NavigationScreenProps<{}> {}

export class SecondExampleScreen extends React.Component<
  SecondExampleScreenProps,
  { items: Item[] }
> {
  constructor(props, context) {
    super(props, context)

    this.api = new Api()
    this.api.setup()

    this.state = {
      items: [],
      confirmed: true,
    }
  }

  openCamera = () => this.props.navigation.navigate("cameraScreen")

  demoReactotron = async () => {
    console.tron.log("Your Friendly tron log message")
    console.tron.logImportant("I am important")
    console.tron.display({
      name: "DISPLAY",
      value: {
        numbers: 1,
        strings: "strings",
        booleans: true,
        arrays: [1, 2, 3],
        objects: {
          deeper: {
            deeper: {
              yay: "👾",
            },
          },
        },
        functionNames: function hello() {},
      },
      preview: "More control with display()",
      important: true,
      image: {
        uri:
          "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
      },
    })
    // make an API call for the demo
    // Don't do API like this, use store's API
    const api = new Api()
    demo.setup()
    demo.getUser("1")
    // Let's do some async storage stuff
    await save("Cool Name", "Boaty McBoatface")
  }

  async componentDidMount() {
    try {
      const response = await this.api.getItems()
      let items

      if (response.kind == "ok") {
        items = response.items
        this.setState({ items })
      } else {
        console.warn(response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async recommend() {
    try {
      const response = await this.api.getRecommendation()
      let rec

      if (response.kind == "ok") {
        rec = response.recommendation
        console.warn(rec["top"]["item"]["url"])
        this.setState({
          confirmed: false,
          items: [rec["top"]["item"], rec["bottom"]["item"]],
        })
      } else {
        console.warn(response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async confirm() {
    try {
      const response = await this.api.confirmRecommendation(
        this.state.items[0]["id"],
        this.state.items[1]["id"],
      )
      this.setState({
        confirmed: true,
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    console.warn(this.state.items)
    return (
      <View style={FULL}>
        <Wallpaper />
        <SafeAreaView style={FULL}>
          <Screen style={CONTAINER} backgroundColor={color.transparent} preset="scrollStack">
            <Header
              headerTx="secondExampleScreen.header"
              leftIcon="camera"
              rightIcon="search"
              onLeftPress={this.openCamera}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />

            <ScrollView
              horizontal
              style={{ maxHeight: 80, flex: 0 }}
              showsHorizontalScrollIndicator={false}
            >
              <View style={HOTBAR}>
                <TouchableHighlight
                  onPress={
                    this.state.confirmed ? this.recommend.bind(this) : this.confirm.bind(this)
                  }
                >
                  <Image source={this.state.confirmed ? add : confirm} style={HEADER_ITEM} />
                </TouchableHighlight>
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
                <Image source={{ uri: "https://picsum.photos/200/300" }} style={HEADER_ITEM} />
              </View>
            </ScrollView>

            <ScrollView
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {this.state.items.map(item => <Image source={{ uri: item["url"] }} style={ITEM} />)}
            </ScrollView>
          </Screen>
        </SafeAreaView>
      </View>
    )
  }
}
