import React from "react";

import { render } from '@testing-library/react-native';

import { Profile } from "../../screens/Profile";


describe('Profile', () => {
    it('should be correctly placeholder input name ', () => {
        const { debug, getByPlaceholderText } = render(<Profile/>)
    
    
        const inputName = getByPlaceholderText('Nome')
    
        expect(inputName).toBeTruthy()
    });
    
    it('should be load user data', () => {
        const { getByTestId } = render(<Profile/>)
    
        const inputName = getByTestId('input-name')
        const inputSurname = getByTestId('input-surname')
    
        expect(inputName.props.value).toEqual('Alexandre')
        expect(inputSurname.props.value).toEqual('Lira')
    })
    
    it('should exist a title correctly', () => {
        const { getByTestId } = render(<Profile/>)
    
        const textTitle = getByTestId('text-title');
    
        expect(textTitle.props.children).toContain('Perfil')
    })

})


