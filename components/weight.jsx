import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import myImage from '../assets/Subtract.png';
import { Link } from 'expo-router';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function WeightSection() {
    return (
        <>
            <View style={[styles.weightContainer, globalStyles.sectionMargin, globalStyles.card]}>
                <Text style={globalStyles.sectionText}>Weight</Text>
                <View style={[globalStyles.row, styles.spaceAround]}>
                    <View style={[globalStyles.column, styles.center]}>
                        <Link style={styles.scaleContainer} href="/enter-weight" asChild>
                            <TouchableOpacity style={styles.scaleContainer}>
                                <View style={styles.scale}></View>
                                <View style={styles.scaleScreen}>
                                    <Text style={styles.scaleText}>61.4</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>
                        <Text style={{color: colors.textOnBackground}}>Add Weight</Text>
                    </View>
                    <View style={[globalStyles.column, styles.scaleContainer]}>
                        {/* <Link style={styles.scaleContainer} href="/enter-weight" asChild> */}
                            <TouchableOpacity style={styles.rectangle}>
                                <FontAwesomeIcon icon={faChartLine} size={80} color={colors.icons} style={styles.icon}></FontAwesomeIcon>
                                {/* <Image source={myImage} style={{ width: 125, height: 125, borderRadius: 16, marginBottom: 8 }}></Image> */}
                            </TouchableOpacity>
                        {/* </Link> */}
                        <Text style={{color: colors.textOnBackground}}>View Graph</Text>
                    </View>
                </View>
            </View>
        </>
    );
}

export default WeightSection;

const styles = StyleSheet.create({
    weightContainer: {
        marginHorizontal: 16,
    },
    scaleScreen: {
        position: 'absolute',
        top: 10,
        backgroundColor: colors.icons,
        borderRadius: 12,
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
    },
    scaleText: {
        fontSize: 18,
        fontWeight: 700,
        color: colors.cardBackground
    },
    scale: {
        backgroundColor: colors.squareButtonBackground,
        width: 125,
        height: 125,
        borderRadius: 16,
        marginBottom: 8,
    },
    scaleContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    spaceAround: {
        justifyContent: 'space-around',
        marginTop: 24,
        paddingLeft: 8,
        paddingRight: 8,
    }, 
    center: {
        alignItems: 'center',
    },
    rectangle: {
        backgroundColor: colors.squareButtonBackground,
        width: 125,
        height: 125,
        borderRadius: 16,
        position: 'relative',
        marginBottom: 8,
    },
    icon: {
        position: 'absolute',
        top: 22.5,
        left: 22.5,
    }
});