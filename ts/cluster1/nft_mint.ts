import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    try {
        let tx = createNft(
            umi,
            {
                mint,
                name: "Rug-NFT",
                symbol: "RUG",
                uri: "https://devnet.irys.xyz/FWniSRrpY46Cc8sSF3MTbFS7Xxk7BHYLoK2qwc3wDzpe",
                sellerFeeBasisPoints: {
                    basisPoints: 10n,
                    decimals: 2,
                    identifier: "%"
                },
            }
        )
        let result = await tx.sendAndConfirm(umi);
        const signature = base58.encode(result.signature);
        
        console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    
        console.log("Mint Address: ", mint.publicKey);
    } catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();