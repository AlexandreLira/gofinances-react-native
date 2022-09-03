import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.secondary};
    padding: 16px;
    border-radius: 5px;
`

export const Title= styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.shape}
`;