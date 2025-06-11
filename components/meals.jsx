import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MealButton from './meal-button';
import { globalStyles } from '../styles/globalStyles';
import { Link } from 'expo-router';

function MealSection() {
    return (
        <>
            <View style={[styles.mealsContainer, globalStyles.sectionMargin]}>
                <Text style={globalStyles.sectionText}>Meals</Text>
                <View style={styles.row}>
                    <Link href={{
                        pathname: "/enter-meal",
                        params: { mealNumber: 1 },
                    }} asChild>
                        <TouchableOpacity>
                            <MealButton label={"1st"}></MealButton>
                        </TouchableOpacity>
                    </Link>
                    <Link href={{
                        pathname: "/enter-meal",
                        params: { mealNumber: 2 },
                    }} asChild>
                        <TouchableOpacity>
                            <MealButton label={"2nd"}></MealButton>
                        </TouchableOpacity>
                    </Link>
                    <Link href={{
                        pathname: "/enter-meal",
                        params: { mealNumber: 3 },
                    }} asChild>
                        <TouchableOpacity>
                            <MealButton label={"3rd"}></MealButton>
                        </TouchableOpacity>
                    </Link>
                    <Link href={{
                        pathname: "/enter-meal",
                        params: { mealNumber: 4 },
                    }} asChild>
                        <TouchableOpacity>
                            <MealButton label={"Snack"}></MealButton>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </>
    );
}

export default MealSection;

const styles = StyleSheet.create({
    mealsContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        gap: 11,
        paddingLeft: 8,
        paddingRight: 8,
    },
});