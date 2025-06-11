import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

function TableRow(props) {
    return(
        <>
            <View style={[styles.tRow, props.color ? styles.grey : styles.bgc, props.second ? styles.nmargin : styles.none]} id='rowContainer'>
                <Text style={styles.tText}>{props.label}</Text>
                <Text style={[styles.tText, styles.aRight]}>{props.time}{props.time === '' ? '' : 'mins'}</Text>
                <Text style={[styles.tText, styles.aRight]}>{props.level}</Text>
            </View>
        </>
    );
}

export default TableRow;

const styles = StyleSheet.create({
    tRow: {
        display: 'grid', 
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: '1',
        width: '100%',
    },
    tText: {
        padding: 8,
        width: '33.3%',
    },
    aRight: {
        textAlign: 'right',
    },
    grey: {
        backgroundColor: '#D9D9D9',
    },
    bgc: {
        backgroundColor: colors.background,
    },
    nmargin: {
        marginTop: -1,
    },
    none: {

    }
});