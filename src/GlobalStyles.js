import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    AndroidSafeArea: {
        // flex: 1,       
        marginTop: Platform.OS === 'android' ? 31 : 0
    },
});