# Building without Barriers in Web3
## How I built [Slide](https://getslide.xyz) for the Riptide Hackathon

## Starting from Scratch

- first heard about the hackathon already a week in
- decided to take the time to learn Solana fundamentals (long haul)
- took lots of reading, experimenting, and asking on Discord (screenshots)
- finally grokked the programming model and was able to answer some questions (screenshots)

## Getting up to Speed with Anchor & Rust

- Anchor seemed to be the gold standard for new Program development
- great overlap with something I already wanted to learn (win-win)
- can't imagine getting up to speed safely without this -- learned about attack vectors through constraints
- more Discord (screenshots)

## Testing, testing, testing

- to be honest, testing was never a priority when I was building in web2
- immediately felt different in web3
- semi-permanence of a deploy
- money on the line
- general unfamiliarity with common/subtle errors
- integration could be delicate
- found tons of bugs this way, including a very frustrating BN bug (link issue)

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