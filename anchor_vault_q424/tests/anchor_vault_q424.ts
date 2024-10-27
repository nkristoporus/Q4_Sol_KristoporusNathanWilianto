import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorVaultQ424 } from "../target/types/anchor_vault_q_424";

describe("anchor_vault_q424", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorVaultQ424 as Program<AnchorVaultQ424>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your initalize transaction signature", tx);
  });

  it("deposit", async () => {
    // Add your test here.
    const tx = await program.methods.deposit(new anchor.BN(0.3)).rpc();
    console.log("Your deposit transaction signature", tx);
  });

  it("withdraw", async () => {
    // Add your test here.
    const tx = await program.methods.withdraw(new anchor.BN(0.2)).rpc();
    console.log("Your withdraw transaction signature", tx);
  });

  it("close", async () => {
    // Add your test here.
    const tx = await program.methods.close().rpc();
    console.log("Your close transaction signature", tx);
  });
});
