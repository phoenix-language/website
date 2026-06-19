# Introduction

**Experimental alpha** — Phoenix is a statically typed programming language that compiles to portable bytecode and runs on a verified stack VM, without a garbage collector.

## What is Phoenix?

Phoenix targets systems-style programs where memory is managed through ownership and moves rather than a GC. The MVP compiler already rejects use-after-move; borrow checking is planned post-MVP.

Programs compile to **PHX0 bytecode** (portable on disk) and execute on a **Phoenix VM** per platform. The long-term model keeps runtime effects visible—schedulable I/O and explicit actors are designed into the type system rather than hidden behind opaque OS-thread or GC abstractions. Today's MVP runs `main` on a single-process stack interpreter with no scheduler and no standard I/O.

Errors are **values** (`Result`, `Option` in the standard library, `?` propagation)—not exceptions. The bundled `std` defines those types as ordinary Phoenix enums.

## Design principles

- **No garbage collector** — ownership-first memory with moves, `Copyable` vs `Clone`, and use-after-move errors that cite the original move site.
- **Portable PHX0 bytecode** — on-disk format, verified before execution, cross-platform stack VM.
- **Errors as values** — `Result`, `Option`, and `?` propagation; no exceptions or silent failure.
- **Uniform `::` syntax** — functions, structs, enums, traits, and impls share one declaration style.
- **Runtime transparency** (roadmap) — schedulable I/O and explicit actors visible in types; no hidden `async`/`await` suspension.

## Example

Every executable program needs a zero-argument `main`:

```text
add :: (a: s32, b: s32) => s32 {
    a + b
};

main :: () => {
    const sum: s32 = add(10, 2);
    const ok: bool = { if sum > 0 { true } else { false } };
    const _ = ok;
};
```

## Syntax at a glance

| Topic | Notes |
| ----- | ----- |
| Declarations | Uniform `::` style: `name :: (…) => T { … }`, `Name :: struct { … }`, `Name :: enum { … }`, `Name :: trait`, `Type :: impl`, `Type :: impl :: Trait` |
| Bindings | `const` and `var`; function parameters are always typed |
| Types | Numeric primitives (`s32`, `u32`, …), `bool`, `()`, tuples, raw pointers (`*T`), borrows (`&T`, `&mut T`), arrays `[T; N]`, slices `[T]`, `str` views |
| Literals | Integers default to `s32`; `42u` → `u32`; floats default to `f32`; `b"hi"` → `[u8; N]`; `"hi"` → `str` |
| Casts | No implicit numeric widening—use `expr as Type` |
| Control flow | `if`, `if const` / `if var`, `match`, `while`, `loop`, `break`, `continue`, `return` |
| Modules | Files are modules; paths use `::`; `#import path::to::item`; `pub` exports |

## Next steps

- [Getting started](/guide/start/getting-started) — install the compiler and run your first program.
- [CLI reference](/api/commands) — `phx check`, `phx run`, and `phx build`.
- [Compiler repository](https://github.com/phoenix-language/phoenix) — source, examples, and design documents.
