import React, { useState } from 'react';

import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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
import { InputForm } from '../../components/Form/InputForm';

interface FormData {
    description: string;
    amount: string;
}

const schema = yup.object({
    description: yup
        .string()
        .required('Descrição obrigatoria'),
    amount: yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .integer('O valor precisa ser um inteiro')
        .required('Valor obrigatorio')
}).required()

export function Register() {
    const [transactionType, setTransactionType] = useState<'up' | 'down' | ''>('');
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [seletedCategory, setSeletedCategory] = useState({
        key: 'withoutCategory',
        name: 'Selecione a categoria'
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) })

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

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleRegister(form: Partial<FormData>) {
        const { description, amount } = form

        const data = {
            description,
            amount,
            category: seletedCategory.key,
            transactionType
        }

        if (!transactionType) {
            return Alert.alert('Selecione um tipo da  transação!')
        }
        if (data.category === 'withoutCategory') {
            return Alert.alert('Selecione uma categoria!')
        }

    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header title="Cadastro" />
                <Form>
                    <Fields>

                        <InputForm
                            placeholder='Descrição'
                            control={control}
                            name="description"
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.description && String(errors.description.message)}
                        />
                        <InputForm
                            placeholder='Valor'
                            control={control}
                            name="amount"
                            keyboardType='numeric'
                            error={errors.amount && String(errors.amount.message)}
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

                    <Button
                        title='Enviar'
                        onPress={handleSubmit((handleRegister))}
                    />
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
        </TouchableWithoutFeedback>
    )
}