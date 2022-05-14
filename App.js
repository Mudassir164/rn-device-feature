import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./Navigation/Navigation";
import AppLoading from "expo-app-loading";
import { LogBox } from "react-native";
import { init } from "./Utility/db";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "EdgeInsetsPropType will be removed",
  "PointPropType will be removed",
]);

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setIsLoading(true);
      })
      .catch((err) => {
        console.log("the error is", err);
      });
  }, []);
  console.log(isLoading);

  // if (!isLoading) {
  //   return (
  //     <AppLoading startAsync={() => {}} onFinish={() => setIsLoading(true)} />
  //   );
  // }
  return <RootNavigation />;
}

// git remote add origin https://github.com/Mudassir164/rn-device-feature.git
// git branch -M main
// git push -u origin main
