import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TransactionTypeProps {
    type: 'down' | 'up'
}

export const Container = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 16px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.regular};
    `;

export const Amount = styled.Text<TransactionTypeProps>`
    color: ${({type, theme: {colors}}) => (
        type === 'up' ? colors.success : colors.attention
        )};
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    padding-top: 2px;
    padding-bottom: 19px;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
    align-self: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(20)}px;
    margin-right: ${RFValue(12)}px;
`;

export const TransactionDate = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
`;