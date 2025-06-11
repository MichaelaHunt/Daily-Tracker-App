import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

function MealButton(props) {
    return (
        <>
            
                <View style={styles.mealButton}>
                    <View style={styles.rectangle}>
                    </View>
                    <Text>{props.label}</Text>
                </View>
        </>
    );
}

export default MealButton;

const styles = StyleSheet.create({
    mealButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    rectangle: {
        height: 73,
        width: 73,
        marginTop: 24,
        marginBottom: 8,
        borderRadius: 16,
        backgroundColor: colors.primaryAccent,
    },
});