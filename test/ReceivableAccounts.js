const ReceivableAccounts = artifacts.require('../contracts/ReceivableAccounts.sol');

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('ReceivableAccounts', ([admin, trusted_company, untrusted_company, bank1, bank2]) => {
	let receivableAccounts
	let trusted_company_key = '123456'
	let untrusted_company_key = '123456'
	let bank1_key = '123456'
	let bank2_key = '123456'
	let trusted_company_name = 'Google'
	let untrusted_company_name = 'Baidu'
	let bank1_name = 'CitiBank'
	let trust_cp_reg, untrust_cp_reg, b_reg, compCount, bankCount
	let amount = 100000

	before(async () => {
		receivableAccounts = await ReceivableAccounts.deployed()
		trust_cp_reg = await receivableAccounts.company_regist(trusted_company_name, trusted_company_key, trusted_company, true, 0, 0, {from: admin})
		untrust_cp_reg = await receivableAccounts.company_regist(untrusted_company_name, untrusted_company_key, untrusted_company, false, 0, 0, {from: admin})
		b_reg = await receivableAccounts.bank_regist(bank1_name, bank1_key, bank1, {from: admin})
	})

	describe('deployment', async () => {
		it('deploys successfully', async() => {
		//	receivableAccounts = await ReceivableAccounts.deployed()
			const address = await receivableAccounts.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address,'')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})
	})

	describe('regist', async() =>{
		

		it('company regist', async() => {
			//trust_cp_reg = await receivableAccounts.company_regist('Google',  trusted_company_key, trusted_company, true, 0, 0, {from: admin})
			//untrust_cp_reg = await receivableAccounts.company_regist('Baidu',  untrusted_company_key, untrusted_company, false, 0, 0, {from: admin})
			compCount = await receivableAccounts.companyCount()
			//success
			//assert.equal(trust_cp_reg, true)
			//assert.equal(untrust_cp_reg, true)
			assert.equal(compCount, 2)
			const event1 = trust_cp_reg.logs[0].args
			const event2 = untrust_cp_reg.logs[0].args
			console.log(event1)
			console.log(event2)
		})

		it('bank regist', async() => {
			bankCount = await receivableAccounts.bankCount()
			//success
			//assert.equal(b_reg, true)
			assert.equal(bankCount, 1)
			const event3 = b_reg.logs[0].args
			console.log(event3)

			await receivableAccounts.bank_regist(bank1_name, bank2_key, bank2).should.be.rejected;
		})
	})

	describe('login', async() =>{
		it('company login', async() => {
			let trusted_company_login, untrusted_company_login
			trusted_company_login = await receivableAccounts.company_login(trusted_company_name, trusted_company, trusted_company_key, {from: trusted_company})
			untrusted_company_login = await receivableAccounts.company_login(untrusted_company_name, untrusted_company, untrusted_company_key, {from: untrusted_company})
			//success
			const event1_login = trusted_company_login.logs[0].args
			console.log(event1_login)
			const event2_login = untrusted_company_login.logs[0].args
			console.log(event2_login)
			//failure
			await receivableAccounts.company_login(trusted_company_name, trusted_company, trusted_company_key, {from: untrusted_company}).should.be.rejected;
		})

		it('bank login', async() => {
			let bank1_login
			bank1_login = await receivableAccounts.bank_login(bank1_name, bank1, bank1_key, {from: bank1})
			//success
			const event3_login = bank1_login.logs[0].args
			console.log(event3_login)
			//failure
			await receivableAccounts.bank_login(bank1_name, bank1, bank1_key, {from: bank2}).should.be.rejected;
		})

		

		
	})

	describe('transactions', async() => {
		it('bank give creditAsset to trusted company', async() => {
			let b_CA_to_tcp
			b_CA_to_tcp = await receivableAccounts.bank_giveCreditAssetTo_trustedCompany(bank1_name, trusted_company_name, bank1, trusted_company, 100000, {from: bank1})
			//success
			const event = b_CA_to_tcp.logs[0].args
			console.log(event)
			//failure
			await receivableAccounts.bank_giveCreditAssetTo_trustedCompany(bank1_name, untrusted_company_name, bank1, untrusted_company, 100000, {from: bank1}).should.be.rejected;
			await receivableAccounts.bank_giveCreditAssetTo_trustedCompany(bank1_name, trusted_company_name, bank1, trusted_company, 100000, {from: bank2}).should.be.rejected;
		})

		it('trusted company give creditAsset to untrusted company', async() => {
			let tcp_CA_to_utcp
			tcp_CA_to_utcp = await receivableAccounts.company_giveCreditAssetTo_company(trusted_company_name, untrusted_company_name, trusted_company, untrusted_company, 100000, {from: trusted_company}) 
			//success
			const event = tcp_CA_to_utcp.logs[0].args
			console.log(event)
			//failure
			//untrusted company calling
			await receivableAccounts.company_giveCreditAssetTo_company(untrusted_company_name, trusted_company_name, untrusted_company, trusted_company, 1000000, {from: untrusted_company}).should.be.rejected;
			//trusted company given amount overflow
			await receivableAccounts.company_giveCreditAssetTo_company(trusted_company_name, untrusted_company_name, trusted_company, untrusted_company, 1000000, {from: trusted_company}).should.be.rejected; 
		})

		it('bank give real money to company in need', async() => {
			let b_RM_to_cp
			b_RM_to_cp = await receivableAccounts.bank_giveRealMoneyTo_company(bank1_name, untrusted_company_name, bank1, untrusted_company, 100000, {from: bank1}) 
			//success
			const event = b_RM_to_cp.logs[0].args
			console.log(event)
			//failure
			await receivableAccounts.bank_giveRealMoneyTo_company(bank1_name, untrusted_company_name, bank1, untrusted_company, 100000, {from: trusted_company}).should.be.rejected;
			await receivableAccounts.bank_giveRealMoneyTo_company(bank1_name, untrusted_company_name, bank1, untrusted_company, 1000000, {from: bank1}).should.be.rejected;
		})

		it('trusted company repay money to the bank', async() => {
			let tcp_RM_to_b
			tcp_RM_to_b = await receivableAccounts. trustedCompany_repayTo_bank(trusted_company_name, bank1_name, trusted_company, bank1, 100000, {from: trusted_company})
			 //success
			const event = tcp_RM_to_b.logs[0].args
			console.log(event)
			//failure
			await receivableAccounts. trustedCompany_repayTo_bank(untrusted_company_name, bank1_name, untrusted_company, bank1, 10000, {from: untrusted_company}).should.be.rejected;
			await receivableAccounts. trustedCompany_repayTo_bank(trusted_company_name, bank1_name, trusted_company, bank1, 1000000, {from: trusted_company}).should.be.rejected;

		})

		it('trusted company finished with bank', async() => {
			let tcp_FIN_with_b
			tcp_FIN_with_b = await receivableAccounts. trustedCompany_finishWith_bank(trusted_company_name, bank1_name, trusted_company, bank1, {from: bank1})
			 //success
			 const event = tcp_FIN_with_b.logs[0].args
			 console.log(event)
			 //failure
			// await receivableAccounts. trustedCompany_finishWith_bank(trusted_company_name, bank1_name, trusted_company, bank1, {from: bank1}).should.be.rejected;


		})
	})

})
