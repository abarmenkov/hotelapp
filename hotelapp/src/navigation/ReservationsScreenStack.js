import { createStackNavigator } from "@react-navigation/stack";
//import { ReservationsScreen } from "../screens/Reservations/ReservationsScreen";
import { AddReservationScreen } from "../screens/Reservations/AddReservationScreen";
//import { ReservationsTopBarStack } from "./ReservationsTopTabStack";
//import { SearchbarComponent } from "../components/SearchBar";
import { CleaningScreen } from "../screens/Housekeeping/CleaningScreen";
import { AddServiceTaskScreen } from "../screens/Housekeeping/AddServiceTask";
import { ReservationsTabViewScreen } from "../screens/Reservations/ReservationsTabViewScreen";
import Account from "../screens/Account";
import ServiceGroupScreen from "../screens/ServiceGroupScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import SimpleTestScreen from "../screens/TestScreens/SimpletestScreen";


const Stack = createStackNavigator();

export const ReservationsStackNavigator = ({ route }) => {
  //console.log(route.name);
  return (
    <Stack.Navigator
      //initialRouteName="CleaningScreen"
      initialRouteName="ReservationsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ReservationsScreen"
        //component={Account}
        //component={SimpleTestScreen}
        component={ReservationsTabViewScreen}
        //options={{ header: ({ props }) => null }}
      />
      <Stack.Screen
        name="AddReservation"
        component={AddReservationScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <MaterialCommunityIcons name="close" size={24} />
          ),
        }}
      />
      <Stack.Screen
        name="ServiceGroup"
        component={ServiceGroupScreen}
        options={{
          headerShown: true,
          headerLeft: () => null, //чтобы скрыть кнопку назад Expo, Android
          //headerBackVisible: false, // не скрывает назад
          //headerBackTitleVisible: false, // не скрывает назад
        }}
      />
      <Stack.Screen
        name="CleaningScreen"
        component={CleaningScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AddServiceTaskScreen"
        component={AddServiceTaskScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
// вызов вложенного скрина в Stack из другого Stacka, back возвращается на initialRoute, а не страницу вызова, backbehavior='none' в drawer - не помогает
/*<Stack.Screen
        name="AddReservationScreen"
        component={AddReservationScreen}
        options={{ headerShown: true }}
      />*/
