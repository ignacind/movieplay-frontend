import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#03152D",
  },
  headerContainer: {
    width: wp("64%"),
    height: hp("5.2%"),
    flexDirection: "row",
    backgroundColor: "#CECECE",
    borderRadius: 10,
    alignItems: "center",
  },
  searchIcon: {
    marginLeft: wp("2%"),
  },
  inputContainer: {
    marginLeft: wp(".5%"),
    width: "81%",
  },
  inputText: {
    fontSize: hp("2%"),
    color: "#000",
  },
  filterBtn: {
    marginRight: wp("1.5%"),
  },
  noSearchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('25%'),
  },
  noSearchText: {
    color: 'white',
    fontSize: wp('6%'),
    marginBottom: hp('.5%'),
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: wp("10%"),
    justifyContent: "center",
  },
  noResultsText: {
    color: "#FAFAFA",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
});
