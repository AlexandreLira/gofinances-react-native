import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Form = styled.View`
    flex: 1;
    justify-content: space-between;
    width: 100%;

    padding: 24px;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
    margin-top: 8px;
    margin-bottom: 16px;
    flex-direction: row;
    justify-content: space-between;
`;
