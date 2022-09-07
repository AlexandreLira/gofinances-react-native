import styled from 'styled-components/native';
import { ScrollView, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Loading = styled(ActivityIndicator)`
`;

export const Content = styled(ScrollView).attrs({
    contentContainerStyle: {
        padding: 24,
    },
    showsVerticalScrollIndicator: false
})`
`;

export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const MonthSelectButton = styled.TouchableOpacity`
`;

export const SelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    text-transform: capitalize;
`;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center
`