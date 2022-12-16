import React from "react"
import { renderHook, act } from '@testing-library/react-hooks'
import { AuthProvider, useAuth } from "../../hooks/auth"
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock"
import * as AuthSession from 'expo-auth-session';
import { USER_STORAGE_KEY } from '../../utils/constants'

jest.mock('expo-auth-session')

const mockedStartAsync = AuthSession as jest.Mocked<typeof AuthSession>

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing', async () => {
        //@ts-ignore
        mockedStartAsync.startAsync.mockResolvedValue<any>({
            type: 'success',
            params: {
                access_token: 'google-token'
            }
        })

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                id: 'userInfo.id',
                email: 'userInfo.email',
                name: 'userInfo.name',
                photo: 'userInfo.picture',
                locate: 'userInfo.locate',
                verified_email: 'userInfo.verified_email',
            })
        })) as jest.Mock;

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).toBeTruthy();
    })

    it('user should not connect if cancel authetication with Google ', async () => {
        AsyncStorage.removeItem(USER_STORAGE_KEY)
        mockedStartAsync.startAsync.mockResolvedValue({
            type: 'cancel',
        })

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).not.toHaveProperty('id');
    })
})