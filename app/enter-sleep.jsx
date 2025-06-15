import { Text, View, TextInput, StyleSheet, ActivityIndicator, Button, Switch } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useContext, useEffect, useState } from 'react';
import Toast from 'react-native-root-toast';
import { SleepManager } from '../services/sleepManager';
import { DateContext } from '../services/DateContext';


function EnterSleepPage() {
    const [sleepDown, setSleepDown] = useState();
    const [sleepWake, setSleepWake] = useState();
    const { currentDate } = useContext(DateContext);

    const [napBool, setNapBool] = useState(false);
    const toggleSwitch = () => setNapBool(previousState => !previousState);
    const sleepManager = new SleepManager();

    function handleSleepPress() {
        try {
            sleepManager.setSleep(sleepDown, sleepWake, currentDate);
            Toast.show('Saved successfully!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: 'green',
                textColor: 'white',
            });
        } catch (err) {
            console.log("error: " + err);
        }
        
    }

    function handleNapPress() {
        try {
            sleepManager.setNap(napBool, currentDate);
            Toast.show('Saved successfully!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: 'green',
                textColor: 'white',
            });
        } catch (err) {
            console.log("error: " + err);
        }
    }

    function deleteButtonPress() {
        
    }

    useEffect(() => {
        console.log(napBool);
    }, [napBool]);

    return (
        <>
            <View style={styles.body}>
                <View style={styles.inputContainer}>
                    <View style={[globalStyles.row, styles.item]}>
                        <Text style={styles.label}>Start</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="23:00"
                            onChangeText={setSleepDown}
                        />
                    </View>
                    <View style={styles.line}></View>
                    <View style={[globalStyles.row, styles.item]}>
                        <Text style={styles.label}>Wake</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="6:00"
                            onChangeText={setSleepWake}
                        />
                    </View>

                </View>

                <View style={[styles.inputContainer, { marginTop: 16 }]}>
                    <View style={[globalStyles.row, styles.item]}>
                        <Text style={styles.label}>Nap</Text>
                        <Switch
                            style={{ marginTop: -8, marginBottom: -8, marginLeft: -8 }}
                            onValueChange={toggleSwitch}
                            value={napBool} />
                    </View>
                </View>
                <View style={[{ marginTop: 24, width: '85%', justifyContent: 'space-between' }, globalStyles.row]}>
                    <Button title='Submit Sleep' onPress={() => { handleSleepPress() }}></Button>
                    <Button title='Submit Nap' onPress={() => { handleNapPress() }}></Button>
                </View>
                <View style={{ marginTop: 24 }}>
                    <Button title='Delete All Sleep' onPress={() => { deleteButtonPress() }}></Button>
                </View>
            </View>
        </>
    );
}

export default EnterSleepPage;


const styles = StyleSheet.create({
    body: {
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        backgroundColor: "white",
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
        width: '85%',
    },
    item: {
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'center',
    },
    line: {
        border: 'none',
        borderBottom: 'solid',
        borderColor: '#d9d8da',
        borderWidth: 0.5,
        marginTop: 8,
        marginBottom: 8
    },
    label: {
        width: '85%',
    },
    input: {
        width: '15%',
        textAlign: 'right',
    }
});