import styled from 'styled-components/native';
import { ScrollView } from 'react-native'
export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled(ScrollView).attrs({
    contentContainerStyle: {
        flex: 1,
        padding: 24,
    }
})`
`