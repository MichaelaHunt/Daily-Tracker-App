import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import myImage from '../assets/Subtract.png';
import { Link } from 'expo-router';

function WeightSection() {
    return (
        <>
            <View style={[styles.weightContainer, globalStyles.sectionMargin]}>
                <Text style={globalStyles.sectionText}>Weight</Text>
                <View style={[globalStyles.row, styles.spaceBetween]}>
                    <View style={[globalStyles.column, styles.center]}>
                        <Link style={styles.scaleContainer} href="/enter-weight" asChild>
                            <TouchableOpacity style={styles.scaleContainer}>
                                <View style={styles.scale}></View>
                                <View style={styles.scaleScreen}>
                                    <Text style={styles.scaleText}>61.4</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>
                        <Text>Add Weight</Text>
                    </View>
                    <View style={[globalStyles.column, styles.scaleContainer]}>
                        {/* <Link style={styles.scaleContainer} href="/enter-weight" asChild> */}
                            <TouchableOpacity>
                                <Image source={myImage} style={{ width: 125, height: 125, borderRadius: 16, marginBottom: 8 }}></Image>
                            </TouchableOpacity>
                        {/* </Link> */}
                        <Text>View Graph</Text>
                    </View>
                </View>
            </View>
        </>
    );
}

export default WeightSection;

const styles = StyleSheet.create({
    weightContainer: {
        width: "100%",
        paddingLeft: 24,
        paddingRight: 24,
    },
    scaleScreen: {
        position: 'absolute',
        top: 10,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
    },
    scaleText: {
        fontSize: 18,
        fontWeight: 700,
    },
    scale: {
        backgroundColor: colors.primaryAccent,
        width: 125,
        height: 125,
        borderRadius: 16,
        marginBottom: 8,
    },
    scaleContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    spaceBetween: {
        justifyContent: 'space-between',
        marginTop: 24,
        paddingLeft: 8,
        paddingRight: 8,
    }, 
    center: {
        alignItems: 'center',
    }
});