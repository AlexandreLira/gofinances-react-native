import React from "react";

import { render } from '@testing-library/react-native';
import { Input } from "../../components/Form/Input";
import theme from "../../global/styles/theme";
import { ThemeProvider } from "styled-components/native";

const Providers: React.FC = ({ children }: any) => (
    <ThemeProvider theme={ theme}>
        {children}
    </ThemeProvider>
)

describe('Input component', () => {
    it('must have specific border color when active', () => {
        const { getByTestId } = render(
            <Input
                testID="input-email"
                keyboardType="email-address"
                autoCorrect={false}
                active={true}
            />, {
            wrapper: Providers
        }
        )

        const inputComponent = getByTestId('input-email')
        expect(inputComponent.props.style[0].borderColor)
            .toEqual(theme.colors.attention)
    })
})