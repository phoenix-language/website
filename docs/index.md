---
pageType: home
title: Phoenix
titleSuffix: Programming Language

hero:
  name: Phoenix
  text: Systems programming without a garbage collector
  tagline: Experimental alpha — compile to portable PHX0 bytecode, run on a verified stack VM. Errors are values, not exceptions.
  actions:
    - theme: brand
      text: Get started
      link: /guide/start/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/phoenix-language/phoenix
features:
  - title: No garbage collector
    details: Ownership-first memory model with moves, Copyable vs Clone types, and use-after-move errors that cite the original move site.
    link: /guide/start/introduction
  - title: Portable PHX0 bytecode
    details: Programs compile to on-disk PHX0 format, verified before execution, and run on a cross-platform stack VM.
    link: /guide/start/introduction
  - title: Errors as values
    details: Result and Option in the standard library with question-mark propagation — no exceptions, no silent failure.
    link: /guide/start/introduction
  - title: Uniform declaration syntax
    details: Functions, structs, enums, traits, and impls share one double-colon declaration style with explicit types throughout.
    link: /guide/start/introduction
  - title: Runtime transparency
    details: Schedulable I/O and explicit actors designed to be visible in types — no hidden async suspension. Roadmap.
    link: /guide/start/introduction
  - title: Self-contained toolchain
    details: Zero external dependencies. Use phx check, phx run, and phx build from a single self-contained compiler.
    link: /api/commands
---
