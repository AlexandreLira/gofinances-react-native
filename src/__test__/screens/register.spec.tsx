import { fireEvent, render } from "@testing-library/react-native"
import React from "react"
import { ThemeProvider } from "styled-components/native"
import theme from "../../global/styles/theme"
import { Register } from "../../screens/Register"

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: jest.fn()
    }
})

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


const Providers: React.FC = ({ children }: any) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
)


describe('register Screen', () => {
    it('should be open category modal when user click on button', () => {
        const { getByTestId } = render(
            <Register />
            , {
                wrapper: Providers
            })

        const modalCategory = getByTestId('modal-category')
        const buttonCategory = getByTestId('button-category')

        fireEvent.press(buttonCategory)

        expect(modalCategory.props.visible).toBeTruthy()

    })

})