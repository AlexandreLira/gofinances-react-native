import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import {
    Container,
    Form,
    Fields,
    TransactionTypes
} from './styles';
import { CategorySelect } from '../CategorySelect';

export function Register() {
    const [transactionType, setTransactionType] = useState<'up' | 'down' | ''>('');
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [seletedCategory, setSeletedCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        if (type === transactionType) {
            setTransactionType('')
            return
        }
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }
    
    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }


    return (
        <Container>
            <Header title="Cadastro" />
            <Form>
                <Fields>
                    <Input
                        placeholder='Nome'
                    />
                    <Input
                        placeholder='Valor'
                    />
                    <TransactionTypes>
                        <TransactionTypeButton
                            isActive={Boolean(transactionType === 'up')}
                            title='Income'
                            type='up'
                            onPress={() => handleTransactionTypeSelect('up')}
                        />
                        <TransactionTypeButton
                            isActive={Boolean(transactionType === 'down')}
                            title='Outcome'
                            type='down'
                            onPress={() => handleTransactionTypeSelect('down')}
                        />
                    </TransactionTypes>
                    <CategorySelectButton
                        onPress={handleOpenSelectCategoryModal}
                        title={seletedCategory.name}
                    />
                </Fields>

                <Button title='Enviar'/>
            </Form>

            <Modal
                visible={categoryModalOpen}
                animationType="slide"
            >
                <CategorySelect
                    category={seletedCategory}
                    setCategory={setSeletedCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    )
}