import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
`;