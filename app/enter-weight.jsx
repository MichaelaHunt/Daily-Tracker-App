import { Text, View, TextInput, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useEffect, useState, useContext } from 'react';
import { WeightManager } from '../services/weightManager';
import Toast from 'react-native-root-toast';
import { DateContext } from '../services/DateContext';

export default function EnterWeightPage() {
    const [placeholder, setPlaceholder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputWeight, setinputWeight] = useState(0);
    const { currentDate } = useContext(DateContext);
    const weightManager = new WeightManager();
    
    useEffect(() => {
        async function getPlaceholder() {
            try {
                let result = await weightManager.getWeight(currentDate);
                setPlaceholder(result); // store result in state
            } catch (error) {
                console.error(error); // handle any errors
            } finally {
                setLoading(false); // hide placeholder once loading is done
            }
        }
        getPlaceholder();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // placeholder while loading
    }

    function handleButtonPress() {
        weightManager.setWeight(inputWeight, currentDate);
        Toast.show('Saved successfully!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        backgroundColor: 'green',
                        textColor: 'white',
                    });
    }

    return (
        <View style={styles.body}>
            <View style={[styles.inputContainer, globalStyles.row]}>
                <Text style={styles.label}>Weight (Kilos)</Text>
                <TextInput
                    placeholder={placeholder == "" ? "0" : placeholder}
                    keyboardType="numeric"
                    onChangeText={setinputWeight}
                />
            </View>
            <View style={{marginTop: 24}}>
                <Button onPress={() => { handleButtonPress() }} title='Submit'>Hello</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 32,
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
        width: '70%',
    },
    label: {
        width: '85%',
    },
    input: {
        width: '100%',
    }
});