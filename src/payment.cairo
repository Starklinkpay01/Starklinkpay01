#[starknet::interface]
trait IYieldProtocol<TContractState> {
    fn deposit_funds(ref self: TContractState, amount: u256);
    fn withdraw_funds(ref self: TContractState, amount: u256) -> u256;
    fn get_balance(self: @TContractState) -> u256;
}

#[starknet::interface]
trait IPayment<TContractState> {
    fn deposit_to_yield(ref self: TContractState, amount: u256);
    fn withdraw_from_yield(ref self: TContractState, amount: u256);
    fn get_yield_balance(self: @TContractState) -> u256;
}

#[starknet::contract]
mod Payment {
    use core::integer::u256;
    use starknet::ContractAddress;
    use super::{IPayment, IYieldProtocolDispatcher, IYieldProtocolDispatcherTrait};

    #[storage]
    struct Storage {
        balance: u256,
        yield_protocol: IYieldProtocolDispatcher,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        initial_balance: u256,
        yield_protocol_address: ContractAddress,
    ) {
        self.balance.write(initial_balance);
        self.yield_protocol.write(IYieldProtocolDispatcher { contract_address: yield_protocol_address });
    }

    #[abi(embed_v0)]
    impl PaymentImpl of IPayment<ContractState> {
        fn deposit_to_yield(ref self: ContractState, amount: u256) {
            let current_balance: u256 = self.balance.read();
            if current_balance < amount {
                return; // You can add panic or custom error
            }

            self.yield_protocol.read().deposit_funds(amount);
            self.balance.write(current_balance - amount);
        }

        fn withdraw_from_yield(ref self: ContractState, amount: u256) {
            let withdrawn: u256 = self.yield_protocol.read().withdraw_funds(amount);
            let current_balance: u256 = self.balance.read();
            self.balance.write(current_balance + withdrawn);
        }

        fn get_yield_balance(self: @ContractState) -> u256 {
            self.yield_protocol.read().get_balance()
        }
    }
}
