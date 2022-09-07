import React, { useCallback, useEffect, useState } from 'react';
import { ptBR } from 'date-fns/locale';
import { VictoryPie } from "victory-native";
import { addMonths, format, subMonths } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Header } from '../../components/Header';
import { CategoryCard } from '../../components/CategoryCard';
import { TransactionProps } from '../../components/TransactionCard';

import { categories } from '../../utils/categories';
import { TRANSACTION_STORAGE_KEY } from '../../utils/constants';

import {
    ChartContainer,
    Container,
    Content,
    LoadContainer,
    Loading,
    Month,
    MonthSelect,
    MonthSelectButton,
    SelectIcon
} from './styles';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

interface CategoriesResumeProps {
    key: string
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string
}

export function Resume() {

    const [categoriesResume, setCategoriesResume] = useState<CategoriesResumeProps[]>([])
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const theme = useTheme()

    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            const newDate = addMonths(selectedDate, 1)
            setSelectedDate(newDate)
        } else {
            const newDate = subMonths(selectedDate, 1)
            setSelectedDate(newDate)
        }
    }

    async function loadTransactions() {
        setIsLoadingTransactions(true)

        const response = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)

        const transactions: TransactionProps[] = response ? JSON.parse(response) : []

        const expensives = transactions.filter((transaction) =>
            transaction.type === 'down' &&
            new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
            new Date(transaction.date).getFullYear() === selectedDate.getFullYear()

        )
        const expensivesTotal = expensives.reduce((acumullator: number, expensive) => {
            acumullator += Number(expensive.amount)
            return acumullator
        }, 0)

        const totalByCategory: CategoriesResumeProps[] = []

        categories.forEach(category => {
            let categorySum: number = 0;
            expensives.forEach(expensive => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })

            if (categorySum === 0) return

            const categorySumFormatted = categorySum.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`


            totalByCategory.push({
                key: category.key,
                name: category.name,
                total: categorySum,
                totalFormatted: categorySumFormatted,
                color: category.color,
                percent
            })
        })

        setCategoriesResume(totalByCategory)
        setIsLoadingTransactions(false)
    }

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, [selectedDate]));

    return (
        <Container>
            <Header title="Resumo por categoria" />

            {isLoadingTransactions ? (
                <LoadContainer>
                    <Loading  size="large" color={theme.colors.primary}/>
                </LoadContainer>
            ) : (
                <Content>
                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleDateChange('prev')}>
                            <SelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                        <MonthSelectButton onPress={() => handleDateChange('next')}>
                            <SelectIcon name="chevron-right" />
                        </MonthSelectButton>

                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie
                            data={categoriesResume}
                            colorScale={categoriesResume.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={RFValue(60)}
                            x="percent"
                            y="total"
                        />

                    </ChartContainer>

                    {categoriesResume.map(category => (
                        <CategoryCard
                            key={category.key}
                            amount={category.totalFormatted}
                            color={category.color}
                            title={category.name}
                        />
                    ))}
                </Content>

            )}

        </Container>
    )
}