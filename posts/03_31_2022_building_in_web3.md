# Building without Barriers in Web3
## How I built [Slide](https://getslide.xyz) for the Riptide Hackathon

## Starting from Scratch

- first heard about the hackathon already a week in
- decided to take the time to learn Solana fundamentals (long haul)
- great overlap with something I already wanted to learn (win-win)


When I heard about [Riptide](TODO), it seemed like the perfect opportunity to get up to speed with Solana development. The hackathon had already started, but since I'm doing the 'indie hacker' thing I figured I had plenty of time to make up for the late start vs. the typical participant.

If you've been watching the crypto space in the last couple years, you've likely heard about [Solana](TODO). It's claim to fame has been an astronomical TPS number coupled with very low transaction fees when compared to Ethereum. It also chooses to use its own runtime (called [Sealevel](TODO)) atop the [BPF](TODO) virtual machine instead of Ethereum's [EVM](TODO). This means writing programs to run on Solana is typically done in Rust (compiled to BPF bytecode) instead of something like Solidity, which is specifically built to target the EVM.

These differences got me interested in starting my web3 journey with Solana, especially since I had been wanting to learn Rust for a while anyway (started going through the [Rust book](TODO) last year).

I decided to start with the fundamentals, doing a deep dive into the [Solana docs](TODO) and asking questions in Discord until I could grok the programming model.

## Getting up to Speed

- took lots of reading, experimenting, and asking on Discord (screenshots)
- finally grokked the programming model and was able to answer some questions (screenshots)

The experience of learning Solana and the other tools I needed was pretty different from how I've learned most web dev technologies.

- Documentation was often partially or completely unavailable
- Being able to jump into the source was essential
- Contacting the developers directly through Discord was common

Learning this stuff felt like trekking through wild terrain, deciphering clues left behind by other travelers. The [Anchor discord](TODO) and [Solana discord](TODO) were critical at this point. The pattern was:
1. Read the docs, read the source if it still doesn't make sense or the docs are missing
2. Try to implement what I want (keep referencing source material)
3. Ask a question in Discord about any assumptions that aren't holding up in implementation
4. Repeat

It was challenging, but it was a pleasant surprise to find that most fellow explorers were so happy and willing to lend a hand.

I'll probably write more about this another time, but I started to feel like the web3 programming model had created global incentives for developers to collaborate in a way that didn't exist before. Phrases like 'a rising tide lifts all boats' and 'wagmi' kept coming to mind...

## Testing, testing, testing

- to be honest, testing was never a priority when I was building in web2
- immediately felt different in web3
- semi-permanence of a deploy
- money on the line
- general unfamiliarity with common/subtle errors
- Anchor seemed to be the gold standard for new Program development
- can't imagine getting up to speed safely without this -- learned about attack vectors through constraints
- more Discord (screenshots)
- integration could be delicate
- found tons of bugs this way, including a very frustrating BN bug (link issue)

I'll admit that in my web2 career, testing was... not often a priority. Ignoring the wider debate about the cost/benefit of writing tests in different contexts, while developing Slide it simply didn't feel possible to build confidence that the program was working correctly without fairly detailed test cases. There seem to be a few features of Solana development (and largely of web3 development in general) that caused this:

- Deploys are far more costly/difficult to rollback or upgrade
- There are some failure modes that _literally_ can disappear your money or your users' money
- A program on the blockchain is in a _very_ adversarial environment (all inputs are untrusted)

Luckily, [Anchor](TODO) exists. Anchor seems to be the gold standard Solana Program framework, and it facilitated easy testing of my app as well as hardening against typical attacks. The [Anchor book](TODO), [discord](TODO), and specifically the [Account constraints documentation](TODO) were invaluable.

Finally getting to all green tests was a great feeling.

## Straight to the Source

- by far most exciting part about building Slide was learning directly from the source of other programs
- governance and squads specifically taught me a lot
- asked for Squads crate -> got Squads crate next day (screenshot)
- even governance UI and SDK code was helpful in writing tests and UI (client-side)

## Permissionless Integration

- I've built a handful of traditional OAuth integrations in web2
- always requires you to make a dev account, sign up for a trial, often agree to a pricing plan
- web3 disrupts this completely, since the programs are permissionlessly callable on chain by anyone
- it's just a matter of maintaining security guarantees and making well-formed calls
- since Squads was open-source, took what I learned from governance-sdk and built my own SDK for tests/UI
- also was able to build and deploy the crate to devnet when the official devnet was out-of-date
- the line between core dev and external contributor is blurred
- incredible DIY feeling

## The Product

- take blurbs from main site
- if you are part of a DAO on Realms or Squads on devnet, you can use Slide right now!

## Join me!

- I'm going to do a deeper dive into the technical parts of ramping up on Solana as a beginner
- sign up with your email if you want to hear about that post or other stuff in the future
- can also connect with me on socials (Discord, Twitter, Github)

## Shoutouts

- SPL Governance: Sebastian, Maximilian (should I include him?)
- Anchor: cqfd, maybe others
- Squads: Dmitry, Stepan?, other Devs (look at screenshots)