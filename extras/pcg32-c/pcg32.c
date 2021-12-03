// This is trimmed-down version of https://github.com/imneme/pcg-c-basic
// that can be used to verify correctness of JS implementation.

#include <stdint.h>

static uint64_t state = 0x853c49e6748fea9bULL;
static uint64_t inc = 0xda3e39cb94b95bdbULL;

uint32_t pcg32_random()
{
    uint64_t oldstate = state;
    state = oldstate * 6364136223846793005ULL + inc;
    uint32_t xorshifted = ((oldstate >> 18u) ^ oldstate) >> 27u;
    uint32_t rot = oldstate >> 59u;

    // rotate `xorshifted` right by `rot` bits
    return (xorshifted >> rot) | (xorshifted << ((-rot) & 31));
}

uint32_t pcg32_boundedrand(uint32_t bound)
{
    uint32_t threshold = -bound % bound;
    for (;;)
    {
        uint32_t r = pcg32_random();
        if (r >= threshold)
            return r % bound;
    }
}

void pcg32_srandom(uint64_t initstate, uint64_t initseq)
{
    state = 0U;
    inc = (initseq << 1u) | 1u;
    pcg32_random();
    state += initstate;
    pcg32_random();
}

// -----------------------------------------------------------------------------

#include <stdio.h>

int main(int argc, char **argv)
{
    for (int i = 0; i < 10; i++)
        printf("0x%08x\n", pcg32_random());

    printf("----------\n");

    for (int i = 0; i < 10; i++)
        printf("0x%08x\n", pcg32_boundedrand(0xfafafafa));

    return 0;
}

// Prints:
// 0x152ca78d
// 0x027c6003
// 0xcb07bbf3
// 0xf98befee
// 0x1cd777e3
// 0xa4e29590
// 0x661e4b6d
// 0x093b9e0e
// 0xb7e9851d
// 0xe71f2e4d
// ----------
// 0xbdb2a071
// 0x469753f2
// 0xd4195b44
// 0x8d5b2e0a
// 0xe749bf46
// 0x7370bb1c
// 0xb9ad21f8
// 0xcfad21e0
// 0x843fa922
// 0xf16b535e
