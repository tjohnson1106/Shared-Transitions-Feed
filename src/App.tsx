import React, { Component, Fragment } from "react";
import { ScrollView, SafeAreaView, StatusBar, View } from "react-native";
// @ts-ignore
import { AppLoading, Asset, DangerZone } from "expo";

// import { Apps, Position, App as AppModel } from "./components/Model";
import AppModal, { AppModalProps } from "./components/AppModal";
import App from "./components/App";
import { Position } from "csstype";

const { Animated } = DangerZone;
const { Value } = Animated;

const apps: Apps = [
  {
    id: 0,
    title: "Namaste",
    subtitle: "Best Yoga apps for the summer",
    source: require("./assets/images/yoga.jpg"),
    content: ""
  },
  {
    id: 1,
    title: "Get Fit",
    subtitle: "Wear it while you work out",
    source: require("./assets/images/fitness.jpg"),
    content: ""
  },
  {
    id: 2,
    title: "Classic Games",
    subtitle: "They never get old",
    source: require("./assets/images/chess.jpg"),
    content: ""
  }
];

interface AppProps {}

interface AppState {
  ready: boolean;
  modal: AppModalProps | null;
}

class App extends Component {
  state = {
    ready: false,
    modal: null
  };

  async componentDidMount() {
    await Promise.all(apps.map((app) => Asset.loadAsync(app.source)));
    this.setState({ ready: true });
  }

  open = (app: AppModel, position: Position) => {
    this.setState({
      modal: { app, position }
    });
  };

  close = () => {
    this.setState({
      modal: null
    });
  };

  render() {
    const { open, close, activeAppId } = this;
    const { ready, modal } = this.state;

    if (!ready) {
      return <AppLoading />;
    }
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView />

        {/* Flatlist implement */}
        <ScrollView>
          {apps.map((app) => (
            <App key={app.id} {...{ app, open, activeAppId }} />
          ))}
        </ScrollView>

        {modal !== null && <AppModal {...modal} {...{ close }} />}
      </Fragment>
    );
  }
}

export default App;
