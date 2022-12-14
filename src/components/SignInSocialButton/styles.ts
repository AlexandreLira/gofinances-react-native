import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;

    flex-direction: row;
    align-items: center;

    margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
    justify-content: center;
    align-items: center;

    padding: ${RFValue(16)}px;
    border-color: ${({theme}) => theme.colors.background};
    border-right-width: 1px;

`;

export const Text = styled.Text`
    flex: 1;

    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.medium};

    text-align: center;
`;
