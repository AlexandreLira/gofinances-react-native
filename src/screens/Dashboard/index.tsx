import React from "react";
import { HighlightCard, HighlightCardProps } from "../../components/HighlightCard";
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
} from "./styles";

export function Dashboard() {

    const data: HighlightCardProps[] = [
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
                {data.map(item => (
                    <HighlightCard 
                        key={item.title}
                        type={item.type}
                        title={item.title}
                        amount={item.amount}
                        lastTransaction={item.lastTransaction}
                    />  
                ))}
            </HighlightCards>
        </Container>
    )
}