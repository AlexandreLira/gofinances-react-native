import React from 'react';
import { Button } from '../../components/Form/Button';

import { Header } from '../../components/Header';

import { categories } from '../../utils/categories';

import {
    CategoriesList,
    Category,
    Container,
    Footer,
    Icon,
    Name,
    Separator
} from './styles';

interface Category {
    key: string;
    name: string;
}

interface CategorySelectProps {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: CategorySelectProps) {

    function handleCategorySelect(item: Category){
        setCategory(item)
    }
    return (
        <Container>
            <Header title="Categoria" />
            <CategoriesList
                data={categories}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category 
                        onPress={() => handleCategorySelect(item)}
                        isActive={Boolean(item.key === category.key)}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button
                    title='Selecionar'
                    onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    )
}