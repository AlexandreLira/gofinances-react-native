import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { CategoriesProps } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const CategoriesList = styled(
    FlatList as new (props: FlatListProps<CategoriesProps>) => FlatList<CategoriesProps>
)`
    flex: 1;
    width: 100%;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    padding: 24px;

    flex-direction: row;
    align-items: center;

    background-color: ${({ theme: { colors }, isActive }) => 
        isActive ? colors.secondary_light : 'transparent'};
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
    color: ${({ theme }) => theme.colors.title};
    `;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.title};
`;

export const Separator = styled.View`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.text_light};
    margin: 0px 24px;
`;

export const Footer = styled.View`
    padding: 24px;
`;