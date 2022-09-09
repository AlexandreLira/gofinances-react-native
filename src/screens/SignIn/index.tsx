import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {
    Container,
    Footer,
    FooterWrapper,
    Header,
    SignInTitle,
    Title,
    TitleWrapper
} from "./styles";
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const { signInWithGoogle, signInWithApple } = useAuth()
    const theme = useTheme()

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true)
            await signInWithGoogle()

        } catch (error) {
            setIsLoading(false)
            console.warn(error)
            Alert.alert('Não foi possivel conectar a conta google')
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true)
            await signInWithApple()

        } catch (error) {
            setIsLoading(false)
            console.warn(error)
            Alert.alert('Não foi possivel conectar a conta apple')
        }
    }
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas{'\n'}
                        finanças de forma{'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com{'\n'}
                    uma das contas abaixo
                </SignInTitle>


            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title='Entrar com Google'
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />

                    {Platform.OS === 'ios' &&
                        <SignInSocialButton
                            title='Entrar com Apple'
                            svg={AppleSvg}
                            onPress={handleSignInWithApple}
                        />
                    }

                </FooterWrapper>

                {isLoading && <ActivityIndicator size="large" color={theme.colors.shape} />}
            </Footer>
        </Container>
    )
}