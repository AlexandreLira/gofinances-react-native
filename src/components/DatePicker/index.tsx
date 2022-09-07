import React from 'react';
import DateTimePicker, { BaseProps } from '@react-native-community/datetimepicker';
import { Container, Date, Icon } from './styles';
import { format } from 'date-fns';

interface DatePickerProps extends BaseProps {
    value: Date;
    show: boolean
    onPress?: () => void;
}

export function DatePicker({
    value,
    show,
    onPress,
    ...rest
}: DatePickerProps) {

    return (
        <Container onPress={onPress} >
            {show &&
                <DateTimePicker
                    value={value}
                    {...rest}
                />
            }

            <Date>{format(value, 'dd/MM/yyyy')}</Date>
            <Icon name="calendar" />

        </Container>
    )
}