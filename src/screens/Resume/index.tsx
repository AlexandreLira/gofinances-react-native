import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from '../../components/Header';
import { CategoryCard } from '../../components/CategoryCard';
import { TransactionProps } from '../../components/TransactionCard';

import { categories } from '../../utils/categories';
import { TRANSACTION_STORAGE_KEY } from '../../utils/constants';

import { Container, Content } from './styles';

interface CategoriesResumeProps {
    key: string
    name: string;
    total: string;
    color: string;
}

export function Resume() {
    const [categoriesResume, setCategoriesResume] = useState<CategoriesResumeProps[]>([])

    async function loadTransactions() {
        const response = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)

        const transactions: TransactionProps[] = response ? JSON.parse(response) : []

        const expensives = transactions.filter((transaction) => transaction.type === 'down')

        const totalByCategory: CategoriesResumeProps[] = []

        categories.forEach(category => {
            let categorySum: number = 0;
            expensives.forEach(expensive => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })

            // if(categorySum === 0) return

            const categorySumFormatted = categorySum.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
            

            totalByCategory.push({
                key: category.key,
                name: category.name,
                total: categorySumFormatted,
                color: category.color,
            })
        })

        setCategoriesResume(totalByCategory)
    }

    useEffect(() => {
        loadTransactions()
    }, [])
    return (
        <Container>
            <Header title="Resumo por categoria" />

            <Content>
                {categoriesResume.map(category => (
                    <CategoryCard
                        key={category.key}
                        amount={category.total}
                        color={category.color}
                        title={category.name}
                    />
                ))}
            </Content>
        </Container>
    )
}