import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard, HighlightCardProps } from "../../components/HighlightCard";
import { TransactionProps, TransactionCard } from "../../components/TransactionCard";
import { TRANSACTION_STORAGE_KEY } from "../../utils/constants";

import {
    Container,
    Header,
    HighlightCards,
    Photo,
    Icon,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from "./styles";

export interface DataListProps extends TransactionProps {
    id: string;
}

interface HighlightProps {
    amount: number,
    message: string
}
interface HighlightDataProps {
    total: HighlightProps
    income: HighlightProps
    outcome: HighlightProps
}

export function Dashboard() {

    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState({
        total: {
            amount: 0,
            message: 'Sem transações'
        },
        income: {
            amount: 0,
            message: 'Sem transações'
        },
        outcome: {
            amount: 0,
            message: 'Sem transações'
        }
    })


    function getLastTransaction(
        transactions: DataListProps[],
        type: 'down' | 'up'
    ) {
        let dateTime = 0

        transactions.forEach(transaction => {
            if (transaction.type === type) {
                const time = new Date(transaction.date).getTime()
                dateTime = Math.max(time, dateTime)
            }
        })

        if (!Boolean(dateTime)) {
            return 'Sem transações'
        }

        const date = new Date(dateTime)
        const formattedDate = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long'

        }).format(date)

        return formattedDate
    }

    async function loadTransactions() {
        const response = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
        const data = response ? JSON.parse(response) : []

        const totalizer = {
            total: {
                amount: 0,
                message: ''
            },
            income: {
                amount: 0,
                message: ''
            },
            outcome: {
                amount: 0,
                message: ''
            },

        }

        const transactionsFormatted = data.map((item: DataListProps) => {
            const date = Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short'
            }).format(new Date(item.date))

            const amount = Number(item.amount)
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

            if (item.type === 'up') {
                totalizer.income.amount += Number(item.amount)
                totalizer.total.amount += Number(item.amount)

            } else if (item.type === 'down') {
                totalizer.outcome.amount -= Number(item.amount)
                totalizer.total.amount -= Number(item.amount)
            }

            return {
                ...item,
                date,
                amount
            }
        })

        totalizer.income.message = `Última entrada dia ${getLastTransaction(data, 'up')}`
        totalizer.outcome.message = `Última saída dia ${getLastTransaction(data, 'down')}`
        totalizer.total.message = `01 á ${getLastTransaction(data, 'up')}`
        setHighlightData(totalizer)
        setTransactions(transactionsFormatted)

    }

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));


    return (
        <Container>
            <Header>
                <UserWrapper>

                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/58709086?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Alexandre</UserName>
                        </User>
                    </UserInfo>

                    <LogoutButton onPress={() => { console.log('fakh') }}>
                        <Icon name="power" />
                    </LogoutButton>

                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type='up'
                    title='Entradas'
                    amount={highlightData.income.amount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                    lastTransaction={highlightData.income.message}
                />

                <HighlightCard
                    type='down'
                    title='Saídas'
                    amount={highlightData.outcome.amount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                    lastTransaction={highlightData.outcome.message}
                />

                <HighlightCard
                    type='total'
                    title='Total'
                    amount={highlightData.total.amount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                    lastTransaction={highlightData.total.message}
                />

            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard transaction={item} />}
                />

            </Transactions>
        </Container>
    )
}