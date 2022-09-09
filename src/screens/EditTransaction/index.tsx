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


import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import {
    Container,
    Form,
    Fields,
    TransactionTypes
} from '../Register/styles';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Form/InputForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRANSACTION_STORAGE_KEY_BY_USER } from '../../utils/constants'
import { categories } from '../../utils/categories';
import { DatePicker } from '../../components/DatePicker';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

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

export function EditTransaction({route}: any) {
    const { transactionId } = route.params

    const [transactionType, setTransactionType] = useState<'up' | 'down' | ''>('');

    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false)
    const [seletedCategory, setSeletedCategory] = useState({
        key: 'withoutCategory',
        name: 'Selecione a categoria'
    })
    const { user } = useAuth()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm({ resolver: yupResolver(schema) })

    const navigation: NavigationProp<ParamListBase> = useNavigation()
   

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

        try {
            const storage = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY_BY_USER+user.id)
            const currentData = storage ? JSON.parse(storage) : []

            const transactionIndex = currentData.findIndex((transaction: any) => transaction.id === data.id)
        
            currentData[transactionIndex] = data

            await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY_BY_USER+user.id, JSON.stringify(currentData))
        } catch (error) {
            console.warn(error)
            alert('Não foi possivel salvar a transação!')
        }

    }

    async function handleRegister(form: Partial<FormData>) {
        const { title, amount } = form

        const data = {
            id: transactionId,
            title: title!.trim(),
            type: transactionType,
            category: seletedCategory.key,
            amount,
            date,
        }

        if (!transactionType) {
            return Alert.alert('Selecione um tipo da  transação!')
        }
        if (data.category === 'withoutCategory') {
            return Alert.alert('Selecione uma categoria!')
        }

        await saveTransactionOnStorage(data)
        resetForm()
        navigation.navigate('Home')
    }

    async function getTransaction(){
        const response = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY_BY_USER+user.id)
        const transactionsData = response ? JSON.parse(response) : []
        const [transaction] = transactionsData.filter((transaction: any) => transaction.id === transactionId)
        const [category] = categories.filter(category => transaction.category === category.key)
        
        setDate(new Date(transaction.date))
        setTransactionType(transaction.type)
        setValue('title', transaction.title)
        setValue('amount', String(transaction.amount))

        setSeletedCategory({
            key: category.key,
            name: category.name
        })
    }

    function handleOnChangeDate(event: any){
        const {nativeEvent, type} = event
        if(type === 'set'){
            const newDate = new Date(nativeEvent.timestamp)
            setDate(newDate)
            setShowDate(false)
            
        }
    }

    useEffect(() => {
        getTransaction()
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header title="Editar" />
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

                        <DatePicker
                            show={showDate}
                            value={date}
                            onPress={() => setShowDate(true)}
                            onChange={handleOnChangeDate}
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