import { globalStyles } from "../styles/globalStyles";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import TableRow from "./table-row";
import { colors } from "../styles/colors";
import { Link } from 'expo-router';
import { useState, useCallback, useContext, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { ActivityManager } from "../services/activityManager";
import { DateContext } from "../services/DateContext";

function ActivitySection() {
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const activityManager = new ActivityManager();
    const { currentDate } = useContext(DateContext);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            async function getNoteData() {
                try {
                    const result = await activityManager.getActivity(currentDate);
                    if (isActive) {
                        setActivityData(result);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    if (isActive) {
                        setLoading(false);
                    }
                }
                setLoading(false);
            }
            getNoteData();

            return () => {
                isActive = false;
            };
        }, [currentDate])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // placeholder while loading
    }
    // let activityData = [
    //     ['Run', '105', 'Intense'],
    //     ['Shopping', '', ''],
    //     ['Cleaning', '', '']
    // ];

    return (
        <>
            <View style={[styles.activityContainer, globalStyles.sectionMargin]}>
                <Text style={globalStyles.sectionText}>Activity</Text>
                <View style={styles.innerContainer}>
                    <View style={{ width: '100%' }}>
                        {activityData[0] == '' ? null : (
                            activityData.map((item, index) => (
                                // <TableRow key={index} label={item[0]} time={item[1]} level={item[2]} color={index % 2 == 0 ? false : true} second={index < 1 ? false : true}></TableRow>
                                <TableRow key={index} label={item} time={''} level={''} color={index % 2 == 0 ? false : true} second={index < 1 ? false : true}></TableRow>
                            )))}
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Link href="/enter-activity" asChild>
                            <TouchableOpacity style={globalStyles.button}>
                                <Text style={globalStyles.buttonText}>Add Activity</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </>
    );
}

export default ActivitySection;

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
    },
    even: {
        backgroundColor: 'grey',
    },
    odd: {
        backgroundColor: colors.background,
    }
});