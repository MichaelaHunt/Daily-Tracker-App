import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        gap: 8,
        minHeight: '100%',
      },
    sectionText: {
        fontSize: 17,
        fontWeight: 600,
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 32,
        fontWeight: 700,
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 8,
    },
    sectionMargin: {
        marginBottom: 16,
    },
    statusSaver: {
        backgroundColor: colors.background,
        height: 48,
        width: '100%'
    },
    homeSaver: {
        backgroundColor: colors.background,
        height: 24,
        width: '100%'
    },
});