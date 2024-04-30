pragma circom 2.1.6;

template isZeroUnsafe() {

    signal input in;
    signal output out;

    signal inter <-- in == 0 ? 1 : 0;

    out <== inter;
}

component main = isZeroUnsafe();