pragma circom 2.1.6;

template isZero() {
    signal input in;
    signal output out;

    signal inverse;

    inverse <-- in != 0 ? 1/in : 0;

    out <== -in * inverse + 1;
    out * in === 0;
}

template isEqual() {
    signal input in[2];
    signal output out;

    component isz = isZero();

    in[1] - in[0] ==> isz.in;

    isz.out ==> out;
}

component main = isEqual();