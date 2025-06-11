import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useState, useCallback } from "react";
import { globalStyles } from '../styles/globalStyles';
import { Link } from 'expo-router';
import { colors } from '../styles/colors';
import { useFocusEffect } from '@react-navigation/native';
import { SleepManager } from '../services/sleepManager';

function SleepSection() {
    const [napText, setNapText] = useState('Short');
    const [sleepText, setSleepText] = useState('9hrs');
    const [differenceText, setDifferenceText] = useState("30mins");

    const [loading, setLoading] = useState(true);
    const sleepManager = new SleepManager();

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            async function getSleepData() {
                try {
                    const result = await sleepManager.getSleepAndNap();
                    if (isActive) {
                        setNapText(result.nap);
                        setSleepText(result.hours);
                        setDifferenceText(result.difference);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    if (isActive) {
                        setLoading(false);
                    }
                }
            }

            getSleepData();

            return () => {
                isActive = false; // Prevent state update if component is unfocused
            };
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // placeholder while loading
    }


    return (
        <>
            <View style={[styles.activityContainer, globalStyles.sectionMargin]}>
                <Text style={globalStyles.sectionText}>Sleep</Text>
                <View style={[styles.innerContainer, globalStyles.row]}>
                    <View style={[globalStyles.column, styles.boxContainer]}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>{sleepText}</Text>
                        </View>
                        <Text>Sleep</Text>
                    </View>
                    <View style={[globalStyles.column, styles.boxContainer]}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>{differenceText}</Text>
                        </View>
                        <Text>Difference</Text>
                    </View>
                    <View style={[globalStyles.column, styles.boxContainer]}>
                        <View style={styles.box}>
                            <Text style={styles.boxText}>{napText}</Text>
                        </View>
                        <Text>Nap</Text>
                    </View>
                </View>
                <View style={{ marginTop: 24 }}>
                    <Link href="/enter-sleep" asChild>
                        <Button title='Add Sleep'></Button>
                    </Link>
                </View>
            </View>
        </>
    );
}

export default SleepSection;

const styles = StyleSheet.create({
    activityContainer: {
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24,
    },
    innerContainer: {
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    box: {
        backgroundColor: colors.primaryAccent,
        width: 75,
        height: 75,
        borderRadius: 16,
        marginBottom: 8,
        position: 'relative',
        alignItems: 'center',
    },
    boxContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    boxText: {
        position: 'absolute',
        top: 29,
        color: colors.background,
    }
});