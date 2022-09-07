import React, { useEffect, useState } from 'react';

import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native'

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRANSACTION_STORAGE_KEY } from '../../utils/constants';

interface FormData {
    title: string;
    amount: string;
}

const schema = yup.object({
    title: yup
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

    const navigation = useNavigation()

    const {
        control,
        handleSubmit,
        reset,
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


    function resetForm(){
        setSeletedCategory({
            key: 'withoutCategory',
            name: 'Selecione a categoria'
        })
        setTransactionType('')
        reset()
    }

    async function saveTransactionOnStorage(data: any) {
        const newTransaction = {
            id: String(uuid.v4()),
            date: new Date(),
            ...data,
        }

        try {
            const storage = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
            const currentData = storage ? JSON.parse(storage) : []

            const dataFormatted = JSON.stringify([
                newTransaction,
                ...currentData
            ])

            await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, dataFormatted)
        } catch (error) {
            console.log(error)
            alert('Não foi possivel salvar a transação!')
        }

    }

    function handleRegister(form: Partial<FormData>) {
        const { title, amount } = form

        const data = {
            title: title!.trim(),
            amount,
            category: seletedCategory.key,
            type: transactionType
        }

        if (!transactionType) {
            return Alert.alert('Selecione um tipo da  transação!')
        }
        if (data.category === 'withoutCategory') {
            return Alert.alert('Selecione uma categoria!')
        }

        saveTransactionOnStorage(data)
        resetForm()
        navigation.navigate('Listagem')
    }


    useEffect(() => {
        async function loadTransactions(){
            const data = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY) || '[]'
            console.log(JSON.parse(data))
        }
        loadTransactions()
    },[]) 



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header title="Cadastro" />
                <Form>
                    <Fields>

                        <InputForm
                            placeholder='Descrição'
                            control={control}
                            name="title"
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.title && String(errors.title.message)}
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