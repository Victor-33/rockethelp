import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut} from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';
import {Filter} from '../components/Filter';
import {useState} from 'react';
import {Order, OrderProps} from '../components/Order';
import {Button} from '../components/Button';
import {ChatTeardropText} from 'phosphor-react-native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

export function Home() {

    const { colors } = useTheme();
    const navigation = useNavigation();
    const [statusSelected, setstatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]> ([
        {
            id: '123', 
            patrimony: '123456',
            when: '18/07/2022 às 14',
            status: 'open'
        }
    ]);
    

    function handleNewOrder(){
        navigation.navigate('new');
    }

    function handleOpenDetails (orderId: string){
        navigation.navigate('details', {orderId})
    }

    return (
    <VStack flex={1} pb={6} bg="gray.700">
        <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
        >
            <Logo />

            <IconButton
                icon={<SignOut size={26} color={colors.gray[300]} />}
            />

        </HStack>

        <VStack flex={1} px={6}>
            <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                <Heading color="gray.100">
                    Meus chamados
                </Heading>
                <Text color="gray.200">
                    3
                </Text>
            </HStack>

            <HStack space={2} mb={8}>
                <Filter 
                    type="open"
                    title="em andamento"
                    onPress={() => setstatusSelected('open')}
                    isActive={statusSelected === 'open'}
                />

                <Filter 
                    type="closed"
                    title="finalizados"
                    onPress={() => setstatusSelected('closed')}
                    isActive={statusSelected === 'closed'}
                />

            </HStack>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 30}}
                ListEmptyComponent={() => (
                    <Center>
                        <ChatTeardropText color={colors.gray[300]} size={40}/>
                        <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                            Você ainda não possui {'\n'}
                            solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                        </Text>
                    </Center>
                )}
            />

            <Button title="Nova Solicitação" onPress={handleNewOrder} />
        </VStack>
    </VStack>
  );
}