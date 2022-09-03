import React from 'react';
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
    title: string;
    amount: string;
    type: 'income' | 'outcome';
    date: string;
    category: {
        name: string;
        icon: string
    }
}

interface TransactionCardProps {
    transaction: TransactionProps;
}

export function TransactionCard({ transaction }: TransactionCardProps) {

    const {
        title,
        type,
        amount,
        date,
        category
    } = transaction

    return (
        <Container>
            <Title>{title}</Title>
            <Amount 
                type={type}
            >
                {type === 'outcome' && '- '}
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