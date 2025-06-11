import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import MealSection from '../components/meals';
import ActivitySection from '../components/activity';
import { globalStyles } from '../styles/globalStyles';
import WeightSection from '../components/weight';
import NoteSection from '../components/notes';
import { useState } from 'react';
import SleepSection from '../components/sleep';
import { Manager } from '../services/manager';


export default function Home() {
  //#region date setup
  let date = new Date;
  let dateText = date.toDateString();
  let formattedDate;
  let manager = new Manager();

  function handleExport() {
    manager.exportCSV();
  }

  function formatDate() {
    let dayAbbreviation = dateText.slice(0, 3);
    let remainingDate = dateText.slice(4, 10);
    let day;
    switch (dayAbbreviation) {
      case "Mon":
        day = "Monday";
        break;
      case "Tue":
        day = "Tuesday";
        break;
      case "Wed":
        day = "Wednesday";
        break;
      case "Thu":
        day = "Thursday";
        break;
      case "Fri":
        day = "Friday";
        break;
      case "Sat":
        day = "Saturday";
        break;
      case "Sun":
        day = "Sunday";
        break;
    }
    let suffix = getSuffix(date.getDate());
    formattedDate = `${day} ${remainingDate}${suffix}`;
  }

  function getSuffix(day) {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  //#endregion

  formatDate();
  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={globalStyles.statusSaver}></View>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <Text style={globalStyles.titleText}>{formattedDate}</Text>
        <StatusBar style="auto" />
        <View style={[styles.line, {marginBottom: 8}]}></View>
        <MealSection></MealSection>
        <View style={[styles.line, {marginBottom: 8}]}></View>
        <ActivitySection></ActivitySection>
        <View style={[styles.line, {marginBottom: 8}]}></View>
        <SleepSection></SleepSection>
        <View style={[styles.line, {marginBottom: 8}]}></View>
        <WeightSection></WeightSection>
        <View style={[styles.line, {marginBottom: 8}]}></View>
        <NoteSection></NoteSection>
        <View style={[styles.line, {marginBottom: 8}]}></View>
        <View style={{ marginTop: 16, marginBottom: 16 }}>
            <Button title='Export CSV' onPress={() => {handleExport()}}></Button>
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
  }
});