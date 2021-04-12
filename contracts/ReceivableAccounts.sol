pragma solidity >=0.4.0 <0.7.0;
pragma experimental ABIEncoderV2;
//import "../contracts/Console.sol";
//contract 定义一个合约
contract ReceivableAccounts  {

  struct Arbitral{
    string arbitralName;                                   //仲裁机构名称
    address arbitralInstitutionAddress;                    //仲裁机构地址
  }

  struct Company{
    string companyName;                                    //企业名称
    address companyAddr;                                   //企业地址
    string companyKey;                                     //企业密码
    bool isTrusted;                                        //企业授信状态
    uint creditAsset;                                      //所有信用凭证数量
    uint realMoney;                                        //所有资金数量
    uint[] receiptIndex_getCreditAssetFromCompanyOrBank;   //获得授信历史列表
    uint[] receiptIndex_giveCreditAssetToCompany;          //授信转让历史列表
    uint[] receiptIndex_getRealMoneyFromBank;              //获得融资历史列表
    uint[] receiptIndex_repayRealMoneyToBank;              //还款历史列表
  }

  struct Bank{
    string bankName;                                       //机构名称
    address bankAddr;                                      //机构地址
    string bankKey;                                        //机构密码
    uint[] receiptIndex_loanMoneyToCompany;                //机构融资历史列表
    uint[] receiptIndex_authorizeCreditAssetToCompany;     //授信历史列表
    uint[] receiptIndex_getRepaidMoneyFromTrustedCompany;  //获得还款历史列表
    mapping (address => uint) companyDebtAmount;           //企业欠款记录
    address[] debtCompany;
    uint[] debt;
  }



  struct Receipt{
    address addr_A;                                       //交易发起方名称
    string name_A;                                        //交易发起方地址
    address addr_B;                                       //交易接收方名称
    string name_B;                                        //交易接收方地址
    uint amount;                                          //交易数量
    bool bankIn;                                          //银行参与标志
    bool isRealMoney;                                     //现金交易标志
  }

    /*
  struct Receipt_chain{
    bool paid;
    Receipt[] receipts;
  }
    */
    Arbitral public arbitralInstitution;
  //Console imp;
  uint public companyCount = 0;
  uint public bankCount = 0;
  uint public receiptCount = 0;
  mapping (address => Company) public companies;
  //string[] company_names;
  address[] public company_addrs;
  mapping (address => Bank) public banks;
  //string[] bank_names;
  address[] public bank_addrs;
  Receipt[] public receipts;

  bool public trustedCompanyFinishedWithBank = false;

  event func_company_login(string _name, address _addr);
  event func_bank_login(string _name, address _addr);
  event func_company_regist(string _name, address _addr, uint companyCount);
  event func_bank_regist(string _name, address _addr, uint bankCount);

  event func_bank_giveCreditAssetTo_trustedCompany(string _bName, string _cpName, address _bAddr,  address _cpAddr, uint _amount);
  event func_company_giveCreditAssetTo_company(string _cpName_A, string _cpName_B, address _cpAddr_A, address _cpAddr_B, uint _amount);
  event func_bank_giveRealMoneyTo_company(string _bName, string _cpName, address _bAddr, address _cpAddr, uint _amount);
  event func_trustedCompany_repayTo_bank(string _cpName, string _bName, address _cpAddr, address _bAddr, uint _amount);
  event func_trustedCompany_finishWith_bank(string _cpName, string _bName, address _cpAddr, address _bAddr);

  constructor(string memory arbitralInstitutionName) public {
    arbitralInstitution = Arbitral({
      arbitralName : arbitralInstitutionName,
      arbitralInstitutionAddress : msg.sender
    });
  }

  //公司注册
  function company_regist(string memory _name, string memory _key, address _addr, bool _whetherTrusted,
                uint _creditAsset, uint _realMoney ) public returns (bool){
    bool flag = false;
    require(msg.sender == arbitralInstitution.arbitralInstitutionAddress,"Only arbitral institution can add a new company!");
    for(uint i = 0; i < company_addrs.length; i++){
      require(_addr != company_addrs[i], "this company already exits.");
      require(keccak256(bytes(_name)) != keccak256(bytes(companies[company_addrs[i]].companyName)), "bank name already exits!");

    }
    companies[_addr] = Company({
      companyName : _name,
      companyAddr : _addr,
      companyKey : _key,
      isTrusted : _whetherTrusted,

      creditAsset : _creditAsset,
      receiptIndex_getCreditAssetFromCompanyOrBank : new uint[](0),
      receiptIndex_giveCreditAssetToCompany : new uint[](0),

      realMoney : _realMoney,
      receiptIndex_getRealMoneyFromBank: new uint[](0),
      receiptIndex_repayRealMoneyToBank: new uint[](0)
    });
    company_addrs.push(_addr);
    companyCount ++;
    flag = true;
    emit func_company_regist(_name, _addr, companyCount);
    return flag;
  }

  //银行注册
  function bank_regist(string memory _name, string memory _key, address _addr) public returns (bool){
    bool flag = false;
    require(msg.sender == arbitralInstitution.arbitralInstitutionAddress, "Only arbitral institution can regist a new bank!");
    for(uint i = 0; i < bank_addrs.length; i++){
      require(_addr != bank_addrs[i], "this bank already exits.");
      require(keccak256(bytes(_name)) != keccak256(bytes(banks[bank_addrs[i]].bankName)), "bank name already exits!");
    }
    banks[_addr] = Bank({
      bankName : _name,
      bankAddr : _addr,
      bankKey : _key,

      receiptIndex_loanMoneyToCompany : new uint[](0),
      receiptIndex_authorizeCreditAssetToCompany : new uint[](0),
      receiptIndex_getRepaidMoneyFromTrustedCompany : new uint[](0),
      debtCompany : new address[](0),
      debt: new uint[](0)
    });
    bank_addrs.push(_addr);
    bankCount ++;
    //log("bank name length",bank_names.length);
    flag = true;
    emit func_bank_regist(_name, _addr, bankCount);
    return flag;
  }

  //公司登入
  function company_login(string memory _name, address _addr, string memory _key) public returns(bool){
    bool flag = false;
    require(msg.sender == _addr,"Only sender can sign in!");
    require(keccak256(bytes(_name)) == keccak256(bytes(companies[msg.sender].companyName)), "name is invalid!");
    //check key
    string memory key = companies[_addr].companyKey;
    require(keccak256(bytes(key)) == keccak256(bytes(_key)), "wrong key!");
    emit func_company_login(_name, _addr);
    flag = true;
    return flag;
  }

  //银行登入
  function bank_login(string memory _name, address  _addr, string memory _key) public returns(bool){
    bool flag = false;
    require(msg.sender == _addr,"Only sender can sign in!");
    require(keccak256(bytes(_name)) == keccak256(bytes(banks[msg.sender].bankName)), "name is invalid!");
    //check key
    string memory key = banks[_addr].bankKey;
    require(keccak256(bytes(key)) == keccak256(bytes(_key)), "wrong key!");
    emit func_bank_login(_name, _addr);
    flag = true;
    return flag;
  }

  //产生新交易记录
  function newReceipt(string memory _nameA, string memory _nameB, address _addrA, address _addrB,
            uint _amount, bool _whetherBankIn, bool _isRealMoney) internal returns(uint){
    receipts.push(Receipt({
      addr_A : _addrA,
      name_A : _nameA,
      addr_B : _addrB,
      name_B : _nameB,
      amount : _amount,
      bankIn : _whetherBankIn,
      isRealMoney : _isRealMoney
    }));
    //log("receipts length", receipts.length);
    receiptCount ++;
    return receipts.length - 1;
  }

  //银行调用
  //银行颁发信用凭证给授信公司
  function bank_giveCreditAssetTo_trustedCompany(string memory _bName, string memory _cpName, address _bAddr,
                          address _cpAddr, uint _amount) public returns(bool){
    require(_amount > 0, "Amount must be positive!");
    require(_bAddr == msg.sender, "Only bank can assign credit asset to company! ");
    require(keccak256(bytes(_bName)) == keccak256(bytes(banks[_bAddr].bankName)), "bank name doesn't fit!");
    require(keccak256(bytes(_cpName)) == keccak256(bytes(companies[_cpAddr].companyName)), "company name doesn't fit!");
    require(companies[_cpAddr].isTrusted == true, "Company is not trusted!");

    uint currentReceiptIndex = newReceipt(_bName, _cpName, _bAddr, _cpAddr,  _amount, true, false);

    banks[_bAddr].receiptIndex_authorizeCreditAssetToCompany.push(currentReceiptIndex);
    banks[_bAddr].companyDebtAmount[_cpAddr] += _amount;
    banks[_bAddr].debtCompany.push(_cpAddr);

    companies[_cpAddr].creditAsset += _amount;
    companies[_cpAddr].receiptIndex_getCreditAssetFromCompanyOrBank.push(currentReceiptIndex);
    emit func_bank_giveCreditAssetTo_trustedCompany(_bName, _cpName, _bAddr, _cpAddr, _amount);
    return true;
  }

  //公司调用
  //公司颁发信用凭证给其他公司
  function company_giveCreditAssetTo_company(string memory _cpName_A, string memory _cpName_B, address _cpAddr_A,
                          address _cpAddr_B, uint _amount) public returns(bool){
    require(keccak256(bytes(_cpName_A)) != keccak256(bytes(_cpName_B)), "company A and company B should be different!");
    require(_amount > 0, "Amount must be positive!");
    require(keccak256(bytes(_cpName_A)) == keccak256(bytes(companies[_cpAddr_A].companyName)), "company A name doesn't fit!");
    require(keccak256(bytes(_cpName_B)) == keccak256(bytes(companies[_cpAddr_B].companyName)), "company B name doesn't fit!");
    require(companies[_cpAddr_A].creditAsset >= _amount, "The credit asset of company A should be more than the loan amount!");

    uint currentReceiptIndex = newReceipt(_cpName_A, _cpName_B, _cpAddr_A, _cpAddr_B, _amount, false, false);

    companies[_cpAddr_A].creditAsset -= _amount;
    companies[_cpAddr_A].receiptIndex_giveCreditAssetToCompany.push(currentReceiptIndex);

    companies[_cpAddr_B].creditAsset += _amount;
    companies[_cpAddr_B].receiptIndex_getCreditAssetFromCompanyOrBank.push(currentReceiptIndex);
    trustedCompanyFinishedWithBank = false;
    emit func_company_giveCreditAssetTo_company(_cpName_A, _cpName_B, _cpAddr_A, _cpAddr_B, _amount);
    return true;
  }

  //银行调用
  //银行贷款给有信用凭证的公司
  function bank_giveRealMoneyTo_company(string memory _bName, string memory _cpName, address _bAddr, address _cpAddr,
                                        uint _amount) public returns(bool){
    require(_amount > 0, "Amount must be positive!");
    require (msg.sender == _bAddr, "only bank can call!");
    require(keccak256(bytes(_bName)) == keccak256(bytes(banks[_bAddr].bankName)), "bank name doesn't fit!");
    require(keccak256(bytes(_cpName)) == keccak256(bytes(companies[_cpAddr].companyName)), "company name doesn't fit!");
    require(companies[_cpAddr].creditAsset >= _amount, "The credit asset of the company is not enough!");

    uint currentReceiptIndex = newReceipt(_bName, _cpName, _bAddr, _cpAddr, _amount, true, true);

    banks[_bAddr].receiptIndex_loanMoneyToCompany.push(currentReceiptIndex);

    companies[_cpAddr].creditAsset -= _amount;
    companies[_cpAddr].realMoney += _amount;
    companies[_cpAddr].receiptIndex_getRealMoneyFromBank.push(currentReceiptIndex);

    emit func_bank_giveRealMoneyTo_company(_bName, _cpName, _bAddr, _cpAddr, _amount);
    return true;

  }

  //公司调用
  //授信公司还钱给银行
  function trustedCompany_repayTo_bank(string memory _cpName, string memory _bName, address _cpAddr,
                                        address _bAddr, uint _amount) public returns(bool){
    require(_amount > 0, "Amount must be positive!");
    require(msg.sender == _cpAddr, "only the company can call");
    require(keccak256(bytes(_bName)) == keccak256(bytes(banks[_bAddr].bankName)), "bank name doesn't fit!");
    require(keccak256(bytes(_cpName)) == keccak256(bytes(companies[_cpAddr].companyName)), "company name doesn't fit!");
    require(companies[_cpAddr].isTrusted == true, "Only trusted company can repay to bank!");
    require(_amount <= (banks[_bAddr].companyDebtAmount[_cpAddr] - companies[_cpAddr].creditAsset), "Repay amount is more than the needed! ");

    uint currentReceiptIndex = newReceipt(_cpName, _bName, _cpAddr, _bAddr, _amount, true, true);

    banks[_bAddr].receiptIndex_getRepaidMoneyFromTrustedCompany.push(currentReceiptIndex);
    banks[_bAddr].companyDebtAmount[_cpAddr] -= _amount;

    companies[_cpAddr].receiptIndex_repayRealMoneyToBank.push(currentReceiptIndex);

    emit func_trustedCompany_repayTo_bank(_cpName, _bName, _cpAddr, _bAddr, _amount);
    return true;
  }
  //公司调用
  //标志交易完成
  function trustedCompany_finishWith_bank(string memory _cpName, string memory _bName, address _cpAddr, address _bAddr) public returns(bool) {
    require(keccak256(bytes(_bName)) == keccak256(bytes(banks[_bAddr].bankName)), "bank name doesn't fit!");
    require(keccak256(bytes(_cpName)) == keccak256(bytes(companies[_cpAddr].companyName)), "company name doesn't fit!");
    require(companies[_cpAddr].isTrusted == true, "Only trusted company can finish business with bank!");
    require(companies[_cpAddr].creditAsset == banks[_bAddr].companyDebtAmount[_cpAddr], "The company still has unrepaid money!");
    require(msg.sender == _bAddr, "only bank can call");
    require(companies[_cpAddr].creditAsset == 0, "not finished!");
    require(banks[_bAddr].companyDebtAmount[_cpAddr] == 0, "not finished!");

    trustedCompanyFinishedWithBank = true;

    emit func_trustedCompany_finishWith_bank(_cpName, _bName, _cpAddr, _bAddr);
    return true;
  }

  function getCompany(address _addr) public view returns(Company memory){
    return companies[_addr];
  }

function getBankDebt(address _bankAddr, address _compAddr) public view returns(uint){
    return uint(banks[_bankAddr].companyDebtAmount[_compAddr]);
  }

  function getBankDebtAmounts(address _bankAddr) public returns(uint[] memory){
    for(uint i = 0; i < banks[_bankAddr].debtCompany.length; i++){
      uint deb = getBankDebt(_bankAddr,banks[_bankAddr].debtCompany[i]);
      banks[_bankAddr].debt[i] = deb;
    }
    return banks[_bankAddr].debt;
  }

  function getBankDebtCompanys(address _bankAddr) public view returns(address[] memory){
    return banks[_bankAddr].debtCompany;
  }

  function getBankReceipts(address _addr) public view returns(uint[] memory, uint[] memory, uint[] memory){
    return (banks[_addr].receiptIndex_loanMoneyToCompany,
            banks[_addr].receiptIndex_authorizeCreditAssetToCompany,
            banks[_addr].receiptIndex_getRepaidMoneyFromTrustedCompany);
  }

}