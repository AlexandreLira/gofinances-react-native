import React from 'react';              
import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
    Button,
    ImageContainer,
    Text
} from "./styles";

interface SignInSocialButtonProps extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>
}

export function SignInSocialButton({
    title, 
    svg: Svg,
    ...rest
}: SignInSocialButtonProps) {
    return (
        <Button {...rest}>
            <ImageContainer>
                <Svg width={24} height={24}/>
            </ImageContainer>

            <Text>
                {title}
            </Text>
        </Button>
    )
}