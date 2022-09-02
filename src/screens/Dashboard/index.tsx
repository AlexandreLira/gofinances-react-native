import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
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
                <HighlightCard/> 
                <HighlightCard/> 
                <HighlightCard/> 
            </HighlightCards>
        </Container>
    )
}