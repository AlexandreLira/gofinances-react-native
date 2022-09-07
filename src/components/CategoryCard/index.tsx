import React from 'react';
import {Amount, Container, Title} from './styles';

interface CategoryCardProps {
    color: string;
    title: string;
    amount: string;
}

export function CategoryCard({
    color,
    title,
    amount
}: CategoryCardProps){
    return (
        <Container color={color}>
            <Title>{title}</Title>
            <Amount>{amount}</Amount>
        </Container>
        
    )
}