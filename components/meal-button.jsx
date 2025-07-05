import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../styles/colors';

function MealButton(props) {
    return (
        <>

            <View style={styles.mealButton}>
                <Image
                    style={styles.tinyLogo}
                    source={props.path}
                />
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
    tinyLogo: {
        height: 68,
        width: 68,
        marginTop: 24,
        marginBottom: 8,
        borderRadius: 16,
        backgroundColor: colors.primaryAccent,
    }
});