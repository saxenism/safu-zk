pragma circom 2.1.6;

template Multiply() {

    signal input a;
    signal input b;
    signal output out;

    out <== a * b;

}

component main = Multiply();

/*

The R1CS that this circuit generates is:
[ 21888242871839275222246405745257275088548364400416034343698204186575808495616main.a ] * [ main.b ] - [ 21888242871839275222246405745257275088548364400416034343698204186575808495616main.out ] = 0

which is equivalent to:
-A*B -(-C) = 0
or
-A*B = C

*/