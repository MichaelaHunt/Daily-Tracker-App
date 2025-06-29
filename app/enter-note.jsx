import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import {NotesManager} from '../services/notesManager';
import Toast from 'react-native-root-toast';
import { DateContext } from '../services/DateContext';

function EnterNotePage() {
    const [inputNote, setInputNote] = useState();
    const notesManager = new NotesManager();
    const { currentDate } = useContext(DateContext);

    function handlePress() {
        notesManager.setNotes(inputNote, currentDate);
        Toast.show('Saved successfully!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: 'green',
            textColor: 'white',
        });
    }

    function deleteButtonPress() {
        notesManager.deleteAllNotes();
        Toast.show('Deleted successfully!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: 'green',
            textColor: 'white',
        });
    }

    return (
        <>
            <View style={styles.body}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Note here!"
                        onChangeText={setInputNote}
                    />
                </View>
                <View style={{ marginTop: 24 }}>
                    <Button title='Submit' onPress={() => { handlePress() }}></Button>
                </View>
                <View style={{ marginTop: 24 }}>
                    <Button title='Delete All Notes' onPress={() => { deleteButtonPress() }}></Button>
                </View>
            </View>
        </>
    );
}

export default EnterNotePage;

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
        width: '80%',
    },
});