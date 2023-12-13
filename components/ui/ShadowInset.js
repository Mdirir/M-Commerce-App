import InsetShadow from 'react-native-inset-shadow';
import { StyleSheet } from 'react-native';

function ShadowInset({ children, style }) {
    return (
        <InsetShadow
            containerStyle={style}
            shadowRadius={20}
            shadowOffset={25}
            elevation={25}
            shadowOpacity={1}
            // color="rgba(128,128,128,1)"
            color="red"
        // right={false}
        // bottom={false}
        >
            {children}
        </InsetShadow>
    )
}


export default ShadowInset