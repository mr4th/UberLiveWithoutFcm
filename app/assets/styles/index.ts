import { StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";

export const PRIMARY_COLOR = "#DA315B";
export const SECONDARY_COLOR = "#140001";
export const WHITE = "#FFFFFF";
export const GRAY = "#757E90";
export const DARK_GRAY = "#363636";
export const BLACK = "#0e0000";

export const ONLINE_STATUS = "#32911D";
export const OFFLINE_STATUS = "#A94A50";

export const STAR_ACTIONS = "#FFA200";
export const LIKE_ACTIONS = "#B644B2";
export const DISLIKE_ACTIONS = "#311F20";
export const FLASH_ACTIONS = "#0F2FA2";

export const DIMENSION_WIDTH = Dimensions.get("window").width;
export const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
	// COMPONENT - CARD ITEM
	containerCardItem: {
		backgroundColor: colors.cardcolor,
		alignItems: "center",
		marginHorizontal: 10,
		marginVertical: -10,
		elevation: 1,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
		paddingVertical: 10,
		height: 470,
		borderTopLeftRadius: 8,
		borderTopEndRadius: 8,
	},
	matchesCardItem: {
		marginTop: 430,
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomEndRadius: 8,
		borderBottomLeftRadius: 8,
		marginHorizontal: 10,
		alignItems: "center",
	},
	matchesTextCardItem: {
		color: WHITE,
	},
	descriptionCardItem: {
		color: GRAY,
		textAlign: "center",
	},
	status: {
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	statusText: {
		color: GRAY,
		fontSize: 12,
	},
	online: {
		width: 6,
		height: 6,
		backgroundColor: ONLINE_STATUS,
		borderRadius: 3,
		marginRight: 4,
	},
	offline: {
		width: 6,
		height: 6,
		backgroundColor: OFFLINE_STATUS,
		borderRadius: 3,
		marginRight: 4,
	},
	actionsCardItem: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		backgroundColor: colors.cardcolor,
		marginHorizontal: 10,
		borderTopEndRadius: 20,
		borderTopLeftRadius: 20,
	},
	parentss: {
		backgroundColor: colors.black,
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: colors.secondary,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		elevation: 1,
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 },
	},
	miniButton: {
		width: 40,
		height: 40,
		borderRadius: 30,
		backgroundColor: WHITE,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		elevation: 1,
		flexDirection: "row",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 },
		position: "relative",
		zIndex: -100,
	},

	// COMPONENT - CITY
	city: {
		backgroundColor: WHITE,
		padding: 0,
		borderRadius: 20,
		width: 100,
		elevation: 1,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
	},
	cityText: {
		color: colors.primary,
		fontSize: 10,
		textAlign: "center",
	},

	// COMPONENT - FILTERS
	filters: {
		backgroundColor: WHITE,
		padding: 10,
		borderRadius: 20,
		width: 90,
		elevation: 1,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
	},
	filtersText: {
		color: colors.primary,
		fontSize: 10,
		textAlign: "center",
	},

	// COMPONENT - MESSAGE
	containerMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingHorizontal: 10,
		width: DIMENSION_WIDTH - 100,
	},
	avatar: {
		borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15,
	},
	message: {
		color: GRAY,
		fontSize: 12,
		paddingTop: 5,
	},

	// COMPONENT - PROFILE ITEM
	containerProfileItem: {
		backgroundColor: WHITE,
		paddingHorizontal: 10,
		paddingBottom: 25,
		margin: 20,
		borderRadius: 8,
		marginTop: -65,
		elevation: 1,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
	},
	matchesProfileItem: {
		width: 135,
		marginTop: -15,
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		alignSelf: "center",
	},
	matchesTextProfileItem: {
		color: WHITE,
		textAlign: "center",
	},
	name: {
		paddingTop: 25,
		paddingBottom: 5,
		color: DARK_GRAY,
		fontSize: 15,
		textAlign: "center",
	},
	descriptionProfileItem: {
		color: GRAY,
		textAlign: "center",
		paddingBottom: 20,
		fontSize: 13,
	},
	info: {
		paddingVertical: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	iconProfile: {
		fontSize: 12,
		color: DARK_GRAY,
		paddingHorizontal: 10,
	},
	infoContent: {
		color: GRAY,
		fontSize: 13,
	},

	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		backgroundColor: colors.blackalt,
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT,
	},
	top: {
		paddingTop: 50,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: { paddingBottom: 10, fontSize: 22, color: DARK_GRAY },

	chatHistoryTitle: { paddingBottom: 10, fontSize: 22, color: WHITE },

	// CONTAINER - HOME
	containerHome: {
		marginHorizontal: 10,
	},

	// CONTAINER - MATCHES
	containerMatches: {
		justifyContent: "space-evenly",
		// flex: 1,
		height: 630,
	},

	// CONTAINER - MESSAGES
	containerMessages: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: colors.blackalt,
	},

	// CONTAINER - PROFILE
	containerProfile: { marginHorizontal: 0 },
	photo: {
		width: DIMENSION_WIDTH,
		height: 450,
	},
	topIconLeft: {
		paddingLeft: 20,
	},
	topIconRight: {
		paddingRight: 20,
	},
	actionsProfile: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
	},
	textButton: {
		fontSize: 15,
		color: WHITE,
		paddingLeft: 5,
	},
	circledButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: PRIMARY_COLOR,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
		marginHorizontal: 7,
	},
	roundedButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: SECONDARY_COLOR,
		paddingHorizontal: 20,
	},

	// MENU
	tabButtonText: {
		textTransform: "uppercase",
	},
	iconMenu: {
		alignItems: "center",
	},
});
