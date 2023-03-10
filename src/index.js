const {We} = require('@wavesenterprise/sdk')
const {TRANSACTIONS} = require('@wavesenterprise/transactions-factory')
const {Keypair} = require('@wavesenterprise/signer')

const args = process.argv.slice(2)

const SEED = args[0]
const RECIPIENT = args[1]
const AMOUNT = args[2]
const SENDER_PK = args[3]

console.log(
    "create transfer tx",
    {
        SEED,
        RECIPIENT,
        AMOUNT,
        SENDER_PK
    })

async function main() {
    const NODE_URL = 'https://client.we.vote/node-0';

    const sdk = new We(NODE_URL);
    const signerKeypair = await Keypair.fromExistingSeedPhrase(SEED)

    const tx = TRANSACTIONS.Transfer.V3({
        attachment: "",
        senderPublicKey: SENDER_PK,
        amount: Number(AMOUNT),
        recipient: RECIPIENT,
        fee: 100000,
    })

    const signedTx = await sdk.signer.getSignedTx(tx, signerKeypair);

    sdk.setApiKey("we") // ?

    const res = await sdk.broadcastRaw(signedTx.getRawBody())
    console.log('broadcastRes = ', res)
}

main().catch(console.log)