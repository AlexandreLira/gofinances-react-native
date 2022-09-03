import React from "react";
import { HighlightCard, HighlightCardProps } from "../../components/HighlightCard";
import { TransactionProps, TransactionCard } from "../../components/TransactionCard";
import { TransactionList } from "../../components/TransactionCard/styles";
import {
    Container,
    Header,
    HighlightCards,
    Photo,
    PowerIcon,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
    Transactions,
    Title
} from "./styles";

export interface DataListProps extends TransactionProps {
    id: string;
}

export function Dashboard() {

    const highlightCardData: HighlightCardProps[] = [
        {
            title: 'Entradas',
            amount: 'R$ 17.400,00',
            lastTransaction: 'Últimas entradas dia 13 de abril',
            type: 'up'
        },
        {
            title: 'Saídas',
            amount: 'R$ 1.259,00',
            lastTransaction: 'Últimas entradas dia 13 de abril',
            type: 'down',
        },
        {
            title: 'Total',
            amount: 'R$ 16.141,00',
            lastTransaction: '01 à 16 de abril',
            type: 'total'
        }
    ]

    const transactions: DataListProps[] = [
        {
            id: '1',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            date: '13/04/2022',
            type: 'income',
            category: {
                name: 'vendas',
                icon: 'dollar-sign'
            }
        },
        {
            id: '2',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            date: '10/04/2022',
            type: 'outcome',
            category: {
                name: 'alimentação',
                icon: 'coffee'
            }
        },
        {
            id: '3',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            date: '13/04/2022',
            type: 'income',
            category: {
                name: 'vendas',
                icon: 'shopping-bag'
            }
        },
        {
            id: '4',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            date: '10/04/2022',
            type: 'outcome',
            category: {
                name: 'alimentação',
                icon: 'dollar-sign'
            }
        },
        {
            id: '5',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            date: '13/04/2022',
            type: 'income',
            category: {
                name: 'vendas',
                icon: 'dollar-sign'
            }
        },
        {
            id: '6',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            date: '10/04/2022',
            type: 'outcome',
            category: {
                name: 'alimentação',
                icon: 'dollar-sign'
            }
        },

    ]

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

                    <PowerIcon name="power"/>
                    
                </UserWrapper>
            </Header>

            <HighlightCards>
                {highlightCardData.map(item => (
                    <HighlightCard 
                        key={item.title}
                        type={item.type}
                        title={item.title}
                        amount={item.amount}
                        lastTransaction={item.lastTransaction}
                    />  
                ))}
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <TransactionCard transaction={item}/>}
                />

            </Transactions>
        </Container>
    )
}