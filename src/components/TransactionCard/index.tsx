import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { categories } from '../../utils/categories';
import {
    Amount,
    Category,
    CategoryName,
    Container,
    Footer,
    Icon,
    Title,
    TransactionDate
} from './styles';

export interface TransactionProps {
    id: string;
    title: string;
    amount: string;
    type: 'down' | 'up';
    date: string;
    category: string
}

interface TransactionCardProps {
    transaction: TransactionProps;
}

export function TransactionCard({ transaction }: TransactionCardProps) {

    const {
        id,
        title,
        type,
        amount,
        date,
    } = transaction

    const [category] = categories.filter(item => item.key === transaction.category)
    const navigation = useNavigation()

    return (
        <Container onPress={() => navigation.navigate('EditTransaction', {transactionId: id})}>
            <Title>{title}</Title>
            <Amount 
                type={type}
            >
                {type === 'down' && '- '}
                {amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <TransactionDate>{date}</TransactionDate>
            </Footer>
        </Container>
    )
}