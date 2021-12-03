;; Ported from https://github.com/imneme/pcg-c-basic

(module
    (export "state"      (global $state))
    (export "sequence"   (global $sequence))
    (export "randomBits" (func $random_bits))
    (export "randomInt"  (func $random_int))

    (global $state       (mut i64) (i64.const 0x853c49e6748fea9b))
    (global $sequence    (mut i64) (i64.const 0xda3e39cb94b95bdb))

    ;; uint32_t pcg32_random()
    (func $random_bits (result i32)
        (local $old_state i64)

        ;; uint64_t old_state = state;
        ;; state = old_state * 6364136223846793005ULL + sequence;
        (global.set $state
            (i64.add
                (i64.mul
                    (local.tee $old_state
                        (global.get $state)
                    )
                    (i64.const 0x5851f42d4c957f2d)
                )
                (global.get $sequence)
            )
        )

        ;; return (xorshifted >> rot) | (xorshifted << ((-rot) & 31));
        ;; Rotates `xorshifted` right by `rot` bits.
        (i32.rotr
            ;; uint32_t xorshifted = ((old_state >> 18u) ^ old_state) >> 27u;
            (i32.wrap_i64
                (i64.shr_u
                    (i64.xor
                        (i64.shr_u
                            (local.get $old_state)
                            (i64.const 18)
                        )
                        (local.get $old_state)
                    )
                    (i64.const 27)
                )
            )
            ;; uint32_t rot = old_state >> 59u;
            (i32.wrap_i64
                (i64.shr_u
                    (local.get $old_state)
                    (i64.const 59)
                )
            )
        )
    )

    ;; uint32_t pcg32_boundedrand(uint32_t bound)
    (func $random_int (param $bound i32) (result i32)
        (local $random    i32)
        (local $threshold i32)

        ;; uint32_t threshold = -bound % bound;
        (local.set $threshold
            (i32.rem_u
                (i32.sub
                    (i32.const 0)
                    (local.get $bound)
                )
                (local.get $bound)
            )
        )

        ;; for (;;) {
        ;;     uint32_t random = pcg32_random();
        ;;     if (random < threshold) continue;
        ;;     break;
        ;; }
        (loop $try_random
            (br_if $try_random
                (i32.lt_u
                    (local.tee $random (call $random_bits))
                    (local.get $threshold)
                )
            )
        )

        ;; return random % bound;
        (i32.rem_u
            (local.get $random)
            (local.get $bound)
        )
    )
)
