import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Category } from "./styles";

interface CategorySelectButtonProps extends TouchableOpacityProps {
    title: string;
}

export function CategorySelectButton({ title, ...rest }: CategorySelectButtonProps) {
    return (
        <Container {...rest}>
            <Category>{title}</Category>
            <Icon name="chevron-down" />
        </Container>

    )
}