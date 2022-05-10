import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesListScreen from "../Screen/PlacesListScreen";
import NewPlaceScreen from "../Screen/NewPlaceScreen";
import PlaceDetailScreen from "../Screen/PlaceDetailScreen";
import MapScreen from "../Screen/MapScreen";
import Colors from "../Constant/Colors";

const HeaderStyle = {
  headerTitleAlign: "center",
  headerTintColor: Colors.gray700,
  headerStyle: {
    backgroundColor: Colors.primary700,
  },
  headerTitleStyle: {
    fontWeight: "900",
    fontSize: 20,
  },
};

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={HeaderStyle}>
        <Stack.Screen name="All Places" component={PlacesListScreen} />
        <Stack.Screen name="Add Place" component={NewPlaceScreen} />
        <Stack.Screen name="Place Details" component={PlaceDetailScreen} />

        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
