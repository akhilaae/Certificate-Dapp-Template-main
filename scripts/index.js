var web3;
var contractInstance;

window.onload = async()=>{
    web3 = new Web3(ethereum);
    var abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_course",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_grade",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_date",
                    "type": "string"
                }
            ],
            "name": "issue",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "certificates",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "course",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "grade",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "date",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    var contractAddress = "0xE2491510F37Db1AbE6655f4ff5e1B918cB5049e7";
    let accounts = await ethereum.request({method : "eth_requestAccounts"});
    
    contractInstance = new web3.eth.Contract(abi,contractAddress);
}
    issueCertificate = async () => {
        let certificateID = document.getElementById("certificateID").value;
        let candidateName = document.getElementById("candidateName").value;
        let courseName = document.getElementById("courseName").value;
        let grade = document.getElementById("grade").value;
        let date = document.getElementById("date").value;
        let trxReceipt = await MyContract.methods
          .issue(certificateID, candidateName, courseName, grade, date)
          .send({ from: ethereum.selectedAddress, gasLimit: 500000 });
        console.log("Trx: ", trxReceipt);
        alert(`Certificate is issued for ${certificateID}!`);
        // console.log(certificateID,candidateName,courseName,grade,date)
      };

      getCertificateDetails = async () => {
        let certificateID = document.getElementById("certificateID").value;
        console.log(certificateID);
        let result = await MyContract.methods.Certificates(certificateID).call();
        sessionStorage.setItem("certificateID", certificateID);
        sessionStorage.setItem("candidateName", result.name);
        sessionStorage.setItem("courseName", result.course);
        sessionStorage.setItem("grade", result.grade);
        sessionStorage.setItem("date", result.date);
        window.location.href = "viewCertificate.html";
      };
