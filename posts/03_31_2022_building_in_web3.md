# Building without Barriers in Web3
## How I built [Slide](https://getslide.xyz) for the Riptide Hackathon

![Slide Banner](/slidehome.png)

## Starting from Scratch

When I heard about [Riptide](https://solana.com/riptide), it seemed like the perfect opportunity to get up to speed with Solana development. The hackathon had already started, but since I'm doing the 'indie hacker' thing I figured I had plenty of time to make up for the late start vs. the typical participant.

If you've been watching the crypto space in the last couple years, you've likely heard about [Solana](https://solana.com/). Its claim to fame has been an astronomical TPS number coupled with very low transaction fees when compared to Ethereum. It also chooses to use its own runtime (called [Sealevel](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192)) atop the [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) virtual machine instead of Ethereum's EVM. This means writing programs to run on Solana is typically done in Rust (compiled to BPF bytecode) instead of something like Solidity, which is specifically built to target the EVM.

These differences got me interested in starting my web3 journey with Solana, especially since I had been wanting to learn Rust for a while anyway (started going through the [Rust book](https://doc.rust-lang.org/stable/book/) last year).

I decided to start with the fundamentals, doing a deep dive into the [Solana docs](https://docs.solana.com/) and asking questions in Discord until I could grok the programming model.

## Getting up to Speed

The experience of learning Solana and the other tools I needed was pretty different from how I've learned most web dev technologies.

- Documentation was often partially or completely unavailable
- Being able to jump into the source was essential
- Contacting the developers directly through Discord was common

Learning this stuff felt like trekking through the jungle, deciphering clues left behind by other travelers. The [Anchor discord](https://discord.gg/HB2kAveZ) and [Solana discord](https://discord.gg/solana) were critical at this point. The pattern was:

1. Read the docs, read the source if it still doesn't make sense or the docs are missing
2. Try to implement what I want (keep referencing source material)
3. Ask a question in Discord about any assumptions that aren't holding up in implementation
4. Repeat

It was challenging, but it was a pleasant surprise to find that most fellow explorers were more than willing to lend a hand. The web3 programming model seems to lead to global incentives for developers to collaborate, since 'growing the community' is almost always the top priority.

## Testing, testing, testing

It's no secret that testing often gets sacrificed for raw feature development velocity. Ignoring the wider debate about the cost/benefit of writing tests in different contexts, while developing Slide it just didn't feel possible to build confidence that the program was working correctly without fairly detailed test cases. There seem to be a few features of Solana development (and largely of web3 development in general) that caused this:

- Deploys are far more costly/difficult to rollback or upgrade
- There are some failure modes that _literally_ can disappear your money or your users' money
- A program on the blockchain is in a _very_ adversarial environment (all inputs are untrusted)

Luckily, [Anchor](https://github.com/project-serum/anchor) exists. Anchor seems to be the gold standard Solana Program framework, and it facilitated easy testing of my app as well as hardening against typical attacks. The [Anchor book](https://book.anchor-lang.com/), [discord](https://discord.gg/HB2kAveZ), and specifically the [Account constraints documentation](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html) were invaluable. The most common attack vectors for Solana programs are handled easily using constraints (address validation, ownership checks, initialization strictness etc.), and Anchor even generates a full TS client for interacting with your program (built from a portable JSON IDL file).

Finally getting to all green tests was a great feeling.

![All Tests Passing](/Anchor_all_green_tests.png)

## Straight to the Source

One of my favorite parts of the whole building experience was learning from the source of other programs and tools in the Solana ecosystem. I learned the nitty-gritty of serializing and deserializing account data, some great patterns for client SDKs, and some interesting data modeling techniques.

I referred to these codebases frequently:
- [SPL Governance Programs](https://github.com/solana-labs/solana-program-library/tree/master/governance)
- [SPL Governance SDK](https://github.com/solana-labs/oyster/tree/main/packages/governance-sdk)
- [Squads Programs](https://github.com/squads-dapp/program)
- [Anchor](https://github.com/project-serum/anchor)

While the open source ethos is not strictly included in the 'web3' umbrella for some, I tend to agree with [Armani Ferrante](https://twitter.com/armaniferrante/status/1507858297067642883) that being open source is a prerequisite to being decentralized. So if you are interested in building decentralized products, you should probably be open sourcing your code.

As a dev, I can't really imagine getting deeply involved in a web3 community with a closed-source product. The code is an easy launching point for a discussion with the core team, and it gives engaged community members a way to really contribute. I was happy to put up a couple [tiny](https://github.com/solana-labs/oyster/pull/524) [PRs](https://github.com/squads-dapp/program/pull/1) to resolve issues I faced while learning.


## Permissionless Integration

This is the idea that keeps coming back to me. The most significant difference in my experience building in web3 was the fact that integrating with existing programs was _permissionless_. The on-chain data is *public*. The program itself is *public*. There is no API token, there is no OAuth flow, there are no developer terms-of-service. Every program is running on the same, globally-distributed VM, and in some real sense that means every developer building on Solana is working on the _same project_.

Coming back down to earth though, there are still some practical considerations when integrating with an existing on-chain program that I'm curious to watch evolve over time:
- upgradeability and dependency version control in general
  - pinning a dependency version may not be possible, how do you handle a dependency on a program that may change at any time?
- 'closed source' projects
  - do good decompilers exist yet? e.g. BPF -> Rust
- hardcoded official/canonical program deployment IDs
  - how can you securely support custom deployments of a dependency?
  - could hosting older versions of a dependency be incentivized somehow? (message me if this sounds interesting btw)

Luckily, I didn't have to deal with decompiling or reverse engineering any closed source programs, and considering the context I was okay with depending on a potentially upgradeable program in the cases of SPL Governance and Squads. I hardcoded their canonical program IDs, and the security boundary of my app still felt reasonable. Since Slide can be thought of as an extension of the underlying DAO, inheriting the DAO's attack surface seems essentially unavoidable.

Integrating with SPL Governance and Squads essentially meant understanding their data models, instructions, and even UI (since I would expect my users to interact through the official UI). This was straightforward, and involved plenty of source-diving, creating some test DAOs for myself, and even [writing my own (partial) SDK](https://www.npmjs.com/package/@slidexyz/squads-sdk) for Squads so that I could interact with their programs from the client-side.

Then, when I realized that the devnet version of Squads was running different code than the newer mainnet release (which matched the open sourced programs code), it occurred to me that I could sidestep the issue and deploy [another version of Squads](https://explorer.solana.com/address/3BgFvAdsYQsX7MfudNcXcLFizyy2XSBL3uuZeUysR2p7?cluster=devnet) on devnet! This let me write code targeting the latest version of the Squads codebase without needing to commit to a full mainnet deploy. Thankfully the official Squads devnet deploy is now upgraded, so I can use the same canonical ID for both networks, but the ease of the re-deploy workaround stuck out to me as something specific to the 'shared VM' nature of web3.

It felt like there were no barriers to building on top of these products, I was only limited by my own understanding and time.

## The Product

If you are a member of a DAO on Realms or a Squad on devnet, you can use [Slide](https://getslide.xyz) right now!

Slide makes your DAO move faster. You can handle day-to-day payments and expense reimbursements _without_ bringing the whole DAO in for a vote every time.

With Slide you can pre-approve a certain amount of funds for general expenses, then vote to grant administrative rights over these funds to specific officers in your DAO. Then, any DAO member can submit a claim for reimbursement which will be immediately available for withdrawal after an officer approves it.

The product is in an open beta and every action occurs on *devnet* today. Feedback is more than welcome!

The frontend was built on top of a very useful [scaffold repo](https://github.com/thuglabs/create-dapp-solana-nextjs) that I highly recommend. It's got a modern Next.js setup with a nice Tailwind theme and includes pretty much all the necessary solana web3 dependencies.

## Join me!

If this post resonated with you, I'd love to connect!

In the future I might post:
- technical guides to get started with Solana development
- reviews/deep dives on interesting web3 projects
- thoughts on indie hacking
- cool stuff I've built!

Add me on
Discord (nashsando#1005)  |  [Twitter](https://twitter.com/evandoyleDEV)  |  [Github](https://github.com/emdoyle)

## Shoutouts

I'm very grateful for the time and effort some in the community gave to help me get up to speed.
Special thanks to:
- [cqfd (Anchor)](https://twitter.com/cqfdee)
- [Sebastian (Realms)](https://twitter.com/Sebastian_Bor)
- [Dmitry (Squads)](https://twitter.com/mitya_tzar)