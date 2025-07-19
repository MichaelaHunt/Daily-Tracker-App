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
        marginLeft: 16,
        color: colors.textOnBackground,
    },
    labelText: {
        color: colors.textOnBackground,
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
        color: colors.textOnBackground,
    },
    sectionMargin: {
        marginBottom: 16,
    },
    statusSaver: {
        backgroundColor: colors.cardBackground,
        height: 32,
        width: '100%'
    },
    homeSaver: {
        backgroundColor: colors.background,
        height: 24,
        width: '100%'
    },
    button: {
        backgroundColor: colors.actionButtonBackground,
        // backgroundColor: 'transparent',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: colors.actionButtonText,
        fontSize: 16
    },
    card: {
        backgroundColor: colors.cardBackground,
        paddingVertical: 16,
        borderRadius: 16,
    }
});