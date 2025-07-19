import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MealButton from './meal-button';
import { globalStyles } from '../styles/globalStyles';
import { Link } from 'expo-router';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons/faDrumstickBite';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons/faBowlFood';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons/faCookieBite';
import { colors } from '../styles/colors';

function MealSection() {
    return (
        <>
            <View style={[styles.mealsContainer, globalStyles.card, globalStyles.sectionMargin]}>
                <Text style={globalStyles.sectionText}>Meals</Text>
                <View style={styles.row}>
                    <Link href={{
                        pathname: "/enter-meal",
                        params: { mealNumber: 1 },
                    }} asChild>
                        <TouchableOpacity>
                            <MealButton label={"1st"} innerIcon={faMugSaucer}></MealButton>
                        </TouchableOpacity>
                    </Link>
                    <Link href={{
                        pathname: "/enter-meal",
                        params: { mealNumber: 2 },
                    }} asChild>
                        <TouchableOpacity>
                            <MealButton label={"2nd"} innerIcon={faDrumstickBite}></MealButton>
                        </TouchableOpacity>
                    </Link>
                    <Link href={{
                        pathname: "/enter-meal",
                        params: { mealNumber: 3 },
                    }} asChild>
                        <TouchableOpacity>
                            <MealButton label={"3rd"} innerIcon={faBowlFood}></MealButton>
                        </TouchableOpacity>
                    </Link>
                    <Link href={{
                        pathname: "/enter-meal",
                        params: { mealNumber: 4 },
                    }} asChild>
                        <TouchableOpacity>
                            <MealButton label={"Snack"} innerIcon={faCookieBite}></MealButton>
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
        marginHorizontal: 16,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
    },
});