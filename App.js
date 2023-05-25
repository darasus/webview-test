import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View, Text, SafeAreaView, Linking } from "react-native";
import Constants from "expo-constants";
import { setupURLPolyfill } from "react-native-url-polyfill";
import { TextInput } from "@klarna/bubble-ui";

setupURLPolyfill();

function isValidUri(uri) {
  try {
    new URL(uri);
    return true;
  } catch (e) {
    return false;
  }
}

// export enum RedirectReturnUrl {
//   KLARNA = 'klarna://',
//   KLARNADEV = 'klarnadev://',
//   KLARNAYELLOW = 'klarnayellow://',
//   KLARNASTAGING = 'klarnastaging://',
//   KLARNAONEOFF = 'klarnaoneoff://',
// }

export default function App() {
  const [uri, setUri] = React.useState(
    // "https://rahlenjakob.github.io/universal-link-demo/"
    // "http://localhost:3000/universal-link-demo"
    "http://localhost:9999/playground/"
  );

  console.log(isValidUri(uri));

  return (
    <SafeAreaView style={{ flex: "1" }}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{`WebView URL: ${uri}`}</Text>
        </View>
        {isValidUri(uri) && (
          <WebView
            originWhitelist={[
              "http://",
              "https://",
              "intent://",
              "klarnadev://",
            ]}
            onShouldStartLoadWithRequest={(e) => {
              console.log(">>> e.url", e.url);

              if (e.url.startsWith("klarnadev://")) {
                Linking.openURL(e.url);
                return false;
              }

              return true;
            }}
            source={{
              uri,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    margin: 20,
    borderWidth: 2,
    borderRadius: 10,
  },
  labelContainer: {
    backgroundColor: "#000000",
    padding: 10,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
  labelText: {
    color: "#fff",
  },
  input: {
    width: 350,
    height: 44,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginStart: 20,
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
  },
});
