import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

interface IconProps {
    type: 'up' | 'down'
}

interface ContainerProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text_light};
    border-radius:  5px;
    padding: 16px 0;

    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `}

    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `}

`;

export const Icon = styled(Feather) <IconProps>`
    font-size: ${RFValue(24)}px;
    color: ${({ theme: { colors }, type }) =>
        type === 'up' ? colors.success : colors.attention
    };
    margin-right: 14px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.title}
`;