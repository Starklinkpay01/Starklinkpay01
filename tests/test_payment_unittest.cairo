#[cfg(test)]
mod tests {
    use starknet::ContractAddress;
    use starknet::testing::contract_address;
    use starknet::testing::deploy;
    use starknet::testing::start_prank;
    use starknet::testing::get_caller_address;
    use starknet::testing::set_caller_address;

    use snforge_std::{assert_eq, declare, ContractClassTrait};

    use payment::Payment::ContractState as PaymentContractState;
    use payment::Payment::PaymentImplDispatcher;
    use mock_yield::MockYield::ContractState as YieldContractState;
    use mock_yield::MockYield::MockYieldImplDispatcher;

    #[test]
    fn test_deposit_and_withdraw_to_yield() {
        // Declare and deploy mock yield protocol
        let yield_class = declare("mock_yield::MockYield");
        let yield_contract = yield_class.deploy(@u256::from(0));

        // Declare and deploy Payment contract with initial balance
        let payment_class = declare("payment::Payment");
        let initial_balance = 1000_u256;
        let payment_contract = payment_class.deploy((initial_balance, yield_contract.address()));

        let payment = PaymentImplDispatcher { contract_address: payment_contract.address() };
        let yield_mock = MockYieldImplDispatcher { contract_address: yield_contract.address() };

        // Deposit 400 to yield protocol
        payment.deposit_to_yield(400_u256);

        // Validate payment contract balance decreased
        let remaining = payment_contract.balance.read();
        assert_eq(remaining, 600_u256);

        // Validate yield contract balance increased (via internal logic or mock state)
        let yield_balance = yield_mock.get_balance();
        assert_eq(yield_balance, 400_u256);

        // Withdraw 200 from yield
        payment.withdraw_from_yield(200_u256);

        // Final balance should be 600 + 200 = 800
        let final_balance = payment_contract.balance.read();
        assert_eq(final_balance, 800_u256);
    }
}
