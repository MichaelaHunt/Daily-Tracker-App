import { globalStyles } from "../styles/globalStyles";
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { NotesManager } from "../services/notesManager";

function NoteSection() {
    const [loading, setLoading] = useState(true);
    const [noteList, setNoteList] = useState([]);
    const notesManager = new NotesManager();

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            async function getNoteData() {
                try {
                    const result = await notesManager.getNotes();
                    if (isActive) {
                        setNoteList(result);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    if (isActive) {
                        setLoading(false);
                    }
                }
            }

            getNoteData();

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
            <View style={styles.notesContainer}>
                <Text style={globalStyles.sectionText}>Notes</Text>
                <View style={[noteList[0] != '' ? styles.innerContainer : styles.empty]}>
                    {noteList[0] != '' ? (
                        noteList.map((item, index) => (
                            <Text key={index}>{`\u2022 ${item}`}</Text>
                        ))
                    ) : (
                        <Text>No notes today</Text>
                    )}
                    <View style={{ marginTop: 8, marginBottom: 24 }}>
                        <Link href="/enter-note" asChild>
                            <Button title='Add Note'></Button>
                        </Link>
                    </View>
                </View>
            </View>
        </>
    );
}

export default NoteSection;

const styles = StyleSheet.create({
    notesContainer: {
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24,
    },
    innerContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 16,
        display: 'flex',
        alignItems: 'left',
    },
    empty: {
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
    }
});