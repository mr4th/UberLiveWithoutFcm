import { Platform } from 'react-native';
import colors from './colors';

export default{
    container: {
		borderBottomColor: colors.lightgray,

		marginTop: 0,
		fontSize: 20,
		marginLeft:4,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
	},
}