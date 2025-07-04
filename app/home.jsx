//#region Imports
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import MealSection from '../components/meals';
import ActivitySection from '../components/activity';
import { globalStyles } from '../styles/globalStyles';
import WeightSection from '../components/weight';
import NoteSection from '../components/notes';
import SleepSection from '../components/sleep';
import { Manager } from '../services/manager';
import { Link } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
import { useContext, useEffect, useState } from 'react';
import {DateContext} from '../services/DateContext';
import CustomButton from '../components/custom-button';
//#endregion

export default function Home() {
  const { currentDate } = useContext(DateContext);
  const [formattedDate, setFormattedDate] = useState();
  let manager = new Manager();

  useEffect(() => {
    let fDate = manager.DATE_MANAGER.formatTitleDate(currentDate);

    setFormattedDate(fDate);
  }, [currentDate]);

  function handleExport() {
    manager.exportCSV();
  }

  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={globalStyles.statusSaver}></View>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={styles.titleSection}>
          <Text style={globalStyles.titleText}>{formattedDate}</Text>
          <Link href="/choose-date" asChild >
            <Text >
              <FontAwesomeIcon icon={faCalendarDay} size={24}></FontAwesomeIcon>
            </Text>
          </Link>
        </View>
        <StatusBar style="auto" />
        <View style={[styles.line, { marginBottom: 8 }]}></View>
        <MealSection></MealSection>
        <View style={[styles.line, { marginBottom: 8 }]}></View>
        <ActivitySection></ActivitySection>
        <View style={[styles.line, { marginBottom: 8 }]}></View>
        <SleepSection></SleepSection>
        <View style={[styles.line, { marginBottom: 8 }]}></View>
        <WeightSection></WeightSection>
        <View style={[styles.line, { marginBottom: 8 }]}></View>
        <NoteSection></NoteSection>
        <View style={[styles.line, { marginBottom: 8 }]}></View>
        <View style={{ marginTop: 16, marginBottom: 16, alignSelf: 'center' }}>
          <CustomButton label='Export CSV' function={() => handleExport()}></CustomButton>
        </View>
      </ScrollView>
      <View style={globalStyles.homeSaver}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    border: 'none',
    borderBottom: 'solid',
    borderColor: '#d9d8da',
    borderWidth: 0.5,
  }, 
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 24
  },
});