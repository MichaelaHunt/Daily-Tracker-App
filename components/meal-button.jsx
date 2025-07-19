import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function MealButton(props) {
    return (
        <>
            <View style={styles.mealButton}>
                <View style={styles.rectangle}>
                    <FontAwesomeIcon icon={props.innerIcon} size={28} color={colors.icons} style={styles.icon}></FontAwesomeIcon>
                </View>
                <Text style={{ color: colors.textOnBackground }}>{props.label}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mealButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    rectangle: {
        height: 68,
        width: 68,
        marginTop: 24,
        marginBottom: 8,
        borderRadius: 16,
        backgroundColor: colors.squareButtonBackground,
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        top: 20,
        left: 20,
    },

});